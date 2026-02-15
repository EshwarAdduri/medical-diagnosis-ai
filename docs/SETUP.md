# 🚀 Complete Setup Guide

## Table of Contents
1. [Local Development Setup](#local-development-setup)
2. [Docker Setup](#docker-setup)
3. [Render Deployment](#render-deployment)
4. [Troubleshooting](#troubleshooting)

---

## Local Development Setup

### Step 1: Prerequisites Check

Ensure you have the following installed:

```bash
# Check Python version (should be 3.10+)
python --version

# Check Node.js version (should be 18.x+)
node --version

# Check npm version
npm --version

# Check git
git --version
```

### Step 2: Clone and Navigate

```bash
git clone <your-repo-url>
cd medical-diagnosis-ai
```

### Step 3: Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Upgrade pip
pip install --upgrade pip

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Edit .env if needed (optional)
```

### Step 4: Add Model Files

Place your trained `.h5` model files in the `models/` directory:

```
models/
├── covid19_model.h5
├── pneumonia_model.h5
├── malaria_model.h5
├── brain_tumor_model.h5
└── lung_cancer_model.h5
```

**Important**: If your model filenames are different, update them in:
`backend/app/utils/model_loader.py`

### Step 5: Frontend Setup

```bash
# Navigate to frontend (from project root)
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# The default API URL is http://localhost:8000
# Change VITE_API_URL in .env if your backend runs on different port
```

### Step 6: Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
python main.py
```

You should see:
```
INFO:     Started server process
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete.
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

You should see:
```
VITE v5.0.11  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Step 7: Test the Application

1. Open browser: http://localhost:5173
2. Navigate to "Diagnosis" page
3. Upload a test medical image
4. Select appropriate model
5. Click "Run Diagnosis"
6. Verify results display correctly

---

## Docker Setup

### Prerequisites
- Docker Desktop installed
- Docker Compose installed

### Build and Run

```bash
# From project root directory

# Build images
docker-compose build

# Start containers
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

### Accessing Services

- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/api/docs

### Docker Troubleshooting

**Problem**: Models not loading
```bash
# Ensure models directory is mounted correctly
docker-compose down
# Place models in ./models directory
docker-compose up -d
```

**Problem**: Port already in use
```bash
# Change ports in docker-compose.yml
ports:
  - "8001:8000"  # Changed from 8000:8000
```

---

## Render Deployment

### Backend Deployment on Render

1. **Create Web Service**
   - Go to Render Dashboard
   - Click "New" → "Web Service"
   - Connect your GitHub repository

2. **Configure Build Settings**
   ```
   Name: medical-ai-backend
   Region: Select nearest region
   Branch: main
   Root Directory: backend
   Runtime: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT
   ```

3. **Add Environment Variables**
   ```
   PORT=8000
   MODELS_DIR=./models
   TF_CPP_MIN_LOG_LEVEL=2
   TF_ENABLE_ONEDNN_OPTS=0
   FRONTEND_URL=<your-frontend-url>
   ```

4. **Add Persistent Disk**
   - Go to "Disks" tab
   - Add disk: `/opt/render/project/src/models`
   - Upload your `.h5` model files via Render Shell or SFTP

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Note the backend URL: `https://your-app.onrender.com`

### Frontend Deployment on Render

1. **Create Static Site**
   - Click "New" → "Static Site"
   - Connect your GitHub repository

2. **Configure Build Settings**
   ```
   Name: medical-ai-frontend
   Branch: main
   Root Directory: frontend
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```

3. **Add Environment Variables**
   ```
   VITE_API_URL=https://your-backend.onrender.com
   ```

4. **Deploy**
   - Click "Create Static Site"
   - Wait for deployment (3-5 minutes)
   - Access your app: `https://your-frontend.onrender.com`

### Post-Deployment Verification

1. Visit frontend URL
2. Check if API connection works
3. Upload test image
4. Verify predictions work correctly
5. Check API docs: `https://your-backend.onrender.com/api/docs`

---

## Troubleshooting

### Backend Issues

**Issue**: Models not loading
```python
# Check model files exist
import os
print(os.listdir('./models'))

# Verify model can be loaded
from tensorflow import keras
model = keras.models.load_model('./models/covid19_model.h5')
```

**Issue**: CORS errors
- Check `FRONTEND_URL` in backend `.env`
- Ensure CORS origins include your frontend URL
- Restart backend after changes

**Issue**: High memory usage
- TensorFlow loads models into memory
- Consider model optimization or compression
- Increase server RAM if needed

### Frontend Issues

**Issue**: API connection failed
- Check `VITE_API_URL` in frontend `.env`
- Ensure backend is running
- Check browser console for errors
- Verify CORS is configured correctly

**Issue**: Build fails
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Issue**: Images not uploading
- Check file size (max 10MB)
- Verify file type is supported (JPEG, PNG, BMP, TIFF)
- Check browser console for errors

### Performance Issues

**Issue**: Slow predictions
- Models are loaded on first request (cold start)
- Consider model preloading on startup
- Use model quantization for faster inference

**Issue**: Large bundle size
- Check if all dependencies are necessary
- Use code splitting
- Optimize images and assets

### Deployment Issues

**Issue**: Render build fails
- Check build logs carefully
- Ensure all dependencies in requirements.txt/package.json
- Verify Python/Node versions match

**Issue**: Models missing on Render
- Upload models to persistent disk
- Check disk is mounted correctly
- Verify `MODELS_DIR` environment variable

**Issue**: Timeout on Render free tier
- Free tier has 750 hours/month
- App spins down after inactivity
- Consider paid plan for production

---

## Getting Help

If you encounter issues not covered here:

1. **Check logs**: 
   - Backend: `backend/logs/`
   - Frontend: Browser console
   - Docker: `docker-compose logs`

2. **API Documentation**: 
   - http://localhost:8000/api/docs

3. **GitHub Issues**: 
   - Search existing issues
   - Create new issue with:
     - Error message
     - Steps to reproduce
     - Environment details

4. **Testing**:
   - Use sample test images
   - Test with Postman/curl
   - Check API endpoints directly

---

## Next Steps

After successful setup:

1. ✅ Test all 5 disease models
2. ✅ Customize UI theme/branding
3. ✅ Add more features (history, user accounts)
4. ✅ Improve model accuracy
5. ✅ Add monitoring and analytics
6. ✅ Set up CI/CD pipeline
7. ✅ Add unit and integration tests

---

**Happy Coding! 🚀**
