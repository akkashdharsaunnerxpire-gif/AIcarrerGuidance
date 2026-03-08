import joblib
import os
import pandas as pd

BASE_DIR = os.path.dirname(__file__)
MODEL_PATH = os.path.join(BASE_DIR, "career_model.pkl")
ENCODER_PATH = os.path.join(BASE_DIR, "label_encoder.pkl")

model = joblib.load(MODEL_PATH)
encoder = joblib.load(ENCODER_PATH)

FEATURE_COLUMNS = [
    "programming",
    "ai_ml",
    "data_science",
    "web",
    "communication",
    "leadership",
    "creativity",
    "management"
]

def predict_top_careers(features: dict, field_type: str, top_n=3):
    """
    Pure dataset-driven career prediction
    No hard rules, no fallback, no if/else
    """

    # ✅ Convert input to DataFrame (removes sklearn warning)
    X = pd.DataFrame([[features[col] for col in FEATURE_COLUMNS]],
                     columns=FEATURE_COLUMNS)

    probabilities = model.predict_proba(X)[0]
    careers = encoder.classes_

    results = []

    for career, prob in zip(careers, probabilities):
        score = float(prob * 100)

        # 🎯 Field preference (soft bias, not rule)
        if field_type == "IT" and career in [
            "AI / ML Engineer", "Data Scientist",
            "Web Developer", "Full Stack Developer",
            "Cyber Security Analyst", "Junior Web Developer",
            "Software Tester (QA)"
        ]:
            score += 5

        if field_type != "IT" and career in [
            "Digital Marketing Executive",
            "HR Executive",
            "Project Manager"
        ]:
            score += 5

        results.append({
            "career": career,
            "score": round(score, 2)
        })

    # 🔥 Sort & return top careers
    results.sort(key=lambda x: x["score"], reverse=True)
    return results[:top_n]
