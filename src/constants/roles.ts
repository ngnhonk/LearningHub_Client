export const ROLES = {
  STUDENT: 'student',
  ADMIN: 'admin',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];
