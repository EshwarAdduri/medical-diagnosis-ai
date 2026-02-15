import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Activity, Brain, Droplet, Wind, Microscope, ArrowRight } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Wind className="w-8 h-8" />,
      title: "COVID-19 Detection",
      description: "Analyze chest X-rays for COVID-19 indicators",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Pneumonia Detection",
      description: "Identify pneumonia from chest radiographs",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Droplet className="w-8 h-8" />,
      title: "Malaria Detection",
      description: "Detect parasites in blood cell images",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-4xl mx-auto mb-16"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 shadow-2xl">
            <Activity className="w-16 h-16 text-white animate-pulse-slow" />
          </div>
        </motion.div>

        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          Medical Diagnosis AI
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Advanced deep learning system for automated medical image analysis.
          Powered by state-of-the-art CNN models for accurate disease detection.
        </p>

        <Link to="/diagnosis">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            Start Diagnosis
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </Link>
      </motion.div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-4`}>
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

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl"
      >
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">3</div>
            <div className="text-blue-100">Disease Models</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">95%+</div>
            <div className="text-blue-100">Accuracy</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">24/7</div>
            <div className="text-blue-100">Availability</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
