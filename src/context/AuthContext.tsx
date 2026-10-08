import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => { success: boolean; error?: string };
  signUp: (name: string, email: string, password: string) => { success: boolean; error?: string };
  signOut: () => void;
  allUsers: User[];
}

const STORAGE_KEY_USER = 'exampro_current_user';
const STORAGE_KEY_ALL_USERS = 'exampro_registered_users';

const DEFAULT_USERS: User[] = [
  {
    id: 'user-demo-1',
    name: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    password: 'password123',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_USER);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [allUsers, setAllUsers] = useState<User[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_ALL_USERS);
      if (stored) {
        return JSON.parse(stored);
      }
      localStorage.setItem(STORAGE_KEY_ALL_USERS, JSON.stringify(DEFAULT_USERS));
      return DEFAULT_USERS;
    } catch {
      return DEFAULT_USERS;
    }
  });

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_KEY_USER);
      }
    } catch (err) {
      console.error('Error persisting current user', err);
    }
  }, [currentUser]);

  const signUp = (name: string, email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    if (!cleanName) {
      return { success: false, error: 'Full name is required.' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return { success: false, error: 'Please provide a valid email address.' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }

    // Check duplicate
    const exists = allUsers.some(u => u.email.toLowerCase() === cleanEmail);
    if (exists) {
      return { success: false, error: 'An account with this email address already exists. Please sign in instead.' };
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      password: password,
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [...allUsers, newUser];
    setAllUsers(updatedUsers);
    try {
      localStorage.setItem(STORAGE_KEY_ALL_USERS, JSON.stringify(updatedUsers));
    } catch (e) {
      console.error('Failed to store users', e);
    }

    return { success: true };
  };

  const signIn = (email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      return { success: false, error: 'Email and password are required.' };
    }

    const matchedUser = allUsers.find(
      u => u.email.toLowerCase() === cleanEmail && u.password === cleanPassword
    );

    if (!matchedUser) {
      return {
        success: false,
        error: 'Invalid credentials. Please verify your email and password.'
      };
    }

    // Clone user without password in session object for safety
    const sessionUser: User = {
      id: matchedUser.id,
      name: matchedUser.name,
      email: matchedUser.email,
      createdAt: matchedUser.createdAt
    };

    setCurrentUser(sessionUser);
    return { success: true };
  };

  const signOut = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY_USER);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        signIn,
        signUp,
        signOut,
        allUsers
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
