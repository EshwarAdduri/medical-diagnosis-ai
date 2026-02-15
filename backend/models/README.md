# 📦 Models Directory

Place your trained `.h5` model files here.

## Expected Model Files

```
models/
├── covid19_model.h5          # COVID-19 Detection Model
├── pneumonia_model.h5        # Pneumonia Detection Model
├── malaria_model.h5          # Malaria Detection Model
├── brain_tumor_model.h5      # Brain Tumor Classification Model
└── lung_cancer_model.h5      # Lung Cancer Detection Model
```

## Model Specifications

All models should be:
- **Format**: Keras/TensorFlow `.h5` format
- **Input Shape**: (224, 224, 3) - RGB images
- **Architecture**: DenseNet121 or similar CNN
- **Preprocessing**: Images normalized to [0, 1]

## Model Details

### 1. COVID-19 Model
- **Input**: Chest X-ray images
- **Classes**: Normal, COVID-19
- **Expected accuracy**: 95%+

### 2. Pneumonia Model
- **Input**: Chest X-ray images
- **Classes**: Normal, Pneumonia
- **Expected accuracy**: 94%+

### 3. Malaria Model
- **Input**: Blood cell microscopy images
- **Classes**: Uninfected, Parasitized
- **Expected accuracy**: 96%+

### 4. Brain Tumor Model
- **Input**: Brain MRI scans
- **Classes**: No Tumor, Glioma, Meningioma, Pituitary
- **Expected accuracy**: 93%+

### 5. Lung Cancer Model
- **Input**: CT scan images
- **Classes**: Normal, Adenocarcinoma, Large Cell Carcinoma, Squamous Cell Carcinoma
- **Expected accuracy**: 92%+

## Adding New Models

To add a new model:

1. Train your model with appropriate architecture
2. Save as `.h5` file
3. Place in this directory
4. Update `backend/app/utils/model_loader.py`:
   ```python
   self.model_files = {
       "your_model": "your_model.h5"
   }
   ```
5. Update `backend/app/routers/prediction.py`:
   ```python
   DISEASE_CATEGORIES = {
       "your_model": ["Class1", "Class2"]
   }
   ```

## Testing Models

You can test model loading:

```python
from tensorflow import keras
import numpy as np

# Load model
model = keras.models.load_model('covid19_model.h5')

# Check input shape
print(f"Input shape: {model.input_shape}")

# Check output shape
print(f"Output shape: {model.output_shape}")

# Test prediction
dummy_input = np.random.rand(1, 224, 224, 3)
prediction = model.predict(dummy_input)
print(f"Prediction shape: {prediction.shape}")
```

## Notes

- Model files are large (100-500 MB each)
- Not included in git repository (see .gitignore)
- Upload to persistent storage on Render
- Ensure models are compatible with TensorFlow 2.15

## Model Training Resources

If you need to train models, refer to:
- TensorFlow tutorials: https://www.tensorflow.org/tutorials
- Transfer learning guide: https://www.tensorflow.org/tutorials/images/transfer_learning
- Medical imaging datasets: Kaggle, NIH, etc.
