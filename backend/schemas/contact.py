from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from enum import Enum

class InquiryTypeEnum(str, Enum):
    """Inquiry type enumeration."""
    GENERAL = "general"
    CONSULTATION = "consultation"
    PARTNERSHIP = "partnership"
    SUPPORT = "support"
    GOVERNMENT = "government"

class InquiryStatusEnum(str, Enum):
    """Inquiry status enumeration."""
    NEW = "new"
    IN_PROGRESS = "in_progress"
    RESPONDED = "responded"
    CLOSED = "closed"

class ContactInquiryBase(BaseModel):
    """Base contact inquiry schema."""
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    inquiry_type: InquiryTypeEnum = InquiryTypeEnum.GENERAL
    subject: str = Field(..., min_length=5, max_length=200)
    message: str = Field(..., min_length=10)

class ContactInquiryCreate(ContactInquiryBase):
    """Schema for contact inquiry creation."""
    pass

class ContactInquiryResponse(ContactInquiryBase):
    """Schema for contact inquiry API response."""
    id: str
    status: InquiryStatusEnum
    is_read: bool
    priority: str
    response: Optional[str]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True