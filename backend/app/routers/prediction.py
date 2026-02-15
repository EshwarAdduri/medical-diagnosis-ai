"""
Prediction Router - Handles all model inference requests
"""
from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from typing import Dict, Any
import os
import io
from PIL import Image
import numpy as np

from app.utils.model_loader import ModelLoader
from app.utils.image_processor import ImageProcessor
from app.utils.logger import setup_logger

router = APIRouter()
logger = setup_logger()

# Initialize model loader and image processor
model_loader = ModelLoader()
image_processor = ImageProcessor()

# Disease categories mapping
DISEASE_CATEGORIES = {
    "covid": ["COVID-19", "Normal"],
    "pneumonia": ["Pneumonia", "Normal"],
    "malaria": ["Parasitized", "Uninfected"]
}

@router.post("/predict")
async def predict_disease(
    file: UploadFile = File(...),
    model_type: str = "covid"
):
    """
    Predict disease from uploaded medical image

    Args:
        file: Uploaded medical image (X-ray, MRI, CT, Microscopic)
        model_type: Type of disease model (covid, pneumonia, malaria, brain_tumor, lung)

    Returns:
        Prediction results with confidence scores
    """
    try:
        # Validate model type
        if model_type not in DISEASE_CATEGORIES:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid model type. Choose from: {list(DISEASE_CATEGORIES.keys())}"
            )

        # Validate file type
        if not file.content_type.startswith('image/'):
            raise HTTPException(
                status_code=400,
                detail="File must be an image (JPEG, PNG, etc.)"
            )

        logger.info(f"Received prediction request - Model: {model_type}, File: {file.filename}")

        # Read and validate image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))

        # Validate image
        if image.size[0] < 50 or image.size[1] < 50:
            raise HTTPException(
                status_code=400,
                detail="Image resolution too low. Minimum 50x50 pixels required."
            )

        # Preprocess image based on model type
        preprocessed_image = image_processor.preprocess(image, model_type)

        # Load model and make prediction
        model = model_loader.get_model(model_type)
        predictions = model.predict(preprocessed_image, verbose=0)

        # Process predictions
        prediction_results = []
        categories = DISEASE_CATEGORIES[model_type]

        for idx, category in enumerate(categories):
            confidence = float(predictions[0][idx]) * 100
            prediction_results.append({
                "label": category,
                "confidence": round(confidence, 2)
            })

        # Sort by confidence
        prediction_results.sort(key=lambda x: x['confidence'], reverse=True)

        # Determine primary prediction
        primary_prediction = prediction_results[0]

        # Generate recommendation based on prediction
        recommendation = generate_recommendation(primary_prediction['label'], model_type)

        logger.info(f"Prediction complete - Result: {primary_prediction['label']} ({primary_prediction['confidence']}%)")

        return JSONResponse({
            "success": True,
            "model_type": model_type,
            "filename": file.filename,
            "primary_prediction": primary_prediction,
            "all_predictions": prediction_results,
            "recommendation": recommendation,
            "image_size": {
                "width": image.size[0],
                "height": image.size[1]
            }
        })

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )
    finally:
        await file.close()

@router.get("/models")
async def get_available_models():
    """Get list of available disease detection models"""
    return {
        "available_models": list(DISEASE_CATEGORIES.keys()),
        "model_details": {
            "covid": {
                "name": "COVID-19 Detection",
                "input": "Chest X-ray",
                "categories": DISEASE_CATEGORIES["covid"]
            },
            "pneumonia": {
                "name": "Pneumonia Detection",
                "input": "Chest X-ray",
                "categories": DISEASE_CATEGORIES["pneumonia"]
            },
            "malaria": {
                "name": "Malaria Detection",
                "input": "Blood Cell Microscopy",
                "categories": DISEASE_CATEGORIES["malaria"]
            }
        }
    }

def generate_recommendation(prediction: str, model_type: str) -> str:
    """Generate medical recommendation based on prediction"""
    recommendations = {
        "COVID-19": "⚠️ Positive COVID-19 indication detected. Please consult a healthcare professional immediately and follow isolation protocols.",
        "Pneumonia": "⚠️ Pneumonia detected. Immediate medical consultation recommended for proper treatment.",
        "Parasitized": "⚠️ Malaria parasites detected. Seek immediate medical attention for antimalarial treatment.",
        "Glioma": "⚠️ Glioma tumor detected. Urgent neurological consultation required.",
        "Meningioma": "⚠️ Meningioma tumor detected. Consult a neurosurgeon for evaluation.",
        "Pituitary": "⚠️ Pituitary tumor detected. Endocrinologist consultation recommended.",
        "Normal": "✅ No abnormalities detected. Continue regular health monitoring.",
        "Uninfected": "✅ No parasites detected. Blood sample appears normal."
    }

    return recommendations.get(
        prediction,
        "⚠️ Abnormality detected. Please consult a healthcare professional for proper diagnosis."
    )
