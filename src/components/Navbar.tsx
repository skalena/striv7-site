import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <nav className="fixed w-full bg-white text-gray-900 border-gray-200 z-50 border-b transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/">
              <img 
                src="https://skls3.cloud.skalena.com.br/-aLNH4vJQ59" 
                alt="Logo" 
                className="h-8 w-auto"
              />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <Link to="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
            <a href="/#about" className="text-gray-600 hover:text-gray-900">About</a>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg ${
                darkMode 
                  ? 'bg-sb-slate text-sb-green hover:bg-sb-slate/80' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              } transition-colors duration-200`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button className="bg-sb-green text-black font-medium px-4 py-2 rounded-lg hover:bg-sb-green/90 transition-colors duration-200">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;