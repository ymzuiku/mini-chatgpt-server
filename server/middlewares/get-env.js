import { config } from "dotenv";

config();

export function getEnv(key) {
  return process.env[key];
}
