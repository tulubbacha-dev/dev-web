# USETAI LLC Backend API

Enterprise AI & ML Solutions Backend Service

## Overview

This is a comprehensive Python-based backend for the USETAI LLC professional website, designed to provide:

- **Authentication & User Management**: Secure JWT-based authentication
- **Service Management**: API for managing AI/ML services and solutions
- **Contact Management**: Handle customer inquiries and communications
- **AI/ML Integration**: OpenAI integration for intelligent recommendations
- **Email Services**: SendGrid integration for notifications

## Tech Stack

- **Framework**: FastAPI 0.104.1
- **Server**: Uvicorn
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: JWT with python-jose
- **AI/ML**: OpenAI API, scikit-learn, TensorFlow, PyTorch
- **Async**: Asyncio with aiohttp
- **Monitoring**: Sentry, Prometheus
- **Logging**: Loguru

## Project Structure

```
backend/
├── main.py                 # Application entry point
├── config.py              # Configuration management
├── requirements.txt       # Python dependencies
├── api/
│   ├── routes/
│   │   ├── auth.py        # Authentication endpoints
│   │   ├── contact.py     # Contact inquiry endpoints
│   │   └── health.py      # Health check endpoints
├── models/
│   ├── base.py            # Base database configuration
│   ├── user.py            # User model
│   ├── service.py         # Service model
│   └── contact.py         # Contact inquiry model
├── schemas/
│   ├── user.py            # User request/response schemas
│   └── contact.py         # Contact inquiry schemas
├── services/
│   ├── auth_service.py    # Authentication business logic
│   ├── ai_service.py      # AI/ML integration logic
│   └── email_service.py   # Email notification logic
└── core/
    ├── security.py        # Security utilities
    └── logger.py          # Logging configuration
```

## Installation

### Prerequisites

- Python 3.9+
- PostgreSQL 12+
- Redis 6.0+

### Setup

1. Clone and setup:
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
```

2. Configure environment variables in `.env`

3. Initialize database:
```bash
alembic upgrade head
```

## Running the Application

### Development

```bash
python main.py
```

### Production

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

## API Documentation

Interactive docs available at: http://localhost:8000/docs

## API Endpoints

### Health Check
- `GET /health` - Service health status
- `GET /health/ready` - Readiness probe

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Authenticate and get JWT token

### Contact
- `POST /contact/inquiries` - Submit contact inquiry
- `GET /contact/inquiries/{inquiry_id}` - Get inquiry details

## Environment Variables

See `.env.example` for all available configuration options.

## Security Considerations

- Use HTTPS in production
- Rotate SECRET_KEY regularly
- Use strong database passwords
- Enable firewall rules
- Use environment variables for sensitive data
- Implement rate limiting

## Support

For issues and questions: support@usetai.com

## License

Proprietary - USETAI LLC