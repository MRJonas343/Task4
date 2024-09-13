"use server"

import { signIn } from "@/auth"
import { db, UsersTable } from "@/drizzle"
import { hashPassword } from "@/utils"
import { eq } from "drizzle-orm"

export const registerUser = async (
	name: string,
	email: string,
	password: string,
) => {
	try {
		const userExists = await db.query.UsersTable.findFirst({
			where: eq(UsersTable.email, email),
		})

		if (userExists) return "USER_EXISTS"
		const hashedPassword = await hashPassword(password)

		const user = await db.insert(UsersTable).values({
			name,
			email,
			password: hashedPassword,
			registationTime: new Date(),
			status: "Active",
			lastLogin: new Date(),
		})
		await signIn("credentials", {
			email,
			password,
			redirect: false,
		})
		return "SUCCESS"
	} catch (error) {
		return "ERROREGISTER"
	}
}
