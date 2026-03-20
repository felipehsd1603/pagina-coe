export type UserRole = 'VIEWER' | 'EDITOR' | 'ADMIN';

export interface IUser {
  id: string;
  entraId: string;
  email: string;
  displayName: string;
  role: UserRole;
}
