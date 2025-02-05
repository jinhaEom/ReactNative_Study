import { createContext } from 'react';
import { User } from '../types';

export interface AuthContextType {
  initialized: boolean;
  user: User | null;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  processingSignUp: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  processingSignIn: boolean;
  updateProfileImage : (filepath : string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  initialized: false,
  user: null,
  signUp: async () => {},
  processingSignUp: false,
  signIn: async () => {},
  processingSignIn: false,
  updateProfileImage : async () => {},
});

export default AuthContext;
