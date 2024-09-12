"use server"
import { db, UsersTable } from "@/drizzle"
import { fakeUsers } from "@/seed"
import { hashPassword } from "@/utils"
import { inArray } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { Key } from "react"

const lockSelectedUsers = async (userIds: Set<Key> | "all") => {
	if (userIds === "all") {
		const result = await db.update(UsersTable).set({ status: "Blocked" })
		revalidatePath("/admin-panel")
		return "All users locked"
	}

	const idsArray = Array.from(userIds).map((id) => Number(id))
	const result = await db
		.update(UsersTable)
		.set({ status: "Blocked" })
		.where(inArray(UsersTable.id, idsArray))

	revalidatePath("/admin-panel")
	return "Users locked"
}

const unlockSelectedUsers = async (userIds: Set<Key> | "all") => {
	if (userIds === "all") {
		const result = await db.update(UsersTable).set({ status: "Active" })
		revalidatePath("/admin-panel")
		return "All users unlocked"
	}

	const idsArray = Array.from(userIds).map((id) => Number(id))
	const result = await db
		.update(UsersTable)
		.set({ status: "Active" })
		.where(inArray(UsersTable.id, idsArray))

	revalidatePath("/admin-panel")
	return "Users unlocked"
}

const deleteSelectedUsers = async (userIds: Set<Key> | "all") => {
	if (userIds === "all") {
		const result = await db.delete(UsersTable)
		revalidatePath("/admin-panel")
		return "All users deleted"
	}

	const idsArray = Array.from(userIds).map((id) => Number(id))
	const result = await db
		.delete(UsersTable)
		.where(inArray(UsersTable.id, idsArray))

	revalidatePath("/admin-panel")
	return "Users deleted"
}

const executeSeed = async () => {
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

export {
	lockSelectedUsers,
	unlockSelectedUsers,
	deleteSelectedUsers,
	executeSeed,
}
