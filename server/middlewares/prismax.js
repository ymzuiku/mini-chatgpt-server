import { PrismaClient } from "prisma/prisma-client";
import { getEnv } from "./get-env";

export const prismax = new PrismaClient({
  datasourceUrl: getEnv("DATABASE_URL"),
});
