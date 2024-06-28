const VITE_MODE = import.meta.env.VITE_MODE as string | undefined;

export const ACCESS_TOKEN_KEY = VITE_MODE
  ? `${VITE_MODE}_smartsearch_access_token`
  : "smartsearch_access_token";

export const REFRESH_TOKEN_KEY = VITE_MODE
  ? `${VITE_MODE}_smartsearch_refresh_token`
  : "smartsearch_refresh_token";
