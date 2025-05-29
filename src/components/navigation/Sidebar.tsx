import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Inbox, 
  Send, 
  File, 
  Archive, 
  Trash, 
  Settings, 
  BarChart3, 
  Tags, 
  Clock, 
  Edit3, 
  Mail, 
  Plus 
} from 'lucide-react';

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const { user } = useAuth();

  const navLinkClass = ({ isActive }: { isActive: boolean }) => 
    `flex items-center space-x-3 py-2 px-4 rounded-lg transition-colors duration-200 ${
      isActive 
        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 font-medium' 
        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
    }`;

  return (
    <div className="h-full flex flex-col py-4">
      <div className="px-4 mb-8 flex items-center">
        <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        <span className="ml-2 font-bold text-xl">EmailAI</span>
      </div>

      <div className="px-4 mb-6">
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center transition-colors duration-200"
        >
          <Plus size={18} className="mr-2" />
          Compose
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 space-y-1">
        <NavLink to="/" end className={navLinkClass} onClick={onClose}>
          <BarChart3 size={20} />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink to="/inbox" className={navLinkClass} onClick={onClose}>
          <Inbox size={20} />
          <span>Inbox</span>
        </NavLink>
        
        <NavLink to="/sent" className={navLinkClass} onClick={onClose}>
          <Send size={20} />
          <span>Sent</span>
        </NavLink>

        <NavLink to="/templates" className={navLinkClass} onClick={onClose}>
          <Edit3 size={20} />
          <span>Templates</span>
        </NavLink>
        
        <NavLink to="/drafts" className={navLinkClass} onClick={onClose}>
          <File size={20} />
          <span>Drafts</span>
        </NavLink>

        <NavLink to="/scheduled" className={navLinkClass} onClick={onClose}>
          <Clock size={20} />
          <span>Scheduled</span>
        </NavLink>

        <NavLink to="/labels" className={navLinkClass} onClick={onClose}>
          <Tags size={20} />
          <span>Labels</span>
        </NavLink>
        
        <NavLink to="/archive" className={navLinkClass} onClick={onClose}>
          <Archive size={20} />
          <span>Archive</span>
        </NavLink>
        
        <NavLink to="/trash" className={navLinkClass} onClick={onClose}>
          <Trash size={20} />
          <span>Trash</span>
        </NavLink>

        <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
          <NavLink to="/analytics" className={navLinkClass} onClick={onClose}>
            <BarChart3 size={20} />
            <span>Analytics</span>
          </NavLink>
          
          <NavLink to="/settings" className={navLinkClass} onClick={onClose}>
            <Settings size={20} />
            <span>Settings</span>
          </NavLink>
        </div>
      </nav>

      {user && (
        <div className="mt-auto px-4 py-2 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <img
              src={user.profileImageUrl || 'https://via.placeholder.com/32'}
              alt={user.name || 'User'}
              className="h-8 w-8 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;