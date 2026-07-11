from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from schemas.contact import ContactInquiryCreate, ContactInquiryResponse
from models.contact import ContactInquiry
from models.base import get_db
from services.email_service import EmailService
from core.logger import logger
import uuid

router = APIRouter(prefix="/contact", tags=["Contact"])

@router.post("/inquiries", response_model=ContactInquiryResponse, status_code=status.HTTP_201_CREATED)
async def create_contact_inquiry(
    inquiry_data: ContactInquiryCreate,
    db: Session = Depends(get_db)
):
    """Create a new contact inquiry."""
    try:
        inquiry = ContactInquiry(
            id=str(uuid.uuid4()),
            name=inquiry_data.name,
            email=inquiry_data.email,
            phone=inquiry_data.phone,
            company=inquiry_data.company,
            inquiry_type=inquiry_data.inquiry_type,
            subject=inquiry_data.subject,
            message=inquiry_data.message
        )
        
        db.add(inquiry)
        db.commit()
        db.refresh(inquiry)
        
        await EmailService.send_contact_confirmation(
            recipient_email=inquiry_data.email,
            recipient_name=inquiry_data.name,
            inquiry_id=inquiry.id
        )
        
        logger.info(f"Contact inquiry created: {inquiry.id}")
        return inquiry
        
    except Exception as e:
        logger.error(f"Error creating contact inquiry: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create inquiry"
        )

@router.get("/inquiries/{inquiry_id}", response_model=ContactInquiryResponse)
async def get_contact_inquiry(
    inquiry_id: str,
    db: Session = Depends(get_db)
):
    """Get a specific contact inquiry by ID."""
    try:
        inquiry = db.query(ContactInquiry).filter(ContactInquiry.id == inquiry_id).first()
        
        if not inquiry:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Inquiry not found"
            )
        
        return inquiry
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving inquiry: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve inquiry"
        )