from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from app.routers import prediction
from app.utils.logger import setup_logger
import os

logger = setup_logger()

app = FastAPI(
    title="Medical Diagnosis AI API",
    description="Deep Learning-based Medical Image Analysis System",
    version="2.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# ✅ FIXED CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(prediction.router, prefix="/api/v1", tags=["predictions"])

@app.get("/")
async def root():
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