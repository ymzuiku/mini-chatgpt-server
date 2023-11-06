import { getEnv } from "../middlewares/get-env";

export const IS_DEV = getEnv("DEV") == 1;
