import React, { useState, useEffect } from 'react';
import AnimatedBackground from '../components/AnimatedBackground';
import { Sun, Moon, ArrowRight } from 'lucide-react';

function AnimationShowcase() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-sb-darker' : 'bg-white'} transition-colors duration-200`}>
      {/* Header */}
      <div className={`fixed top-0 left-0 right-0 ${darkMode ? 'bg-sb-darker/80' : 'bg-white/80'} backdrop-blur-sm z-50 border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="https://skls3.cloud.skalena.com.br/-aLNH4vJQ59" 
              alt="Logo" 
              className="h-8 w-auto"
            />
          </div>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg ${darkMode ? 'bg-sb-slate text-sb-green hover:bg-sb-slate/80' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative min-h-[70vh] flex items-center">
        <AnimatedBackground darkMode={darkMode} />
        <div className={`w-full pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10 ${darkMode ? 'bg-gradient-to-b from-sb-dark/50 to-sb-darker' : 'bg-gradient-to-b from-gray-50/50 to-white'}`}>
          <div className="max-w-7xl mx-auto text-center">
            <h1 className={`text-5xl md:text-6xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
              Interactive Background
              <br />
              Animation Showcase
            </h1>
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-8 max-w-2xl mx-auto`}>
              A dynamic background animation featuring geometric shapes with smooth transitions and connections.
              Toggle dark mode to see different color schemes.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-sb-green text-black font-medium px-6 py-3 rounded-lg hover:bg-sb-green/90 flex items-center">
                Try it Now <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className={`border ${darkMode ? 'border-gray-700 text-gray-300 hover:bg-sb-slate' : 'border-gray-300 text-gray-600 hover:bg-gray-100'} px-6 py-3 rounded-lg`}>
                View Code
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className={`p-8 rounded-xl ${darkMode ? 'bg-sb-dark' : 'bg-gray-50'}`}>
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Animation Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Floating geometric shapes (circles, squares, triangles)',
              'Dynamic connections between nearby shapes',
              'Gradient-colored connecting lines',
              'Responsive to window resizing',
              'Smooth color transitions',
              'Customizable dark/light modes'
            ].map((feature, index) => (
              <div key={index} className={`p-4 rounded-lg ${darkMode ? 'bg-sb-slate' : 'bg-white'}`}>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>• {feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimationShowcase;