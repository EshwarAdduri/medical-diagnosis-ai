"""
Medical Diagnosis AI - FastAPI Backend
Production-ready deep learning inference server
"""
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
from app.routers import prediction
from app.utils.logger import setup_logger
import os

# Initialize logger
logger = setup_logger()

# Initialize FastAPI app
app = FastAPI(
    title="Medical Diagnosis AI API",
    description="Deep Learning-based Medical Image Analysis System",
    version="2.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# CORS Configuration
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://*.render.com",
    os.getenv("FRONTEND_URL", "*")
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(prediction.router, prefix="/api/v1", tags=["predictions"])

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "online",
        "service": "Medical Diagnosis AI",
        "version": "2.0.0",
        "endpoints": {
            "docs": "/api/docs",
            "prediction": "/api/v1/predict"
        }
    }

@app.get("/health")
async def health_check():
    """Detailed health check"""
    return {
        "status": "healthy",
        "models_loaded": True,
        "api_version": "2.0.0"
    }

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=True,
        log_level="info"
    )
