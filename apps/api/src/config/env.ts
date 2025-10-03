import { config } from "dotenv";

config();

const fallback = {
  PORT: "4000",
  API_CORS_ORIGIN: "http://localhost:5173",
  NODE_ENV: "development"
} as const;

const read = (key: keyof typeof fallback): string => process.env[key] ?? fallback[key];

export const env = {
  nodeEnv: read("NODE_ENV"),
  port: Number(read("PORT")),
  corsOrigin: read("API_CORS_ORIGIN")
};
