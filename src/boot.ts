import { db } from "@/core/database"
import { migrate } from "drizzle-orm/bun-sqlite/migrator"
import path from "node:path"

// Migration
const migrationsFolder = path.join(import.meta.dirname, "..", "drizzle")

export async function onStartup() {
  migrate(db, { migrationsFolder })
}

export async function onShutdown() {}
