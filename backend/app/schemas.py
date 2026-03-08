from pydantic import BaseModel, EmailStr
from typing import Optional

# ================= USER =================
class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str

    gender: str
    degree: str
    department: str
    year: str
    skills: str


# ================= LOGIN =================
class UserLogin(BaseModel):
    email: EmailStr
    password: str


# ================= RESPONSE =================
class UserResponse(BaseModel):
    id: int
    uuid: str
    name: str
    email: EmailStr

    gender: str | None
    degree: str | None
    department: str | None
    year: str | None
    skills: str | None

    class Config:
        from_attributes = True

# ================= CAREER INPUT =================
class CareerInput(BaseModel):
    fieldType: str
    personality: str

    programming: int = 0
    ai_ml: int = 0
    data_science: int = 0
    web: int = 0
    communication: int = 0
    leadership: int = 0

    subject_knowledge: int = 0
    creativity: int = 0
    decision_making: int = 0
    stress_handling: int = 0
    management: int = 0


# ================= CAREER OUTPUT =================
class CareerResult(BaseModel):
    career: str
    score: float   
    description: str
    salary: str
    growth: str


class CareerOutput(BaseModel):
    top: CareerResult
    second: CareerResult
    third: CareerResult


# ================= REVIEW =================
class CareerReviewInput(BaseModel):
    user_uuid: str
    rating: int
    review: str



class AdminRegister(BaseModel):
    name: str
    email: EmailStr
    password: str
    secretKey: str

class AdminLogin(BaseModel):
    email: EmailStr
    password: str



class StudentOut(BaseModel):
    id: int
    uuid: str
    name: str
    gender: Optional[str] = None
    degree: Optional[str] = None
    department: Optional[str] = None
    email: EmailStr
    skills: Optional[str] = None
    year: Optional[str] = None
    review: Optional[str] = None
    rating: Optional[int] = None   # ✅ FIXED (int)

    class Config:
        from_attributes = True