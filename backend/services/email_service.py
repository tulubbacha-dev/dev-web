import aiohttp
from typing import Optional
from config import get_settings
from core.logger import logger

settings = get_settings()

class EmailService:
    """Service for sending emails using SendGrid."""
    
    SENDGRID_API_URL = "https://api.sendgrid.com/v3/mail/send"
    
    @classmethod
    async def send_contact_confirmation(
        cls,
        recipient_email: str,
        recipient_name: str,
        inquiry_id: str
    ) -> bool:
        """Send contact inquiry confirmation email."""
        try:
            subject = "We received your inquiry - USETAI LLC"
            html_content = f"<html><body><h2>Thank you for contacting USETAI LLC</h2><p>Hi {recipient_name},</p><p>We have received your inquiry and will get back to you shortly.</p><p>Inquiry ID: {inquiry_id}</p><p>Best regards,<br/>USETAI LLC Team</p></body></html>"
            
            await cls._send_email(
                to_email=recipient_email,
                subject=subject,
                html_content=html_content
            )
            
            logger.info(f"Confirmation email sent to {recipient_email}")
            return True
            
        except Exception as e:
            logger.error(f"Error sending confirmation email: {str(e)}")
            return False
    
    @classmethod
    async def _send_email(
        cls,
        to_email: str,
        subject: str,
        html_content: str,
        reply_to: Optional[str] = None
    ) -> bool:
        """Internal method to send email via SendGrid."""
        if not settings.SENDGRID_API_KEY:
            logger.warning("SendGrid API key not configured")
            return False
        
        headers = {
            "Authorization": f"Bearer {settings.SENDGRID_API_KEY}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "personalizations": [
                {
                    "to": [{"email": to_email}],
                    "subject": subject
                }
            ],
            "from": {
                "email": settings.SENDGRID_FROM_EMAIL,
                "name": "USETAI LLC"
            },
            "content": [
                {
                    "type": "text/html",
                    "value": html_content
                }
            ]
        }
        
        if reply_to:
            payload["reply_to"] = {"email": reply_to}
        
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(
                    cls.SENDGRID_API_URL,
                    json=payload,
                    headers=headers
                ) as response:
                    return response.status == 202
        except Exception as e:
            logger.error(f"Error in _send_email: {str(e)}")
            return False