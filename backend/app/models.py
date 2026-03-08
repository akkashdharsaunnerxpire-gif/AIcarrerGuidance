from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.database import Base
import uuid

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    uuid = Column(String, unique=True, index=True, default=lambda: str(uuid.uuid4()))

    # BASIC
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)

    # STUDENT PROFILE DETAILS ✅
    gender = Column(String, nullable=True)
    degree = Column(String, nullable=True)
    department = Column(String, nullable=True)
    year = Column(String, nullable=True)
    skills = Column(String, nullable=True)

    # CAREER DETAILS (already there)
    personality = Column(String, nullable=True)
    field_type = Column(String, nullable=True)
    career_name = Column(String, nullable=True)
    career_score = Column(Integer, nullable=True)
    description = Column(String, nullable=True)
    salary = Column(String, nullable=True)
    growth = Column(String, nullable=True)

    # FEEDBACK
    review = Column(String, nullable=True)
    rating = Column(Integer, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)





class AdminCarrer(Base):
    __tablename__ = "admin_carrer"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)