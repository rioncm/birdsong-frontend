export interface FrontendConfig {
  apiBaseUrl: string;
}

const defaultConfig: FrontendConfig = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000"
};

export const config = Object.freeze(defaultConfig);
