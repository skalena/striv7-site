import React from 'react';
import { ArrowRight, Shield, Zap, Github, Twitter, CheckCircle2, Users, MessageSquare, Workflow } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';

interface HomePageProps {
  darkMode: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ darkMode }) => {
  return (
    <>
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-sb-darker">
          <div className="absolute inset-0 bg-gradient-to-r from-sb-green/20 to-transparent animate-gradient-x"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sb-dark/50 to-sb-darker"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(62,207,142,0.1),transparent_50%)]"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 animate-fade-in">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight animate-slide-up">
              The Modern API Gateway
              <br />
              <span className="bg-gradient-to-r from-sb-green to-[#4FD1FF] text-transparent bg-clip-text">
                for Developer Teams
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto animate-slide-up-delay">
              Build, secure, and monitor your APIs with our powerful gateway platform.
              Deploy anywhere with enterprise-grade security.
            </p>
            <div className="flex justify-center gap-4 animate-slide-up-delay-2">
              <button className="group bg-sb-green hover:bg-sb-green/90 text-black font-medium px-8 py-4 rounded-lg transition-all duration-200 flex items-center">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 rounded-lg border border-gray-700 text-gray-300 hover:bg-sb-slate transition-colors duration-200">
                View Documentation
              </button>
            </div>
          </div>
        </div>

        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-sb-green/10 rounded-full blur-3xl animate-orbit"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-[#4FD1FF]/10 rounded-full blur-3xl animate-orbit-reverse"></div>
        </div>
      </div>

      {/* Services Section */}
      <div id="services" className="py-20 bg-sb-darker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-sb-dark border-gray-800 p-8 rounded-xl border">
              <div className="bg-sb-slate w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-sb-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">API Gateway</h3>
              <p className="text-gray-400">Enterprise-grade API management with advanced security and monitoring features.</p>
            </div>
            <div className="bg-sb-dark border-gray-800 p-8 rounded-xl border">
              <div className="bg-sb-slate w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-sb-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Security Solutions</h3>
              <p className="text-gray-400">Comprehensive security features including authentication, rate limiting, and threat protection.</p>
            </div>
            <div className="bg-sb-dark border-gray-800 p-8 rounded-xl border">
              <div className="bg-sb-slate w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6 text-sb-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Analytics</h3>
              <p className="text-gray-400">Real-time monitoring and analytics for your API performance and usage.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div id="process" className="py-20 bg-sb-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-sb-slate w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Workflow className="h-8 w-8 text-sb-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Plan</h3>
              <p className="text-gray-400">Define your API strategy and requirements</p>
            </div>
            <div className="text-center">
              <div className="bg-sb-slate w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-sb-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Build</h3>
              <p className="text-gray-400">Develop and test your APIs</p>
            </div>
            <div className="text-center">
              <div className="bg-sb-slate w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-sb-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Secure</h3>
              <p className="text-gray-400">Implement security measures</p>
            </div>
            <div className="text-center">
              <div className="bg-sb-slate w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-sb-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Deploy</h3>
              <p className="text-gray-400">Launch and monitor your APIs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Section */}
      <div id="animation" className="relative min-h-[70vh] flex items-center">
        <AnimatedBackground darkMode={darkMode} />
        <div className="w-full pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10 bg-gradient-to-b from-sb-dark/50 to-sb-darker">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Interactive Background
              <br />
              Animation Showcase
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              A dynamic background animation featuring geometric shapes with smooth transitions and connections.
              Toggle dark mode to see different color schemes.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-sb-green text-black font-medium px-6 py-3 rounded-lg hover:bg-sb-green/90 flex items-center">
                Try it Now <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="border border-gray-700 text-gray-300 hover:bg-sb-slate px-6 py-3 rounded-lg">
                View Code
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div id="about" className="py-20 bg-sb-darker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">About Us</h2>
              <p className="text-gray-400 mb-4">
                We're a team of passionate developers and engineers dedicated to making API management simple and secure.
                With years of experience in enterprise solutions, we understand the challenges of modern API development.
              </p>
              <p className="text-gray-400 mb-6">
                Our mission is to provide developers with the tools they need to build and manage world-class APIs.
              </p>
              <div className="flex items-center space-x-4">
                <Users className="h-12 w-12 text-sb-green" />
                <div>
                  <h4 className="text-white font-semibold">Expert Team</h4>
                  <p className="text-gray-400">20+ years of combined experience</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                alt="Team collaboration" 
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="py-20 bg-sb-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Contact Us</h2>
            <p className="text-gray-400 mb-8">
              Have questions? We're here to help. Send us a message and we'll respond as soon as possible.
            </p>
            <div className="bg-sb-slate p-8 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <input
                  type="text"
                  placeholder="Name"
                  className="bg-sb-dark text-white placeholder-gray-500 border-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sb-green border"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-sb-dark text-white placeholder-gray-500 border-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sb-green border"
                />
              </div>
              <textarea
                placeholder="Message"
                rows={4}
                className="w-full bg-sb-dark text-white placeholder-gray-500 border-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sb-green border mb-6"
              ></textarea>
              <button className="bg-sb-green text-black font-medium px-8 py-3 rounded-lg hover:bg-sb-green/90 flex items-center mx-auto">
                Send Message <MessageSquare className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex justify-center space-x-4 py-8">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          <Github className="h-6 w-6 text-gray-400 hover:text-white" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <Twitter className="h-6 w-6 text-gray-400 hover:text-white" />
        </a>
      </div>
    </>
  );
};

export default HomePage;