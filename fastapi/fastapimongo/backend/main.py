from fastapi import FastAPI, HTTPException, Depends, status, Response, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from motor.motor_asyncio import AsyncIOMotorClient
import bcrypt
import jwt
from datetime import datetime, timedelta
import uuid
from typing import Optional, List
import os
from models import User, Note, Comment, NoteStatus
from schemas import (
    individual_user_data,
    all_users_data,
    signup_user_data,
    individual_note_data,
    all_notes_data,
)
import json
from pydantic import BaseModel
from configurations import settings

# Configuration
SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES
MONGODB_URL = settings.MONGODB_URL
DATABASE_NAME = settings.DATABASE_NAME

app = FastAPI(title="Notes API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
client = AsyncIOMotorClient(MONGODB_URL)
database = client[DATABASE_NAME]
users_collection = database.users
notes_collection = database.notes

# Security
security = HTTPBearer()


# Pydantic models for requests
class UserSignup(BaseModel):
    username: str
    email: str
    password: str
    profile_picture: Optional[str] = None
    location: Optional[str] = None
    mobile_number: Optional[str] = None


class UserLogin(BaseModel):
    email: str
    password: str


class NoteCreate(BaseModel):
    title: str
    content: str
    tags: List[str] = []
    category: Optional[str] = None
    priority: Optional[str] = None


class NoteUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    tags: Optional[List[str]] = None
    category: Optional[str] = None
    priority: Optional[str] = None
    status: Optional[str] = None


class CommentCreate(BaseModel):
    content: str


# Utility functions
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode("utf-8"), hashed.encode("utf-8"))


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def process_user_from_db(user_data: dict) -> dict:
    """Process user data from database, converting JSON strings to objects where needed"""
    if user_data.get("social_media") and isinstance(user_data["social_media"], str):
        try:
            user_data["social_media"] = json.loads(user_data["social_media"])
        except json.JSONDecodeError:
            user_data["social_media"] = None
    return user_data


async def get_current_user(request: Request):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated"
        )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token"
            )
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token"
        )

    user = await users_collection.find_one({"user_id": user_id})
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found"
        )

    user = process_user_from_db(user)
    return User(**user)


# Routes
@app.get("/")
async def root():
    return {"message": "Notes API is running"}


# Auth routes
@app.post("/auth/signup")
async def signup(user_data: UserSignup, response: Response):
    # Check if user exists
    existing_user = await users_collection.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered"
        )

    # Check username
    existing_username = await users_collection.find_one(
        {"username": user_data.username}
    )
    if existing_username:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Username already taken"
        )

    # Create user
    user_id = str(uuid.uuid4())
    hashed_password = hash_password(user_data.password)

    user = User(
        user_id=user_id,
        username=user_data.username,
        email=user_data.email,
        password_hash=hashed_password,
        profile_picture=user_data.profile_picture,
        location=user_data.location,
        mobile_number=user_data.mobile_number,
    )

    await users_collection.insert_one(user.model_dump())

    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user_id}, expires_delta=access_token_expires
    )

    # Set cookie
    response.set_cookie(
        key="access_token",
        value=access_token,
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        httponly=True,
        secure=False,  # Set to True in production with HTTPS
        samesite="lax",
    )

    return {"message": "User created successfully", "user": individual_user_data(user)}


@app.post("/auth/login")
async def login(user_data: UserLogin, response: Response):
    user = await users_collection.find_one({"email": user_data.email})
    if not user or not verify_password(user_data.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
        )

    # Update last login
    await users_collection.update_one(
        {"user_id": user["user_id"]},
        {"$set": {"last_login": int(datetime.timestamp(datetime.now()))}},
    )

    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["user_id"]}, expires_delta=access_token_expires
    )

    # Set cookie
    response.set_cookie(
        key="access_token",
        value=access_token,
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        httponly=True,
        secure=False,  # Set to True in production with HTTPS
        samesite="lax",
    )

    # Parse social_media JSON string before creating User object
    if user.get("social_media") and isinstance(user["social_media"], str):
        import json

        try:
            user["social_media"] = json.loads(user["social_media"])
        except json.JSONDecodeError:
            user["social_media"] = None

    user_obj = User(**user)
    return {"message": "Login successful", "user": individual_user_data(user_obj)}


@app.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie(key="access_token")
    return {"message": "Logged out successfully"}


@app.get("/auth/me")
async def get_me(current_user: User = Depends(get_current_user)):
    return {"user": individual_user_data(current_user)}


# Notes routes
@app.get("/notes")
async def get_notes(current_user: User = Depends(get_current_user)):
    notes = await notes_collection.find(
        {"owner_id": current_user.user_id, "is_deleted": False}
    ).to_list(length=None)

    notes_list = [Note(**note) for note in notes]
    return {"notes": all_notes_data(notes_list)}


@app.post("/notes")
async def create_note(
    note_data: NoteCreate, current_user: User = Depends(get_current_user)
):
    note_id = str(uuid.uuid4())

    note = Note(
        note_id=note_id,
        title=note_data.title,
        content=note_data.content,
        tags=note_data.tags,
        category=note_data.category,
        owner_id=current_user.user_id,
        priority=note_data.priority,
    )

    await notes_collection.insert_one(note.dict())
    return {"message": "Note created successfully", "note": individual_note_data(note)}


