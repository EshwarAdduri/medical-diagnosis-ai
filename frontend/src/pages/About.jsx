import { motion } from 'framer-motion';
import { Brain, Shield, Zap, Globe, Github, Linkedin, Mail, User, Calendar, Microscope } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Deep Learning Powered",
      description: "Built with TensorFlow and Keras using state-of-the-art CNN architectures (DenseNet121)"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Predictions",
      description: "Fast inference with optimized models for quick diagnosis results"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Medical Grade Accuracy",
      description: "Trained on validated medical datasets with 95%+ accuracy across models"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Cloud Deployed",
      description: "Scalable infrastructure on Render with FastAPI backend and React frontend"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            About This Project
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            AI-Powered Medical Diagnosis System
          </p>
        </div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl mb-12"
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            Project Overview
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
            This is a comprehensive medical diagnosis system leveraging deep learning for automated 
            analysis of medical images. The application uses trained CNN models (DenseNet121 with 
            transfer learning) to detect various diseases including COVID-19, Pneumonia, Malaria, 
            and Lung Cancer from X-ray, MRI, CT, and microscopic images.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Built with modern web technologies and deployed on cloud infrastructure, this system 
            demonstrates the practical application of AI in healthcare diagnostics.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <div className="inline-flex p-3 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Technology Stack</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-blue-100">Frontend</h3>
              <ul className="space-y-2 text-blue-50">
                <li>• React 18 with Vite</li>
                <li>• TailwindCSS for styling</li>
                <li>• Framer Motion for animations</li>
                <li>• Axios for API calls</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-blue-100">Backend</h3>
              <ul className="space-y-2 text-blue-50">
                <li>• FastAPI (Python)</li>
                <li>• TensorFlow / Keras</li>
                <li>• DenseNet121 CNN models</li>
                <li>• Async file handling</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Developer Profile - UPDATED */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl mb-12 border-l-8 border-blue-600"
        >
          <div className="flex items-center mb-6">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-4">
              <Microscope className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Developer Information</h2>
              <p className="text-blue-600 dark:text-blue-400 font-medium">AI Engineer | Data Scientist</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <User className="w-5 h-5 mr-3 text-blue-500" />
                <span className="font-semibold mr-2">Name:</span> Eshwar Adduri
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Mail className="w-5 h-5 mr-3 text-blue-500" />
                <span className="font-semibold mr-2">Email:</span> addurieshwar6@gmail.com
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Zap className="w-5 h-5 mr-3 text-blue-500" />
                <span className="font-semibold mr-2">Expertise:</span> PyTorch, MONAI, DICOM
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Calendar className="w-5 h-5 mr-3 text-blue-500" />
                <span className="font-semibold mr-2">Last Updated:</span> February 2026
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Shield className="w-5 h-5 mr-3 text-blue-500" />
                <span className="font-semibold mr-2">Version:</span> 2.0.0 (Production)
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Globe className="w-5 h-5 mr-3 text-blue-500" />
                <span className="font-semibold mr-2">Current Role:</span> AI Engineer @ Paraxial Tech
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
            <a href="https://github.com/EshwarAdduri" target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-200 font-semibold">
              <Github className="w-5 h-5 mr-2" /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/eshwaradduri" target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              <Linkedin className="w-5 h-5 mr-2" /> LinkedIn
            </a>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-300 dark:border-yellow-700 rounded-xl p-6"
        >
          <h3 className="font-bold text-yellow-800 dark:text-yellow-300 mb-2">
            ⚠️ Medical Disclaimer
          </h3>
          <p className="text-yellow-700 dark:text-yellow-400 text-sm">
            This system is for educational and research purposes only. It is not a substitute 
            for professional medical advice, diagnosis, or treatment. Always consult qualified 
            healthcare professionals for medical decisions.
          </p>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-center mt-12 text-gray-600 dark:text-gray-400"
        >
          <p className="mb-4">Built with ❤️ using React, FastAPI, and TensorFlow</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;