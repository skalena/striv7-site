import React from 'react';

interface PrivacyPolicyProps {
  darkMode: boolean;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ darkMode }) => {
  return (
    <div className={`pt-32 pb-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-sb-darker text-gray-300' : 'bg-white text-gray-600'}`}>
      <div className="max-w-3xl mx-auto">
        <h1 className={`text-4xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Privacy Policy</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Introduction</h2>
            <p className="mb-4">
              At DevAPI, we take your privacy seriously. This privacy policy describes how we collect, use, and protect your personal information.
            </p>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Account information (name, email, password)</li>
              <li>Usage data and analytics</li>
              <li>API usage statistics</li>
              <li>Technical information about your device and browser</li>
            </ul>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and improve our services</li>
              <li>To communicate with you about your account</li>
              <li>To send important updates and notifications</li>
              <li>To analyze and optimize our platform</li>
            </ul>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Data Security</h2>
            <p className="mb-4">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Contact Us</h2>
            <p>
              If you have any questions about our privacy policy, please contact us at privacy@devapi.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;