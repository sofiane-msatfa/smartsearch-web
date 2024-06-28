import { z } from "zod";
import { api } from "./client";

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface AccessTokenResponse {
  access: string;
  refresh: string;
}

/* ---------------------------------- login --------------------------------- */

export const authenticationSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(8),
});

export type AuthenticationInput = z.infer<typeof authenticationSchema>;

export const authenticate = async (
  data: AuthenticationInput
): Promise<AccessTokenResponse> => {
  const response = await api.post("/auth/jwt/create/", data);
  return response.data;
};

/* -------------------------------- register -------------------------------- */

export const registrationSchema = authenticationSchema
  .extend({
    re_password: z.string().min(8),
  })
  .refine((data) => data.password === data.re_password, {
    message: "Les mots de passe ne correspondent pas",
    path: ["re_password"],
  });

export type RegistrationInput = z.infer<typeof registrationSchema>;

export const register = async (data: RegistrationInput): Promise<User> => {
  const response = await api.post("/auth/users/", data);
  return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get("/auth/users/me/");
  return response.data;
};
