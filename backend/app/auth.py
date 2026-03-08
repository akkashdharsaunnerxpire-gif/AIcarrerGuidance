from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User
from app.schemas import UserRegister, UserResponse
from app.security import hash_password
from app.security import verify_password, create_access_token
from app.schemas import UserLogin

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register", response_model=UserResponse)
def register(user: UserRegister, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password),

        gender=user.gender,
        degree=user.degree,
        department=user.department,
        year=user.year,
        skills=user.skills
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    token = create_access_token({
        "user_id": db_user.id,
        "uuid": db_user.uuid,
        "email": db_user.email
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": db_user.id,
            "uuid": db_user.uuid,
            "name": db_user.name,
            "email": db_user.email,
            "gender": db_user.gender,
            "degree": db_user.degree,
            "department": db_user.department,
            "year": db_user.year,
            "skills": db_user.skills
        }
    }
