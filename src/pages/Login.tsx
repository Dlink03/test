import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, MessageSquare, Zap, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationsContext';

const Login = () => {
  const { login, isAuthenticated, isLoading } = useAuth();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async () => {
    try {
      await login();
      addNotification('success', 'Successfully logged in!');
    } catch (error) {
      addNotification('error', 'Login failed. Please try again.');
      console.error('Login error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white dark:bg-gray-900">
      {/* Left side - Hero section */}
      <div className="flex-1 flex flex-col justify-center p-8 md:p-12 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-md mx-auto">
          <div className="flex items-center mb-6">
            <Mail className="h-8 w-8 mr-2" />
            <h1 className="text-3xl font-bold">EmailAI</h1>
          </div>
          
          <h2 className="text-4xl font-bold mb-6">Revolutionize Your Email Experience</h2>
          <p className="text-xl mb-8">Leverage AI to streamline communication, automate responses, and save hours every week.</p>
          
          <div className="space-y-6">
            <div className="flex">
              <div className="mr-4 bg-white bg-opacity-20 rounded-full p-2">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">AI-Powered Responses</h3>
                <p className="text-white text-opacity-80">Generate intelligent replies with context awareness.</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 bg-white bg-opacity-20 rounded-full p-2">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Smart Classification</h3>
                <p className="text-white text-opacity-80">Automatically organize emails by priority and category.</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 bg-white bg-opacity-20 rounded-full p-2">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Secure Integration</h3>
                <p className="text-white text-opacity-80">Safely connect with your Gmail account.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Login form */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-12">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Sign in to EmailAI</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Connect your Gmail account to get started
            </p>
          </div>
          
          <div className="mt-8 space-y-6">
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-blue-500 group-hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12c6.627 0 12-5.373 12-12S18.627 0 12 0zm6.241 12.53c0 .247-.025.492-.062.727-.25.078-.043.158-.078.235-1.079 3.011-3.612 4.577-6.512 4.577a6.558 6.558 0 01-3.106-.756c.078.091.212.226.401.354a7.534 7.534 0 004.167 1.238c4.137 0 7.497-3.354 7.497-7.495 0-.792-.127-1.554-.362-2.268-.248.846-.761 1.663-1.945 3.388zm-8.427-2.862l-1.055 2.954 2.843-1.529 1.372-3.854-3.16 2.429zM12.27 9.927l-2.426 1.556 1.025-2.868 2.426-1.556-1.025 2.868zm-2.252 3.162l1.791-.963-.759 2.129-1.791.963.759-2.129zm3.15.807l2.93-1.557-.759 2.127-2.93 1.557.759-2.127zm-.784 2.256l-2.677 1.431.759-2.127 2.677-1.432-.759 2.128z" />
                </svg>
              </span>
              Sign in with Google
            </button>
            
            <div className="text-sm text-center">
              <p className="text-gray-500 dark:text-gray-400">
                By signing in, you agree to our{" "}
                <a href="#terms" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#privacy" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;