from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User
from app.schemas import CareerReviewInput

router = APIRouter(prefix="/review", tags=["Review"])


@router.post("/add")
def add_review(data: CareerReviewInput, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.uuid == data.user_uuid).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Save review & rating
    user.rating = data.rating
    user.review = data.review

    db.commit()
    db.refresh(user)

    return {
        "message": "Review saved successfully",
        "user": {
            "uuid": user.uuid,
            "rating": user.rating,
            "review": user.review
        }
    }