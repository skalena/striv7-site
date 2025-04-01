import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SubPageProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const SubPage: React.FC<SubPageProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <>
      {/* Hero Section */}
      <div className={`pt-32 pb-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gradient-to-b from-sb-dark to-sb-darker' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
        <div className="max-w-7xl mx-auto">
          <h1 className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
            Welcome to Our Subpage
          </h1>
          <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-8 max-w-2xl`}>
            This is a template for creating new pages while maintaining consistent navigation and footer components.
          </p>
          <button className="bg-sb-green text-black font-medium px-6 py-3 rounded-lg hover:bg-sb-green/90 flex items-center w-fit">
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <div>
            <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Section Title
            </h2>
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div>
            <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Another Section
            </h2>
            <p className="mb-4">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className={`${darkMode ? 'bg-sb-dark' : 'bg-gray-50'} py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} text-center mb-12`}>
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className={`${
                  darkMode ? 'bg-sb-darker border-gray-800' : 'bg-white border-gray-200'
                } p-6 rounded-xl border`}
              >
                <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Feature {item}
                </h3>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SubPage;