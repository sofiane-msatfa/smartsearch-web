import { z } from "zod";
import { api } from "./client";
import { config } from "@/config";

// export interface User {
//   id: number;
//   username: string;
//   email: string;
// }

export interface AccessTokenResponse {
  tokenType: "Bearer";
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}

/* ---------------------------------- login --------------------------------- */

export const authenticationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type AuthenticationInput = z.infer<typeof authenticationSchema>;

export const authenticate = async (
  data: AuthenticationInput
): Promise<AccessTokenResponse> => {
  const response = await api.post(config.loginUrl, { 
    ...data,
    // TODO: implémenter route propre niveau backend
    twoFactorCode: "000000",
    twoFactorRecoveryCode: "000000"
  });
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

export const register = async (data: RegistrationInput): Promise<void> => {
  const response = await api.post(config.registerUrl, data);
  return response.data;
};

// export const getCurrentUser = async (): Promise<User> => {
//   const response = await api.get("/auth/users/me/");
//   return response.data;
// };
