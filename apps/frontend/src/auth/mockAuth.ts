import type { UserRole } from '@portal/shared';
import { CLIENT_EMAIL_DOMAIN } from '@/config/client';

interface MockUser {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
}

const MOCK_USERS: Record<string, { password: string; user: MockUser }> = {
  admin: {
    password: 'admin',
    user: {
      id: 'mock-admin-001',
      email: `admin@${CLIENT_EMAIL_DOMAIN}`,
      displayName: 'Admin CoE',
      role: 'ADMIN',
    },
  },
  editor: {
    password: 'editor',
    user: {
      id: 'mock-editor-001',
      email: `editor@${CLIENT_EMAIL_DOMAIN}`,
      displayName: 'Editor CoE',
      role: 'EDITOR',
    },
  },
  viewer: {
    password: 'viewer',
    user: {
      id: 'mock-viewer-001',
      email: `viewer@${CLIENT_EMAIL_DOMAIN}`,
      displayName: 'Viewer CoE',
      role: 'VIEWER',
    },
  },
};

const STORAGE_KEY = 'portal_mock_auth';

export function mockLogin(username: string, password: string): MockUser | null {
  const entry = MOCK_USERS[username];
  if (entry && entry.password === password) {
    const token = btoa(JSON.stringify({ iss: 'mock-entra-id', sub: entry.user.id, ...entry.user }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, user: entry.user }));
    return entry.user;
  }
  return null;
}

export function mockLogout(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function getMockSession(): { token: string; user: MockUser } | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function getMockToken(): string | null {
  return getMockSession()?.token ?? null;
}
