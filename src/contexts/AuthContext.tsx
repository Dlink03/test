import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { googleAuthProvider } from '../services/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  refreshTokenSilently: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        
        if (token) {
          // Validate token and get user info
          const userInfo = await googleAuthProvider.getUserInfo(token);
          setUser(userInfo);
        }
      } catch (error) {
        // Token might be invalid, clear it
        localStorage.removeItem('auth_token');
        console.error('Auth token validation failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async () => {
    setIsLoading(true);
    try {
      const { user, token } = await googleAuthProvider.signIn();
      localStorage.setItem('auth_token', token);
      setUser(user);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await googleAuthProvider.signOut();
      localStorage.removeItem('auth_token');
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshTokenSilently = async (): Promise<string | null> => {
    try {
      const newToken = await googleAuthProvider.refreshToken();
      if (newToken) {
        localStorage.setItem('auth_token', newToken);
        return newToken;
      }
      return null;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        refreshTokenSilently,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};