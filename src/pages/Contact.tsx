import React from 'react';

interface ContactProps {
  darkMode: boolean;
}

const Contact: React.FC<ContactProps> = ({ darkMode }) => {
  return (
    <div className={`min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-sb-darker' : 'bg-white'}`}>
      <div className="max-w-5xl mx-auto">
        <h1 className={`text-4xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Contact Us
        </h1>
        <div className="w-full h-[800px] rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://ai-automation.cloud.skalena.com.br/form/671cec8b-259e-4683-8a20-743156b1586a"
            className="w-full h-full border-0"
            title="Contact Form"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;