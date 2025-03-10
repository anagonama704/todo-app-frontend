export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  displayName?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
