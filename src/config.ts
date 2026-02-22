export interface FrontendConfig {
  apiBaseUrl: string;
}

const defaultConfig: FrontendConfig = {
  apiBaseUrl: "https://api.birdsong.diy"
};

export const config = Object.freeze(defaultConfig);
