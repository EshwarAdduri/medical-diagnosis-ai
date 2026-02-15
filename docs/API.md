# 📡 API Documentation

Complete API reference for Medical Diagnosis AI backend.

## Base URL

- **Local Development**: `http://localhost:8000`
- **Production**: `https://your-backend.onrender.com`

## API Version

Current version: `v1`

All endpoints are prefixed with `/api/v1` (except root and health checks).

---

## Authentication

Currently, the API does not require authentication. For production use, consider implementing:
- JWT tokens
- API keys
- OAuth2

---

## Endpoints

### 1. Root Endpoint

**GET** `/`

Health check and service information.

**Response:**
```json
{
  "status": "online",
  "service": "Medical Diagnosis AI",
  "version": "2.0.0",
  "endpoints": {
    "docs": "/api/docs",
    "prediction": "/api/v1/predict"
  }
}
```

---

### 2. Health Check

**GET** `/health`

Detailed health status.

**Response:**
```json
{
  "status": "healthy",
  "models_loaded": true,
  "api_version": "2.0.0"
}
```

---

### 3. Predict Disease

**POST** `/api/v1/predict`

Analyze medical image and predict disease.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file` | File | Yes | Medical image (JPEG, PNG, BMP, TIFF) |
| `model_type` | Query String | Yes | Model to use (see available models) |

**Model Types:**
- `covid` - COVID-19 detection
- `pneumonia` - Pneumonia detection
- `malaria` - Malaria detection
- `brain_tumor` - Brain tumor classification
- `lung` - Lung cancer detection

**Example Request (curl):**
```bash
curl -X POST "http://localhost:8000/api/v1/predict?model_type=covid" \
  -H "accept: application/json" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@chest_xray.jpg"
```

**Example Request (Python):**
```python
import requests

url = "http://localhost:8000/api/v1/predict"
files = {"file": open("chest_xray.jpg", "rb")}
params = {"model_type": "covid"}

response = requests.post(url, files=files, params=params)
print(response.json())
```

**Example Request (JavaScript):**
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);

const response = await fetch(
  'http://localhost:8000/api/v1/predict?model_type=covid',
  {
    method: 'POST',
    body: formData
  }
);

const result = await response.json();
console.log(result);
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "model_type": "covid",
  "filename": "chest_xray.jpg",
  "primary_prediction": {
    "label": "COVID-19",
    "confidence": 95.67
  },
  "all_predictions": [
    {
      "label": "COVID-19",
      "confidence": 95.67
    },
    {
      "label": "Normal",
      "confidence": 4.33
    }
  ],
  "recommendation": "⚠️ Positive COVID-19 indication detected. Please consult a healthcare professional immediately.",
  "image_size": {
    "width": 512,
    "height": 512
  }
}
```

**Error Responses:**

**400 Bad Request** - Invalid input
```json
{
  "detail": "Invalid model type. Choose from: ['covid', 'pneumonia', 'malaria', 'brain_tumor', 'lung']"
}
```

**400 Bad Request** - Invalid file
```json
{
  "detail": "File must be an image (JPEG, PNG, etc.)"
}
```

**400 Bad Request** - Low resolution
```json
{
  "detail": "Image resolution too low. Minimum 50x50 pixels required."
}
```

**500 Internal Server Error** - Prediction failed
```json
{
  "detail": "Prediction failed: [error details]"
}
```

---

### 4. Get Available Models

**GET** `/api/v1/models`

List all available disease detection models.

**Response:**
```json
{
  "available_models": ["covid", "pneumonia", "malaria", "brain_tumor", "lung"],
  "model_details": {
    "covid": {
      "name": "COVID-19 Detection",
      "input": "Chest X-ray",
      "categories": ["Normal", "COVID-19"]
    },
    "pneumonia": {
      "name": "Pneumonia Detection",
      "input": "Chest X-ray",
      "categories": ["Normal", "Pneumonia"]
    },
    "malaria": {
      "name": "Malaria Detection",
      "input": "Blood Cell Microscopy",
      "categories": ["Uninfected", "Parasitized"]
    }
  }
}
```

---

## Rate Limiting

Currently no rate limiting implemented. For production:
- Implement rate limiting (e.g., 100 requests/hour)
- Use tools like SlowAPI or FastAPI-Limiter
- Monitor usage patterns

