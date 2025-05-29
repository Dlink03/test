import { User } from '../types';

// This is a mock implementation of Google OAuth authentication
// In a real app, this would use the Google OAuth API

class GoogleAuthProvider {
  private static instance: GoogleAuthProvider;

  private constructor() {
    // Initialize
  }

  public static getInstance(): GoogleAuthProvider {
    if (!GoogleAuthProvider.instance) {
      GoogleAuthProvider.instance = new GoogleAuthProvider();
    }
    return GoogleAuthProvider.instance;
  }

  async signIn(): Promise<{ user: User, token: string }> {
    // In a real app, this would open a popup for Google OAuth
    // For the mock, we'll simulate a successful login after a delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const user: User = {
      id: 'user123',
      name: 'John Doe',
      email: 'john.doe@example.com',
      profileImageUrl: 'https://randomuser.me/api/portraits/men/42.jpg'
    };
    
    const token = 'mock-auth-token-' + Math.random().toString(36).substring(2);
    
    return { user, token };
  }

  async signOut(): Promise<void> {
    // In a real app, this would clear OAuth tokens and notify Google
    await new Promise(resolve => setTimeout(resolve, 500));
    return;
  }

  async getUserInfo(token: string): Promise<User> {
    // In a real app, this would validate the token and fetch user info
    // For the mock, we'll simulate a successful validation after a delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Validate token format (very basic check)
    if (!token || !token.startsWith('mock-auth-token-')) {
      throw new Error('Invalid token');
    }
    
    const user: User = {
      id: 'user123',
      name: 'John Doe',
      email: 'john.doe@example.com',
      profileImageUrl: 'https://randomuser.me/api/portraits/men/42.jpg'
    };
    
    return user;
  }

  async refreshToken(): Promise<string> {
    // In a real app, this would request a new access token using a refresh token
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newToken = 'mock-auth-token-' + Math.random().toString(36).substring(2);
    
    return newToken;
  }
}

export const googleAuthProvider = GoogleAuthProvider.getInstance();