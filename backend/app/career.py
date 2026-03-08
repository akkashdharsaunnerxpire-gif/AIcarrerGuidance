from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User
from app.schemas import CareerInput, CareerOutput, CareerResult
from app.ml.predictor import predict_top_careers

router = APIRouter(prefix="/career", tags=["Career"])


def build_result(item) -> CareerResult:
    return CareerResult(
        career=item["career"],
        score=float(item["score"]),
        description=f"{item['career']} based on your skill profile",
        salary="₹2 – ₹20 LPA",
        growth="Career growth depends on skill improvement"
    )


@router.post("/predict", response_model=CareerOutput)
def predict(
    data: CareerInput,
    user_uuid: str = Query(...),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.uuid == user_uuid).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # 🧠 Prepare features
    features = {
        "programming": data.programming,
        "ai_ml": data.ai_ml,
        "data_science": data.data_science,
        "web": data.web,
        "communication": data.communication,
        "leadership": data.leadership,
        "creativity": data.creativity,
        "management": data.management,
    }

    # 🔮 ML Prediction
    top_careers = predict_top_careers(
        features=features,
        field_type=data.fieldType,
        top_n=3
    )

    # 🛑 Safety (rare case)
    if len(top_careers) < 3:
        raise HTTPException(
            status_code=500,
            detail="Career prediction failed. Dataset issue."
        )

    # 💾 Save best career
    best = top_careers[0]
    user.field_type = data.fieldType
    user.personality = data.personality
    user.career_name = best["career"]
    user.career_score = float(best["score"])
    user.description = best["career"]
    user.salary = "₹2 – ₹20 LPA"
    user.growth = "Skill based growth"

    db.commit()

    return CareerOutput(
        top=build_result(top_careers[0]),
        second=build_result(top_careers[1]),
        third=build_result(top_careers[2]),
    )
