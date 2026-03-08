import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib
import os

BASE_DIR = os.path.dirname(__file__)
DATASET_PATH = os.path.join(BASE_DIR, "career_dataset.csv")
MODEL_PATH = os.path.join(BASE_DIR, "career_model.pkl")

def train_model():
    df = pd.read_csv(DATASET_PATH)

    X = df.drop("career", axis=1)
    y = df["career"]

    encoder = LabelEncoder()
    y_encoded = encoder.fit_transform(y)

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X, y_encoded)

    joblib.dump(model, MODEL_PATH)
    joblib.dump(encoder, os.path.join(BASE_DIR, "label_encoder.pkl"))

    print("✅ Career model trained successfully")

if __name__ == "__main__":
    train_model()
