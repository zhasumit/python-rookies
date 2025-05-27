from models import User, Note


def individual_user_data(user: User):
    return {
        "user_id": user.user_id,
        "username": user.username,
        "email": user.email,
        "profile_picture": user.profile_picture,
        "location": user.location,
        "mobile_number": user.mobile_number,
        "social_media": user.social_media,
        "is_active": user.is_active,
        "is_verified": user.is_verified,
        "created_at": user.created_at,
        "updated_at": user.updated_at,
    }


def all_users_data(users):
    return [individual_user_data(user) for user in users]


def signup_user_data(user):
    return {
        "user_id": user.user_id,
        "username": user.username,
        "email": user.email,
        "password_hash": user.password_hash,
        "created_at": user.created_at,
        "updated_at": user.updated_at,
    }


def login_user_data(user):
    return {"email": user.email, "password_hash": user.password_hash}


def individual_note_data(note: Note):
    return {
        "note_id": note.note_id,
        "title": note.title,
        "content": note.content,
        "tags": note.tags,
        "images": note.images,
        "attachments": note.attachments,
        "comments": [
            {
                "user": comment.user,
                "content": comment.content,
                "timestamp": comment.timestamp,
            }
            for comment in note.comments
        ],
        "category": note.category,
        "owner_id": note.owner_id,
        "collaborators": note.collaborators,
        "priority": note.priority,
        "status": note.status,
        "is_deleted": note.is_deleted,
        "created_at": note.created_at,
        "updated_at": note.updated_at,
    }


def all_notes_data(notes):
    return [individual_note_data(note) for note in notes]
