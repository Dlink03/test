// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  profileImageUrl?: string;
}

// Email related types
export interface EmailSender {
  name: string;
  email: string;
  avatar: string;
  verified?: boolean;
}

export interface EmailLabel {
  name: string;
  color: 'red' | 'green' | 'blue' | 'yellow' | 'purple' | 'gray';
}

export interface EmailAttachment {
  name: string;
  size: string;
  type: string;
  thumbnail?: string;
}

export interface EmailEntity {
  type: string;
  value: string;
}

export interface EmailAIAnalysis {
  intent: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  priority: 'High' | 'Medium' | 'Low';
  entities?: EmailEntity[];
}

export interface Email {
  id: string;
  subject: string;
  sender: EmailSender;
  preview: string;
  body: string;
  date: string;
  time: string;
  unread: boolean;
  starred: boolean;
  labels?: EmailLabel[];
  attachments?: EmailAttachment[];
  aiAnalysis?: EmailAIAnalysis;
  cc?: EmailSender[];
  bcc?: EmailSender[];
}

// API response types
export interface APIResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// AI Template types
export interface AITemplate {
  id: string;
  name: string;
  template: string;
  variables: string[];
  category: string;
  created: string;
  modified: string;
}

// Settings types
export interface EmailSignature {
  id: string;
  name: string;
  content: string;
  isDefault: boolean;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  defaultResponseTemplate: string;
  emailsPerPage: number;
  notificationsEnabled: boolean;
  autoAnalyzeEmails: boolean;
}

export interface ApiIntegration {
  id: string;
  name: string;
  endpoint: string;
  authType: 'none' | 'apiKey' | 'oauth2' | 'basic';
  apiKey?: string;
  username?: string;
  password?: string;
  enabled: boolean;
}