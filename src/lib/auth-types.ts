export interface MockUser {
  id: string;
  email: string;
  name: string;
  tier: 'free' | 'premium' | 'vip_plus';
  avatar?: string;
  createdAt: string;
}

export interface AuthState {
  user: MockUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface SignInCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthContextValue extends AuthState {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  signOut: () => void;
  clearError: () => void;
}

// Mock user for demo purposes
export const MOCK_USER: MockUser = {
  id: 'user_01',
  email: 'aria@esifit.com',
  name: 'Aria',
  tier: 'premium',
  createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
};
