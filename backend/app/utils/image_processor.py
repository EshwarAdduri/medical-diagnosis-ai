"""
Image Processor - Handles image preprocessing for different model types
"""
import numpy as np
from PIL import Image
import logging

logger = logging.getLogger(__name__)

class ImageProcessor:
    """Image preprocessing for medical imaging models"""

    def __init__(self):
        self.target_sizes = {
            "covid": (64, 64),
            "pneumonia": (64, 64),
            "malaria": (32, 32)
        }

    def preprocess(self, image: Image.Image, model_type: str) -> np.ndarray:
        """
        Preprocess image for model prediction

        Args:
            image: PIL Image object
            model_type: Type of disease model

        Returns:
            Preprocessed numpy array ready for prediction
        """
        try:
            # Convert to RGB if needed
            if image.mode != 'RGB':
                image = image.convert('RGB')

            # Resize to target size
            target_size = self.target_sizes.get(model_type, (224, 224))
            image = image.resize(target_size, Image.LANCZOS)

            # Convert to numpy array
            img_array = np.array(image)

            # Normalize pixel values to [0, 1]
            img_array = img_array.astype('float32') / 255.0

            # Add batch dimension
            img_array = np.expand_dims(img_array, axis=0)

            logger.debug(f"Preprocessed image shape: {img_array.shape}")

            return img_array

        except Exception as e:
            logger.error(f"Image preprocessing failed: {str(e)}")
            raise

    def validate_image(self, image: Image.Image) -> bool:
        """
        Validate if image meets minimum requirements

        Args:
            image: PIL Image object

        Returns:
            True if valid, False otherwise
        """
        min_width, min_height = 50, 50

        if image.size[0] < min_width or image.size[1] < min_height:
            return False

        return True
