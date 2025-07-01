import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { mkdirSync } from "fs";

// Define the database URL
const { DATABASE_URL: databaseUrl } = process.env;

// Create the database directory if it doesn't exist
if (databaseUrl.endsWith(".db") || databaseUrl.endsWith(".sqlite")) {
  const dbDirectory = databaseUrl.substring(0, databaseUrl.lastIndexOf("/"));

  if (dbDirectory) mkdirSync(dbDirectory, { recursive: true });
}

const sqlite = new Database(databaseUrl);
const db = drizzle(sqlite);

migrate(db, { migrationsFolder: "./drizzle" });
