from fastapi import APIRouter
from datetime import datetime

router = APIRouter(tags=["Health"])

@router.get("/health")
async def health_check():
    """Health check endpoint for monitoring."""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "version": "1.0.0",
        "service": "USETAI Backend API"
    }

@router.get("/health/ready")
async def readiness_check():
    """Readiness check endpoint for kubernetes/load balancers."""
    return {
        "ready": True,
        "timestamp": datetime.utcnow().isoformat()
    }