import React from 'react';

interface TermsProps {
  darkMode: boolean;
}

const Terms: React.FC<TermsProps> = ({ darkMode }) => {
  return (
    <div className={`pt-32 pb-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-sb-darker text-gray-300' : 'bg-white text-gray-600'}`}>
      <div className="max-w-3xl mx-auto">
        <h1 className={`text-4xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Terms of Service</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Agreement to Terms</h2>
            <p className="mb-4">
              By accessing or using DevAPI's services, you agree to be bound by these terms and conditions.
            </p>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Use License</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You may use our services for your personal or business needs</li>
              <li>You must not modify or copy our proprietary software</li>
              <li>You are responsible for maintaining the security of your account</li>
              <li>You must comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Service Availability</h2>
            <p className="mb-4">
              We strive to maintain high availability of our services but do not guarantee uninterrupted access. We reserve the right to modify or discontinue services with reasonable notice.
            </p>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Limitation of Liability</h2>
            <p className="mb-4">
              DevAPI shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our services.
            </p>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through our platform.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;