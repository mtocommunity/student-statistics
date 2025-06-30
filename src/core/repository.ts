import { databaseUrl } from "@/config";
import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";

// Database client
const sqlite = new Database(databaseUrl);

export const db = drizzle({
  client: sqlite,
});
