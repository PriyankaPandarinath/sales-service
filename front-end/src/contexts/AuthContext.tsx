import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { authAPI } from '@/lib/api';

/**
 * User shape based on CURRENT backend response.
 * You can expand this later when backend returns full profile.
 */
export interface User {
  id: number;
  email: string;
  role: string;
  name?: string;
  employeeId?: string;
  department?: string;
  designation?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Restore session on refresh
   */
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (token && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  /**
   * LOGIN (FastAPI)
   */
  const login = async (email: string, password: string) => {
    const response = await authAPI.login(email, password);

    /**
     * Backend response:
     * {
     *   access_token: string,
     *   token_type: "bearer",
     *   user: { id, email, role }
     * }
     */
    const { access_token, user } = response.data;

    // Store JWT
    localStorage.setItem('token', access_token);

    // const normalizeRole = (role: string) => role.toLowerCase();


    // Normalize user (temporary defaults for UI)
    const normalizedUser: User = {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.email, // temporary
      employeeId: '',
      department: '',
      designation: '',
    };

    localStorage.setItem('user', JSON.stringify(normalizedUser));
    setUser(normalizedUser);
  };

  /**
   * LOGOUT
   */
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  /**
   * UPDATE USER (profile edits)
   */
  const updateUser = (userData: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
