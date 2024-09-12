import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"

export const UsersTable = pgTable("users", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull(),
	password: text("password").notNull(),
	registationTime: timestamp("registration_time").notNull().defaultNow(),
	lastLogin: timestamp("last_login"),
	status: text("status"),
})
