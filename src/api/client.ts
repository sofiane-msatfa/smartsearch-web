import axios, { type AxiosError } from "axios";
import type { AccessTokenResponse } from "./auth";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants";

export const api = axios.create({
  baseURL: "http://localhost:8000",
});

export function setClientAccessToken(accessToken: string) {
  api.defaults.headers.common.Authorization = `JWT ${accessToken}`;
}

async function refreshAccessToken(failedRequest: AxiosError) {
  try {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    const response = await api.post<AccessTokenResponse>("/auth/jwt/refresh/", {
      refresh: refreshToken && JSON.parse(refreshToken),
    });
    const { access } = response.data;

    if (failedRequest.response) {
      failedRequest.response.config.headers.Authorization = `JWT ${access}`;
    }

    localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(access));
    setClientAccessToken(access);
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
}

createAuthRefreshInterceptor(api, refreshAccessToken);
