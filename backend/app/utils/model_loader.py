"""
Model Loader - Handles loading and caching of TensorFlow/Keras models
"""
import os
from pathlib import Path
import tensorflow as tf
from tensorflow import keras
import logging

logger = logging.getLogger(__name__)

class ModelLoader:
    """Singleton class for loading and caching deep learning models"""

    _instance = None
    _models = {}

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(ModelLoader, cls).__new__(cls)
        return cls._instance

    def __init__(self):
        self.models_dir = Path(os.getenv("MODELS_DIR", "./models"))
        self.model_files = {
            "covid": "covid.h5",
            "pneumonia": "pneumonia.h5",
            "malaria": "malaria.h5"
        }

    def get_model(self, model_type: str):
        """
        Load model from cache or disk

        Args:
            model_type: Type of disease model

        Returns:
            Loaded Keras model
        """
        if model_type in self._models:
            logger.info(f"Loading {model_type} model from cache")
            return self._models[model_type]

        model_path = self.models_dir / self.model_files.get(model_type, f"{model_type}_model.h5")

        if not model_path.exists():
            raise FileNotFoundError(
                f"Model file not found: {model_path}. "
                f"Please place your .h5 model files in the 'models' directory."
            )

        logger.info(f"Loading {model_type} model from disk: {model_path}")

        try:
            model = keras.models.load_model(str(model_path))
            self._models[model_type] = model
            logger.info(f"Successfully loaded {model_type} model")
            return model
        except Exception as e:
            logger.error(f"Failed to load model {model_path}: {str(e)}")
            raise

    def preload_all_models(self):
        """Preload all available models into memory"""
        for model_type in self.model_files.keys():
            try:
                self.get_model(model_type)
            except FileNotFoundError:
                logger.warning(f"Model {model_type} not found, skipping preload")
            except Exception as e:
                logger.error(f"Error preloading {model_type}: {str(e)}")
