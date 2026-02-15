import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Diagnosis from './pages/Diagnosis';
import About from './pages/About';
import { ThemeProvider } from './hooks/useTheme';
import './styles/App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/diagnosis" element={<Diagnosis />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <Toaster position="top-right" richColors />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
