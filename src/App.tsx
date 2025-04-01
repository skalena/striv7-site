import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SubPage from './pages/SubPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import DynamicPage from './pages/DynamicPage';
import Contact from './pages/Contact';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import AuthorPage from './pages/AuthorPage';

function App() {
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
    <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
      <Routes>
        <Route path="/" element={<HomePage darkMode={darkMode} />} />
        <Route path="/subpage" element={<SubPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
        <Route path="/privacy" element={<PrivacyPolicy darkMode={darkMode} />} />
        <Route path="/terms" element={<Terms darkMode={darkMode} />} />
        <Route path="/contact" element={<Contact darkMode={darkMode} />} />
        <Route path="/blog" element={<BlogList darkMode={darkMode} />} />
        <Route path="/blog/:slug" element={<BlogPost darkMode={darkMode} />} />
        <Route path="/author/:id" element={<AuthorPage darkMode={darkMode} />} />
        <Route path="/pages/:slug" element={<DynamicPage darkMode={darkMode} />} />
        <Route path="/404" element={
          <div className={`min-h-screen pt-32 text-center ${darkMode ? 'bg-sb-darker text-white' : 'bg-white text-gray-900'}`}>
            <h1 className="text-2xl font-bold mb-4">404 - Page Not Found</h1>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>The page you're looking for doesn't exist.</p>
          </div>
        } />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;