---

## CORS Configuration

CORS is enabled for:
- `http://localhost:3000`
- `http://localhost:5173`
- `https://*.onrender.com`
- Custom frontend URL from environment variable

To add more origins, update `backend/main.py`:
```python
origins = [
    "http://localhost:3000",
    "https://yourdomain.com"
]
```

---

## Error Handling

All errors return JSON with `detail` field:

```json
{
  "detail": "Error message here"
}
```

**HTTP Status Codes:**
- `200` - Success
- `400` - Bad Request (invalid input)
- `404` - Not Found
- `500` - Internal Server Error

---

## File Upload Specifications

**Supported Formats:**
- JPEG (.jpg, .jpeg)
- PNG (.png)
- BMP (.bmp)
- TIFF (.tiff, .tif)

**Size Limits:**
- Maximum: 10 MB per file
- Minimum resolution: 50x50 pixels

**Preprocessing:**
- Auto-resize to 224x224
- Convert to RGB
- Normalize to [0, 1]

---

## Model Information

### COVID-19 Model
- **Architecture**: DenseNet121
- **Input**: 224x224 RGB
- **Classes**: Normal, COVID-19
- **Accuracy**: 95%+

### Pneumonia Model
- **Architecture**: DenseNet121
- **Input**: 224x224 RGB
- **Classes**: Normal, Pneumonia
- **Accuracy**: 94%+

### Malaria Model
- **Architecture**: DenseNet121
- **Input**: 224x224 RGB
- **Classes**: Uninfected, Parasitized
- **Accuracy**: 96%+

### Brain Tumor Model
- **Architecture**: DenseNet121
- **Input**: 224x224 RGB
- **Classes**: No Tumor, Glioma, Meningioma, Pituitary
- **Accuracy**: 93%+

### Lung Cancer Model
- **Architecture**: DenseNet121
- **Input**: 224x224 RGB
- **Classes**: 4 cancer types
- **Accuracy**: 92%+

---

## Interactive Documentation

FastAPI provides interactive API documentation:

- **Swagger UI**: http://localhost:8000/api/docs
- **ReDoc**: http://localhost:8000/api/redoc

These interfaces allow you to:
- View all endpoints
- Test API calls
- See request/response schemas
- Download OpenAPI spec

---

## SDK Examples

### Python SDK

```python
import requests
from pathlib import Path

class MedicalAI:
    def __init__(self, base_url="http://localhost:8000"):
        self.base_url = base_url

    def predict(self, image_path, model_type):
        url = f"{self.base_url}/api/v1/predict"
        files = {"file": open(image_path, "rb")}
        params = {"model_type": model_type}

        response = requests.post(url, files=files, params=params)
        return response.json()

    def get_models(self):
        url = f"{self.base_url}/api/v1/models"
        response = requests.get(url)
        return response.json()

# Usage
client = MedicalAI()
result = client.predict("xray.jpg", "covid")
print(result["primary_prediction"])
```

### JavaScript SDK

```javascript
class MedicalAI {
  constructor(baseUrl = 'http://localhost:8000') {
    this.baseUrl = baseUrl;
  }

  async predict(file, modelType) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(
      `${this.baseUrl}/api/v1/predict?model_type=${modelType}`,
      {
        method: 'POST',
        body: formData
      }
    );

    return await response.json();
  }

  async getModels() {
    const response = await fetch(`${this.baseUrl}/api/v1/models`);
    return await response.json();
  }
}

// Usage
const client = new MedicalAI();
const result = await client.predict(fileInput.files[0], 'covid');
console.log(result.primary_prediction);
```

---

## Best Practices

1. **Error Handling**: Always handle errors gracefully
2. **File Validation**: Validate file type and size before upload
3. **Timeouts**: Set appropriate timeouts (30-60 seconds)
4. **Retry Logic**: Implement retry for transient failures
5. **Logging**: Log all API calls for monitoring
6. **Security**: Use HTTPS in production

---

## Support

For API issues:
- Check logs: Backend console output
- API docs: http://localhost:8000/api/docs
- GitHub Issues: Report bugs and feature requests

---

**API Version 2.0.0** | Last Updated: February 2026
