import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const ResultsDisplay = ({ results }) => {
  if (!results) return null;

  const { primary_prediction, all_predictions, recommendation, model_type } = results;

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

  const chartData = all_predictions.map((pred, index) => ({
    name: pred.label,
    value: pred.confidence,
    color: COLORS[index % COLORS.length]
  }));

  const isPrimaryPositive = !primary_prediction.label.toLowerCase().includes('normal') && 
                            !primary_prediction.label.toLowerCase().includes('uninfected');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl"
    >
      {/* Primary Result */}
      <div className={`rounded-xl p-6 mb-6 ${
        isPrimaryPositive 
          ? 'bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-2 border-red-200 dark:border-red-800'
          : 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800'
      }`}>
        <div className="flex items-start gap-4">
          {isPrimaryPositive ? (
            <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400 flex-shrink-0" />
          ) : (
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400 flex-shrink-0" />
          )}
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">
              Primary Prediction
            </h3>
            <p className={`text-2xl font-bold mb-2 ${
              isPrimaryPositive 
                ? 'text-red-700 dark:text-red-400' 
                : 'text-green-700 dark:text-green-400'
            }`}>
              {primary_prediction.label}
            </p>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Confidence: {primary_prediction.confidence.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendation */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6">
        <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
          📋 Recommendation
        </h4>
        <p className="text-blue-700 dark:text-blue-400 text-sm">
          {recommendation}
        </p>
      </div>

      {/* Detailed Results */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 dark:text-white mb-4">
          All Predictions
        </h4>
        <div className="space-y-3">
          {all_predictions.map((pred, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {pred.label}
                </span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {pred.confidence.toFixed(2)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pred.confidence}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="h-2 rounded-full"
                  style={{ 
                    background: `linear-gradient(to right, ${COLORS[index % COLORS.length]}, ${COLORS[(index + 1) % COLORS.length]})`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pie Chart */}
      <div className="mt-6">
        <h4 className="font-semibold text-gray-800 dark:text-white mb-4 text-center">
          Confidence Distribution
        </h4>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Model Info */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Model: {model_type.toUpperCase()} | Deep Learning CNN (DenseNet121)
        </p>
      </div>
    </motion.div>
  );
};

export default ResultsDisplay;
