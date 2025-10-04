import { config } from "dotenv";

config();

const fallback = {
  PORT: "4000",
  API_CORS_ORIGIN: "http://localhost:5173",
  NODE_ENV: "development"
} as const;

const read = (key: keyof typeof fallback): string => process.env[key] ?? fallback[key];

const readRequired = (key: "CLERK_SECRET_KEY" | "CLERK_PUBLISHABLE_KEY"): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

export const env = {
  nodeEnv: read("NODE_ENV"),
  port: Number(read("PORT")),
  corsOrigin: read("API_CORS_ORIGIN"),
  clerkSecretKey: readRequired("CLERK_SECRET_KEY"),
  clerkPublishableKey: readRequired("CLERK_PUBLISHABLE_KEY")
};
