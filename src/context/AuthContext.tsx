import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { AuthContextValue, MockUser, SignInCredentials, SignUpData } from '@/lib/auth-types';

const STORAGE_KEY = 'esifit-auth';

const DEMO_EMAIL = 'aria@esifit.com';
const DEMO_PASSWORD = 'password123';

function getStoredUser(): MockUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function storeUser(user: MockUser | null): void {
  if (user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function simulateLatency(ms = 800): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(getStoredUser);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const signIn = useCallback(async (credentials: SignInCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      await simulateLatency();
      if (
        credentials.email.toLowerCase() === DEMO_EMAIL &&
        credentials.password === DEMO_PASSWORD
      ) {
        const mockUser: MockUser = {
          id: 'user_01',
          email: DEMO_EMAIL,
          name: 'Aria',
          tier: 'premium',
          createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
        };
        storeUser(mockUser);
        setUser(mockUser);
      } else {
        // For demo, accept any credentials with valid-looking email
        if (!credentials.email.includes('@') || credentials.password.length < 6) {
          throw new Error('Invalid email or password');
        }
        const mockUser: MockUser = {
          id: 'user_' + Date.now(),
          email: credentials.email,
          name: credentials.email.split('@')[0] || 'User',
          tier: 'free',
          createdAt: new Date().toISOString(),
        };
        storeUser(mockUser);
        setUser(mockUser);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Authentication failed';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signUp = useCallback(async (data: SignUpData) => {
    setIsLoading(true);
    setError(null);
    try {
      await simulateLatency();
      if (data.password !== data.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      if (data.password.length < 8) {
        throw new Error('Password must be at least 8 characters');
      }
      const mockUser: MockUser = {
        id: 'user_' + Date.now(),
        email: data.email,
        name: data.name,
        tier: 'free',
        createdAt: new Date().toISOString(),
      };
      storeUser(mockUser);
      setUser(mockUser);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Sign up failed';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signOut = useCallback(() => {
    storeUser(null);
    setUser(null);
    setError(null);
  }, []);

  // Cross-tab sync: listen for storage changes
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        if (e.newValue) {
          try {
            setUser(JSON.parse(e.newValue));
          } catch {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        signIn,
        signUp,
        signOut,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