@app.get("/notes/{note_id}")
async def get_note(note_id: str, current_user: User = Depends(get_current_user)):
    note = await notes_collection.find_one(
        {"note_id": note_id, "owner_id": current_user.user_id, "is_deleted": False}
    )

    if not note:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Note not found"
        )

    note_obj = Note(**note)
    return {"note": individual_note_data(note_obj)}


@app.put("/notes/{note_id}")
async def update_note(
    note_id: str, note_data: NoteUpdate, current_user: User = Depends(get_current_user)
):
    note = await notes_collection.find_one(
        {"note_id": note_id, "owner_id": current_user.user_id, "is_deleted": False}
    )

    if not note:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Note not found"
        )

    update_data = {k: v for k, v in note_data.dict().items() if v is not None}
    update_data["updated_at"] = int(datetime.timestamp(datetime.now()))

    await notes_collection.update_one({"note_id": note_id}, {"$set": update_data})

    updated_note = await notes_collection.find_one({"note_id": note_id})
    note_obj = Note(**updated_note)
    return {
        "message": "Note updated successfully",
        "note": individual_note_data(note_obj),
    }


@app.delete("/notes/{note_id}")
async def delete_note(note_id: str, current_user: User = Depends(get_current_user)):
    result = await notes_collection.update_one(
        {"note_id": note_id, "owner_id": current_user.user_id, "is_deleted": False},
        {
            "$set": {
                "is_deleted": True,
                "updated_at": int(datetime.timestamp(datetime.now())),
            }
        },
    )

    if result.matched_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Note not found"
        )

    return {"message": "Note deleted successfully"}


@app.post("/notes/{note_id}/comments")
async def add_comment(
    note_id: str,
    comment_data: CommentCreate,
    current_user: User = Depends(get_current_user),
):
    note = await notes_collection.find_one(
        {"note_id": note_id, "owner_id": current_user.user_id, "is_deleted": False}
    )

    if not note:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Note not found"
        )

    comment = Comment(user=current_user.username, content=comment_data.content)

    await notes_collection.update_one(
        {"note_id": note_id},
        {
            "$push": {"comments": comment.dict()},
            "$set": {"updated_at": int(datetime.timestamp(datetime.now()))},
        },
    )

    return {"message": "Comment added successfully", "comment": comment.dict()}


# Add these routes to your main.py file after the existing routes


# Profile routes
@app.get("/profile")
async def get_profile(current_user: User = Depends(get_current_user)):
    """Get current user's profile"""
    return {"profile": individual_user_data(current_user)}


from fastapi import HTTPException, status
from pydantic import BaseModel, validator
from typing import Optional
import re


class ProfileUpdate(BaseModel):
    username: Optional[str] = None
    profile_picture: Optional[str] = None
    location: Optional[str] = None
    mobile_number: Optional[str] = None
    social_media: Optional[str] = None  # JSON string

    @validator("username")
    def validate_username(cls, v):
        if v is not None:
            # Remove whitespace
            v = v.strip()
            # Check length
            if len(v) < 3 or len(v) > 50:
                raise ValueError("Username must be between 3 and 50 characters")
            # Check format (alphanumeric, underscore, hyphen only)
            if not re.match(r"^[a-zA-Z0-9_-]+$", v):
                raise ValueError(
                    "Username can only contain letters, numbers, underscores, and hyphens"
                )
        return v


@app.put("/profile/edit")
async def update_profile(
    profile_data: ProfileUpdate, current_user: User = Depends(get_current_user)
):
    """Update current user's profile"""

    # Check if username is provided and validate availability
    if profile_data.username and profile_data.username != current_user.username:
        existing_username = await users_collection.find_one(
            {
                "username": profile_data.username,
                "user_id": {"$ne": current_user.user_id},
            }
        )
        if existing_username:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Username already taken"
            )

    # Prepare update data
    update_data = {}
    for field, value in profile_data.dict().items():
        if value is not None:
            if (
                field
                in ["profile_picture", "location", "mobile_number", "social_media"]
                and value.strip() == ""
            ):
                update_data[field] = None
            else:
                update_data[field] = value

    if update_data:
        update_data["updated_at"] = int(datetime.timestamp(datetime.now()))
        result = await users_collection.update_one(
            {"user_id": current_user.user_id}, {"$set": update_data}
        )

        if result.matched_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
            )

    # Get updated user data and process it
    updated_user = await users_collection.find_one({"user_id": current_user.user_id})
    if not updated_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )

    # Process user data before creating User object
    updated_user = process_user_from_db(updated_user)
    user_obj = User(**updated_user)

    return {
        "message": "Profile updated successfully",
        "profile": individual_user_data(user_obj),
    }


# Optional: Add a separate endpoint to check username availability
@app.get("/profile/check-username/{username}")
async def check_username_availability(
    username: str, current_user: User = Depends(get_current_user)
):
    """Check if username is available"""

    # Validate username format
    if len(username) < 3 or len(username) > 50:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username must be between 3 and 50 characters",
        )

    if not re.match(r"^[a-zA-Z0-9_-]+$", username):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username can only contain letters, numbers, underscores, and hyphens",
        )

    # Check if it's the current user's username
    if username == current_user.username:
        return {"available": True, "message": "This is your current username"}

    # Check if username exists
    existing_user = await users_collection.find_one({"username": username})

    return {
        "available": existing_user is None,
        "message": (
            "Username is available"
            if existing_user is None
            else "Username is already taken"
        ),
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
