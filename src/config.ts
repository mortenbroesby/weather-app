import developmentConfig from "./config.development";
import productionConfig from "./config.production";

const environment = process.env.NODE_ENV || "production";
const envConfig = environment === "production"
  ? productionConfig
  : developmentConfig;

export interface ConfigInterface {
  api: {
    requestTimeout: number;
  };
  defaultLanguage: string;
  languages: {
    [lang in Langs]: {
      culture: string,
    }
  };

  // Permit untyped data from envConfig
  [key: string]: any;
}

type Langs = "en";

let config: ConfigInterface = {
  api: {
    requestTimeout: 30000
  },
  defaultLanguage: "en",
  languages: {
    "en": {
      "culture": "en-US",
    },
  },

  refreshBlockInSeconds: 5,
};

config = {
  ...config,
  ...envConfig
};

export default config;
