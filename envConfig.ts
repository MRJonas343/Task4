import { loadEnvConfig } from "@next/env"

const projectDir = process.cwd()
loadEnvConfig(projectDir)

const config = {
	POSTGRES_URL: process.env.POSTGRES_URL!,
	AUTH_SECRET: process.env.AUTH_SECRET!,
}

export default config
