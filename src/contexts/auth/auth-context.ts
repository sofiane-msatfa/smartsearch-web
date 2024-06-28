// import { User } from "@/api/auth";
import { createContext } from "react";
import type { AuthenticationInput, RegistrationInput } from "@/api/auth";

export interface AuthContextType {
  isAuthenticated: boolean;
  signIn: (payload: AuthenticationInput) => Promise<void>;
  signUp: (payload: RegistrationInput) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
