import { drizzle } from "drizzle-orm/vercel-postgres"
import { sql } from "@vercel/postgres"
import { schemas } from "./schemas"

export const db = drizzle(sql, {
	schema: schemas,
})
