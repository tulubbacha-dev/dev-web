from datetime import timedelta
from sqlalchemy.orm import Session
from core.security import hash_password, verify_password, create_access_token
from models.user import User
from schemas.user import UserCreate, LoginRequest
from core.logger import logger
import uuid
from typing import Optional

class AuthService:
    """Service for handling authentication operations."""
    
    @staticmethod
    def register_user(db: Session, user_data: UserCreate) -> User:
        """Register a new user."""
        existing_user = db.query(User).filter(User.email == user_data.email).first()
        if existing_user:
            logger.warning(f"Registration attempt with existing email: {user_data.email}")
            raise ValueError("Email already registered")
        
        user = User(
            id=str(uuid.uuid4()),
            email=user_data.email,
            full_name=user_data.full_name,
            hashed_password=hash_password(user_data.password),
            company=user_data.company,
            phone=user_data.phone
        )
        
        db.add(user)
        db.commit()
        db.refresh(user)
        
        logger.info(f"User registered: {user.email}")
        return user
    
    @staticmethod
    def authenticate_user(db: Session, login_data: LoginRequest) -> Optional[User]:
        """Authenticate a user with email and password."""
        user = db.query(User).filter(User.email == login_data.email).first()
        
        if not user or not verify_password(login_data.password, user.hashed_password):
            logger.warning(f"Failed login attempt for: {login_data.email}")
            return None
        
        if not user.is_active:
            logger.warning(f"Login attempt on inactive account: {login_data.email}")
            return None
        
        logger.info(f"User authenticated: {user.email}")
        return user
    
    @staticmethod
    def create_token(user: User) -> dict:
        """Create JWT token for authenticated user."""
        access_token_expires = timedelta(minutes=30)
        access_token = create_access_token(
            data={
                "sub": user.id,
                "email": user.email,
                "role": user.role
            },
            expires_delta=access_token_expires
        )
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "expires_in": 1800
        }