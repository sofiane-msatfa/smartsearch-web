import axios, { type AxiosError } from "axios";
import type { AccessTokenResponse } from "./auth";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants";
import { config } from "@/config";

export const api = axios.create({
  baseURL: config.apiUrl,
});

export function setClientAccessToken(accessToken: string) {
  api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
}

async function refreshAccessToken(failedRequest: AxiosError) {
  try {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    const response = await api.post<AccessTokenResponse>(config.refreshTokenUrl, {
      refresh: refreshToken && JSON.parse(refreshToken),
    });
    const { accessToken } = response.data;

    if (failedRequest.response) {
      failedRequest.response.config.headers.Authorization = `Bearer ${accessToken}`;
    }

    localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(accessToken));
    setClientAccessToken(accessToken);
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
}

createAuthRefreshInterceptor(api, refreshAccessToken);
