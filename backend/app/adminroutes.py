from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta

from app.schemas import AdminLogin, AdminRegister
from app.database import get_db
from app.models import AdminCarrer,User
from app.schemas import StudentOut

router = APIRouter(prefix="/admin", tags=["Admin"])

SECRET_KEY = "ADMIN_SUPER_SECRET"
ADMIN_SECRET_KEY = "MY_ADMIN_KEY_123"
ALGORITHM = "HS256"

pwd = CryptContext(schemes=["bcrypt"], deprecated="auto")


# ================= ADMIN REGISTER =================
@router.post("/Adminregister")
def register_admin(data: AdminRegister, db: Session = Depends(get_db)):

    # 🔐 Secret key check
    if data.secretKey != ADMIN_SECRET_KEY:
        raise HTTPException(status_code=403, detail="Invalid Admin Secret Key")

    # 🔍 Check admin already exists
    existing_admin = db.query(AdminCarrer).filter(
        AdminCarrer.email == data.email
    ).first()

    if existing_admin:
        raise HTTPException(status_code=400, detail="Admin already exists")

    # 🔒 Hash password
    hashed_password = pwd.hash(data.password)

    # 🧠 Create admin object
    admin = AdminCarrer(
        name=data.name,
        email=data.email,
        password=hashed_password
    )

    # 💾 SAVE TO DATABASE
    db.add(admin)
    db.commit()
    db.refresh(admin)

    return {"message": "Admin registered successfully"}


# ================= ADMIN LOGIN =================
@router.post("/Adminlogin")
def login_admin(data: AdminLogin, db: Session = Depends(get_db)):

    admin = db.query(AdminCarrer).filter(
        AdminCarrer.email == data.email
    ).first()

    if not admin or not pwd.verify(data.password, admin.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = jwt.encode(
        {
            "admin_id": admin.id,
            "email": admin.email,
            "exp": datetime.utcnow() + timedelta(hours=2)
        },
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return {
        "access_token": token,
        "admin": {
            "id": admin.id,
            "name": admin.name,
            "email": admin.email
        }
    }


@router.get("/students", response_model=list[StudentOut])
def get_all_students(db: Session = Depends(get_db)):

    students = db.query(User).all()

    if not students:
        raise HTTPException(
            status_code=404,
            detail="No students found"
        )

    return students