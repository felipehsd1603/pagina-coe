import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { UserRole } from '@portal/shared';
import { mockLogin, mockLogout, getMockSession } from './mockAuth';

interface AuthUser {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  getToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AUTH_MODE = import.meta.env.VITE_AUTH_MODE || 'mock';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (AUTH_MODE === 'mock') {
      const session = getMockSession();
      if (session) setUser(session.user);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    if (AUTH_MODE === 'mock') {
      const mockUser = mockLogin(username, password);
      if (mockUser) {
        setUser(mockUser);
        return true;
      }
      return false;
    }
    // Entra ID flow — handled by MSAL redirect, not username/password
    return false;
  }, []);

  const logout = useCallback(() => {
    if (AUTH_MODE === 'mock') {
      mockLogout();
    }
    setUser(null);
  }, []);

  const getToken = useCallback((): string | null => {
    if (AUTH_MODE === 'mock') {
      return getMockSession()?.token ?? null;
    }
    return null;
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
