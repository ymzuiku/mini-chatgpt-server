import { createClient } from "redis";
import { getEnv } from "./get-env.js";

export const rds = createClient({ url: getEnv("REDIS_URL") });
rds.connect();
