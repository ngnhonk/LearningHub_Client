import type { User } from '../../types/models';

export interface LoginPayload {
  identify: string;
  password: string;
}

export interface RegisterPayload {
  full_name: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
}

export interface RegisterResponse {
  user: Pick<User, 'id' | 'username' | 'email' | 'role'>;
}
