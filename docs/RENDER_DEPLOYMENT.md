# ☁️ Render Deployment Guide

Complete guide for deploying Medical Diagnosis AI on Render.

## Prerequisites

- GitHub account with repository
- Render account (free tier available)
- Your trained `.h5` model files

---

## Part 1: Backend Deployment

### Step 1: Prepare Repository

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Ensure these files exist:
   - `backend/requirements.txt`
   - `backend/main.py`
   - `backend/.env.example`

### Step 2: Create Web Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select the repository

### Step 3: Configure Service

**Basic Settings:**
```
Name: medical-ai-backend
Region: Oregon (US West) or nearest
Branch: main
Root Directory: backend
Runtime: Python 3
```

**Build Settings:**
```
Build Command: pip install -r requirements.txt
Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT
```

**Instance Type:**
- Free tier: Good for testing
- Starter ($7/month): Recommended for production

### Step 4: Environment Variables

Add these environment variables:

```
PORT=8000
MODELS_DIR=/opt/render/project/src/models
TF_CPP_MIN_LOG_LEVEL=2
TF_ENABLE_ONEDNN_OPTS=0
FRONTEND_URL=https://your-frontend-url.onrender.com
PYTHON_VERSION=3.10.0
```

### Step 5: Add Persistent Disk for Models

1. In service settings, go to **"Disks"** tab
2. Click **"Add Disk"**
3. Configure:
   ```
   Name: models-disk
   Mount Path: /opt/render/project/src/models
   Size: 1 GB (adjust based on model sizes)
   ```
4. Save disk

### Step 6: Upload Model Files

**Option A: Via Render Shell**
1. Go to service → "Shell" tab
2. Upload files:
   ```bash
   cd /opt/render/project/src/models
   # Use file upload interface or wget/curl
   ```

**Option B: Via SSH/SFTP**
1. Enable SSH access in settings
2. Use SFTP client to upload models

### Step 7: Deploy

1. Click **"Create Web Service"**
2. Wait for build and deployment (5-10 minutes)
3. Monitor logs for any errors
4. Note your backend URL: `https://medical-ai-backend.onrender.com`

### Step 8: Verify Backend

1. Visit: `https://your-backend.onrender.com`
2. Should see: `{"status":"online",...}`
3. Check API docs: `https://your-backend.onrender.com/api/docs`
4. Test health endpoint: `https://your-backend.onrender.com/health`

---

## Part 2: Frontend Deployment

### Step 1: Update Frontend Configuration

1. Edit `frontend/.env` or set env vars in Render:
```env
VITE_API_URL=https://your-backend.onrender.com
```

### Step 2: Create Static Site

1. Go to Render Dashboard
2. Click **"New +"** → **"Static Site"**
3. Select your repository

### Step 3: Configure Static Site

**Basic Settings:**
```
Name: medical-ai-frontend
Branch: main
Root Directory: frontend
```

**Build Settings:**
```
Build Command: npm install && npm run build
Publish Directory: dist
```

### Step 4: Environment Variables

```
VITE_API_URL=https://medical-ai-backend.onrender.com
NODE_VERSION=18
```

### Step 5: Deploy

1. Click **"Create Static Site"**
2. Wait for build (3-5 minutes)
3. Note your frontend URL: `https://medical-ai-frontend.onrender.com`

### Step 6: Update Backend CORS

1. Go back to backend service
2. Update `FRONTEND_URL` environment variable:
   ```
   FRONTEND_URL=https://medical-ai-frontend.onrender.com
   ```
3. Redeploy backend

### Step 7: Verify Frontend

1. Visit: `https://your-frontend.onrender.com`
2. Navigate to "Diagnosis" page
3. Upload test image
4. Verify predictions work

---

## Part 3: Custom Domain (Optional)

### Backend Custom Domain

1. Go to backend service → "Settings"
2. Scroll to "Custom Domain"
3. Add domain: `api.yourdomain.com`
4. Update DNS records as instructed

### Frontend Custom Domain

1. Go to frontend static site → "Settings"
2. Add domain: `yourdomain.com`
3. Update DNS records
4. Update backend `FRONTEND_URL` accordingly

---

## Troubleshooting

### Backend Issues

**Issue: Build fails**
```bash
# Check Python version
PYTHON_VERSION=3.10.0

# Ensure requirements.txt is complete
pip freeze > requirements.txt
```

**Issue: Models not found**
- Verify disk is mounted at `/opt/render/project/src/models`
- Check `MODELS_DIR` environment variable
- Upload models via Shell or SFTP

**Issue: Out of memory**
- Upgrade to larger instance type
- Optimize model file sizes
- Use model compression

### Frontend Issues

**Issue: API connection failed**
- Check `VITE_API_URL` points to backend
- Verify CORS configuration
- Check browser console for errors

**Issue: Build fails**
```bash
# Specify Node version
NODE_VERSION=18

# Clear cache in Render settings
```

---

## Monitoring and Maintenance

### Health Checks

Render automatically monitors:
- `/health` endpoint for backend
- HTTP 200 responses

### Logs

Access logs:
1. Go to service dashboard
2. Click "Logs" tab
3. View real-time logs
4. Download logs for analysis

### Auto-Deploy

Enable auto-deploy:
1. Go to service settings
2. Enable "Auto-Deploy"
3. Push to GitHub triggers deployment

### Scaling

**Backend:**
- Upgrade instance type for more resources
- Consider horizontal scaling for high traffic

**Frontend:**
- Static sites auto-scale
- Use CDN for global distribution

---

## Cost Estimation

### Free Tier
- 750 hours/month free compute
- Sufficient for testing and development
- Apps spin down after 15 minutes inactivity

### Starter Plan ($7/month per service)
- Always-on
- No spin-down
- Recommended for production

### Pro Plan ($20+/month)
- More resources
- Better performance
- Priority support

---

## Security Best Practices

1. **Environment Variables**
   - Never commit `.env` files
   - Use Render's environment variable management
   - Rotate sensitive keys regularly

2. **HTTPS**
   - Render provides SSL certificates automatically
   - Enforce HTTPS in production

3. **API Security**
   - Implement rate limiting
   - Add authentication if needed
   - Validate all inputs

4. **Model Protection**
   - Store models on persistent disk
   - Don't commit large files to Git
   - Use Git LFS if needed

---

## Performance Optimization

1. **Backend**
   - Enable model caching
   - Use async operations
   - Optimize image preprocessing

2. **Frontend**
   - Minimize bundle size
   - Use code splitting
   - Optimize images
   - Enable compression

3. **Database** (if added later)
   - Use Render PostgreSQL
   - Implement connection pooling
   - Add caching layer

---

## Backup and Recovery

1. **Code**: Version controlled in GitHub
2. **Models**: Keep backups locally and in cloud storage
3. **Configuration**: Document all environment variables
4. **Database**: Regular backups if implemented

---

## Next Steps After Deployment

- [ ] Test all functionality
- [ ] Set up monitoring (e.g., Sentry)
- [ ] Add analytics (e.g., Google Analytics)
- [ ] Implement CI/CD pipeline
- [ ] Add automated tests
- [ ] Create user documentation
- [ ] Plan for scaling

---

**Deployment Complete! 🎉**

Your Medical Diagnosis AI is now live on Render!

Frontend: https://your-frontend.onrender.com
Backend: https://your-backend.onrender.com/api/docs
