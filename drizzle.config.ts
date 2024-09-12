import "./envConfig"
import { defineConfig } from "drizzle-kit"

export default defineConfig({
	schema: "./src/drizzle/user.schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.POSTGRES_URL!,
	},
})
