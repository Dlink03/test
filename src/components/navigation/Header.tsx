import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, Settings, User, Moon, Sun, HelpCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const Header = () => {
  const { user, logout } = useAuth();
  const { mode, setMode, isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 py-2 px-4 md:px-6">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-xl">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search emails..."
              className="w-full py-2 pl-10 pr-4 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none text-sm"
            />
            <button type="submit" className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400">
              <Search size={18} />
            </button>
          </form>
        </div>

        <div className="flex items-center space-x-3 ml-4">
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <Bell size={20} className="text-gray-600 dark:text-gray-300" />
          </button>

          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setMode(isDarkMode ? 'light' : 'dark')}>
            {isDarkMode ? (
              <Sun size={20} className="text-gray-600 dark:text-gray-300" />
            ) : (
              <Moon size={20} className="text-gray-600" />
            )}
          </button>

          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <HelpCircle size={20} className="text-gray-600 dark:text-gray-300" />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center focus:outline-none"
            >
              <img
                src={user?.profileImageUrl || 'https://via.placeholder.com/32'}
                alt={user?.name || 'User'}
                className="h-8 w-8 rounded-full object-cover border-2 border-transparent hover:border-blue-500"
              />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                </div>
                <a
                  href="#profile"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                >
                  <User size={16} className="mr-2" />
                  Profile
                </a>
                <a
                  href="#settings"
                  onClick={() => navigate('/settings')}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                >
                  <Settings size={16} className="mr-2" />
                  Settings
                </a>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;