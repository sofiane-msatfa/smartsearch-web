import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext, type AuthContextType } from "./auth-context";
import { setClientAccessToken } from "@/api/client";
import { useLocalStorage } from "react-use";
import { User } from "@/api/auth";
import {
  authenticate,
  getCurrentUser,
  register,
  type AuthenticationInput,
  type RegistrationInput,
} from "@/api/auth";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken, removeAccessToken] = useLocalStorage(
    ACCESS_TOKEN_KEY,
    ""
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_refreshToken, setRefreshToken, removeRefreshToken] = useLocalStorage(
    REFRESH_TOKEN_KEY,
    ""
  );

  const isAuthenticated = !!accessToken;

  const initAuth = useCallback(async () => {
    if (isAuthenticated) {
      setClientAccessToken(accessToken);
      const user = await getCurrentUser();
      setUser(user);
    }
  }, [isAuthenticated, accessToken]);

  useEffect(() => {
    if (isAuthenticated) {
      initAuth();
    }
  }, [isAuthenticated, initAuth]);

  const signUp = useCallback(async (input: RegistrationInput) => {
    const user = await register(input);
    setUser(user);
  }, []);

  const signIn = useCallback(
    async (input: AuthenticationInput) => {
      const token = await authenticate(input);

      setAccessToken(token.access);
      setRefreshToken(token.refresh); // TODO: @SOFIANE passer en cookie secure
    },
    [setAccessToken, setRefreshToken]
  );

  const signOut = useCallback(async () => {
    removeAccessToken();
    removeRefreshToken();
  }, [removeAccessToken, removeRefreshToken]);

  const value: AuthContextType = useMemo(
    () => ({
      isAuthenticated,
      user,
      signUp,
      signIn,
      signOut,
    }),
    [isAuthenticated, user, signUp, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
