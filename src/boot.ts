import { db } from "@/core/database"
import { migrate } from "drizzle-orm/bun-sqlite/migrator"
import path from "node:path"

// Migration
const migrationsFolder = path.join(import.meta.dirname, "..", "drizzle")

export async function onStartup() {
  console.log("Boot integration started up!")
  migrate(db, { migrationsFolder })
}

export async function onShutdown() {
  console.log("Boot integration shut down!")
}
