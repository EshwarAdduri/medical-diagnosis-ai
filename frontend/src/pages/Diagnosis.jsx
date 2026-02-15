import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Loader2, CheckCircle, AlertCircle, Image as ImageIcon } from 'lucide-react';
import axios from 'axios';
import ResultsDisplay from '../components/ResultsDisplay';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const Diagnosis = () => {
  const [selectedModel, setSelectedModel] = useState('covid');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);

  const models = [
    { id: 'covid', name: 'COVID-19', icon: '🦠', description: 'Chest X-ray Analysis' },
    { id: 'pneumonia', name: 'Pneumonia', icon: '🫁', description: 'Chest X-ray Analysis' },
    { id: 'malaria', name: 'Malaria', icon: '🔬', description: 'Blood Cell Analysis' }
  ];

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
      setResults(null);
      toast.success('Image uploaded successfully!');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.bmp', '.tiff']
    },
    multiple: false,
    maxSize: 10485760 // 10MB
  });

  const handlePredict = async () => {
  if (!uploadedImage) {
    toast.error('Please upload an image first!');
    return;
  }

  setIsLoading(true);
  setResults(null);

  const formData = new FormData();
  formData.append('file', uploadedImage); // ✅ only file in body

  try {
    const response = await axios.post(
      `${API_URL}/api/v1/predict?model_type=${selectedModel}`, // ✅ model_type ONLY in query
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    setResults(response.data);
    toast.success('Prediction completed!');
  } catch (error) {
    console.error('Prediction error:', error);
    const errorMessage =
      error.response?.data?.detail || 'Prediction failed. Please try again.';
    toast.error(errorMessage);
  } finally {
    setIsLoading(false);
  }
};

  const clearImage = () => {
    setUploadedImage(null);
    setImagePreview(null);
    setResults(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Medical Image Diagnosis
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Upload a medical image and select a diagnosis model
          </p>
        </div>

        {/* Model Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Select Diagnosis Model
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {models.map((model) => (
              <motion.button
                key={model.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedModel(model.id);
                  setResults(null);
                }}
                className={`p-4 rounded-xl transition-all duration-300 ${
                  selectedModel === model.id
                    ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-xl'
                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-lg hover:shadow-xl'
                }`}
              >
                <div className="text-3xl mb-2">{model.icon}</div>
                <div className="font-semibold">{model.name}</div>
                <div className={`text-xs mt-1 ${
                  selectedModel === model.id ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {model.description}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Upload Zone */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Upload Image
            </h2>

            {!imagePreview ? (
              <div
                {...getRootProps()}
                className={`border-4 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
                  isDragActive
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
                } bg-white dark:bg-gray-800`}
              >
                <input {...getInputProps()} />
                <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
                <p className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {isDragActive ? 'Drop image here' : 'Drag & drop image'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  or click to browse (Max 10MB)
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                  Supported: JPEG, PNG, BMP, TIFF
                </p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl"
              >
                <button
                  onClick={clearImage}
                  className="absolute -top-3 -right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg z-10"
                >
                  <X className="w-5 h-5" />
                </button>
                <img
                  src={imagePreview}
                  alt="Uploaded"
                  className="w-full h-96 object-contain rounded-xl"
                />
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <ImageIcon className="w-4 h-4" />
                    <span>{uploadedImage?.name}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {(uploadedImage?.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                </div>
              </motion.div>
            )}

            {/* Predict Button */}
            {imagePreview && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
  console.log("Run Diagnosis clicked");
  handlePredict();
}}
                disabled={isLoading}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Run Diagnosis
                  </>
                )}
              </motion.button>
            )}
          </div>

          {/* Results Display */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Diagnosis Results
            </h2>

            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center shadow-xl"
                >
                  <Loader2 className="w-16 h-16 mx-auto mb-4 text-blue-500 animate-spin" />
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Analyzing image...
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    This may take a few seconds
                  </p>
                </motion.div>
              ) : results ? (
                <ResultsDisplay results={results} />
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center shadow-xl"
                >
                  <AlertCircle className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
                  <p className="text-gray-500 dark:text-gray-400">
                    Upload an image and click "Run Diagnosis" to see results
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Diagnosis;
