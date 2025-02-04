import { createContext } from 'react';
import { User } from '../types';

export interface AuthContextType {
  initialized: boolean;
  user: User | null;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  processingSignUp: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  processingSignIn: boolean;
}

const AuthContext = createContext<AuthContextType>({
  initialized: false,
  user: null,
  signUp: async () => {},
  processingSignUp: false,
  signIn: async () => {},
  processingSignIn: false,
});

export default AuthContext;
