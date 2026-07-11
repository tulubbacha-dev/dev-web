from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    """Base user schema."""
    email: EmailStr
    full_name: str = Field(..., min_length=1, max_length=100)
    company: Optional[str] = None
    phone: Optional[str] = None

class UserCreate(UserBase):
    """Schema for user creation."""
    password: str = Field(..., min_length=8, max_length=100)

class UserUpdate(BaseModel):
    """Schema for user update."""
    full_name: Optional[str] = None
    company: Optional[str] = None
    phone: Optional[str] = None

class UserResponse(UserBase):
    """Schema for user API response."""
    id: str
    is_active: bool
    is_verified: bool
    role: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

class LoginRequest(BaseModel):
    """Schema for login request."""
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    """Schema for token response."""
    access_token: str
    token_type: str = "bearer"
    expires_in: int