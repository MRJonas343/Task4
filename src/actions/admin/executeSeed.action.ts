"use server"
import { db, UsersTable } from "@/drizzle"
import { fakeUsers } from "@/seed"
import { hashPassword } from "@/utils"
import { revalidatePath } from "next/cache"

export const executeSeed = async () => {
	try {
		for (const user of fakeUsers) {
			user.password = await hashPassword(user.password)
		}

		const existingEmails = await db
			.select({
				email: UsersTable.email,
			})
			.from(UsersTable)

		const filteredUsers = fakeUsers.filter(
			(user) =>
				!existingEmails.some((existing) => existing.email === user.email),
		)

		const result = await db.insert(UsersTable).values(filteredUsers)
		revalidatePath("/admin-panel")
		return "Seeding complete"
	} catch (error) {
		return "Error seeding users"
	}
}
