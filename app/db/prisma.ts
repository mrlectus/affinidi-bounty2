import { PrismaClient } from "@prisma/client";
/**
 * The PrismaClient instance for interacting with the database.
 */

const prisma = new PrismaClient({
  log: ["query", "info", "warn"],
  errorFormat: "pretty",
});

export default prisma;
