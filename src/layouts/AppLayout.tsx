import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/navigation/Sidebar';
import Header from '../components/navigation/Header';
import { Mail, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-sm">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="flex items-center">
          <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span className="ml-2 font-bold text-lg">EmailAI</span>
        </div>
        {user && (
          <div className="flex items-center">
            <img
              src={user.profileImageUrl || 'https://via.placeholder.com/32'}
              alt={user.name || 'User'}
              className="h-8 w-8 rounded-full"
            />
          </div>
        )}
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Mobile (overlay) */}
        <div
          className={`lg:hidden fixed inset-0 z-40 ${
            sidebarOpen ? 'block' : 'hidden'
          }`}
        >
          <div className="absolute inset-0 bg-gray-600 bg-opacity-75" onClick={toggleSidebar}></div>
          <div className="absolute inset-y-0 left-0 max-w-xs w-full bg-white dark:bg-gray-800 shadow-xl">
            <Sidebar onClose={toggleSidebar} />
          </div>
        </div>

        {/* Sidebar - Desktop */}
        <div className="hidden lg:block lg:flex-shrink-0 w-64 bg-white dark:bg-gray-800 shadow-sm">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;