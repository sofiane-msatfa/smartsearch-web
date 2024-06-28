import { z } from "zod";
import { api } from "./client";
import { config } from "@/config";
import { AxiosResponse } from "axios";

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

export enum RegistrationErrorType {
  PasswordRequiresDigit = "PasswordRequiresDigit",
  PasswordRequiresNonAlphanumeric = "PasswordRequiresNonAlphanumeric",
  PasswordRequiresUpper = "PasswordRequiresUpper",
  DuplicateUserName = "DuplicateUserName",
}

export interface RegistrationError {
  status: number;
  title: string;
  errors: Partial<Record<RegistrationErrorType, string[]>>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isRegistrationError(
  response: AxiosResponse
): response is AxiosResponse<RegistrationError> {
  return (
    response?.data.status === 400 &&
    response.data.title === "One or more validation errors occurred." &&
    response.data.errors !== undefined
  );
}

export function formatRegistrationError(error: RegistrationError): string {
  console.log(error);
  if (error.errors.DuplicateUserName) {
    return "Nom d'utilisateur déjà utilisé";
  }

  const messages = Object.values(error.errors).flat();
  return messages.join(", ");
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
    twoFactorRecoveryCode: "000000",
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
