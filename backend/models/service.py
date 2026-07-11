from sqlalchemy import Column, String, Text, Float, Boolean, DateTime, Enum
from datetime import datetime
from models.base import Base, BaseModel
import uuid
import enum

class ServiceCategory(str, enum.Enum):
    """Service category enumeration."""
    AI_CONSULTING = "ai_consulting"
    ML_DEVELOPMENT = "ml_development"
    DATA_ANALYTICS = "data_analytics"
    GOVERNMENT = "government"
    PRIVATE_SECTOR = "private_sector"
    CUSTOM = "custom"

class Service(BaseModel):
    """Service offering model for USETAI solutions."""
    __tablename__ = "services"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, unique=True, index=True, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    description = Column(Text, nullable=False)
    detailed_description = Column(Text, nullable=True)
    category = Column(Enum(ServiceCategory), nullable=False)
    icon = Column(String, nullable=True)
    image_url = Column(String, nullable=True)
    features = Column(String, nullable=True)
    price_starting = Column(Float, nullable=True)
    is_featured = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    sort_order = Column(Float, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)