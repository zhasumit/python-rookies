from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional, Literal
from enum import Enum


class Comment(BaseModel):
    user: str
    content: str
    timestamp: int = int(datetime.timestamp(datetime.now()))


class NoteStatus(Enum):
    TODO = "todo"
    IN_PROGRESS = "In Progress"
    IN_REVIEW = "In Review"
    DONE = "Done"
    ARCHIVED = "Archived"


class Note(BaseModel):
    note_id: str
    title: str
    content: str
    tags: List[str] = []
    images: List[str] = []
    attachments: List[str] = []
    comments: List[Comment] = []
    category: Optional[str] = None
    owner_id: str
    collaborators: List[str] = []
    priority: Optional[str] = None
    status: Literal["todo", "In Progress", "In Review", "Done", "Archived"] = (
        NoteStatus.TODO.value
    )
    is_deleted: bool = False
    created_at: int = int(datetime.timestamp(datetime.now()))
    updated_at: int = int(datetime.timestamp(datetime.now()))


class User(BaseModel):
    user_id: str
    username: str
    email: str
    profile_picture: Optional[str] = None
    location: Optional[str] = None
    mobile_number: Optional[str] = None
    social_media: Optional[dict] = None
    is_active: bool = True
    is_verified: bool = False
    password_hash: Optional[str] = None
    last_login: Optional[int] = None
    created_at: int = int(datetime.timestamp(datetime.now()))
    updated_at: int = int(datetime.timestamp(datetime.now()))
