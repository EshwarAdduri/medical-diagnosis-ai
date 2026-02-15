FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Install system dependencies
# libgl1 is the modern replacement for libgl1-mesa-glx
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    git \
    git-lfs \
    && rm -rf /var/lib/apt/lists/*

# Initialize Git LFS to handle your .h5 models
RUN git lfs install

# Copy requirements first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Critical: Pull the actual model files from LFS
RUN git lfs pull

# Create models directory
RUN mkdir -p models

# Expose port
EXPOSE 8000

# Run application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]