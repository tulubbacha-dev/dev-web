from sqlalchemy import Column, String, Text, Boolean, DateTime, Enum
from datetime import datetime
from models.base import Base, BaseModel
import uuid
import enum

class InquiryStatus(str, enum.Enum):
    """Inquiry status enumeration."""
    NEW = "new"
    IN_PROGRESS = "in_progress"
    RESPONDED = "responded"
    CLOSED = "closed"

class InquiryType(str, enum.Enum):
    """Inquiry type enumeration."""
    GENERAL = "general"
    CONSULTATION = "consultation"
    PARTNERSHIP = "partnership"
    SUPPORT = "support"
    GOVERNMENT = "government"

class ContactInquiry(BaseModel):
    """Contact inquiry model for managing website inquiries."""
    __tablename__ = "contact_inquiries"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    email = Column(String, index=True, nullable=False)
    phone = Column(String, nullable=True)
    company = Column(String, nullable=True)
    inquiry_type = Column(Enum(InquiryType), default=InquiryType.GENERAL)
    subject = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    status = Column(Enum(InquiryStatus), default=InquiryStatus.NEW)
    assigned_to = Column(String, nullable=True)
    response = Column(Text, nullable=True)
    is_read = Column(Boolean, default=False)
    priority = Column(String, default="normal")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)