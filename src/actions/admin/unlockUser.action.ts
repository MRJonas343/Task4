"use server"
import { db, UsersTable } from "@/drizzle"
import { inArray } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { Key } from "react"

export const unlockSelectedUsers = async (userIds: Set<Key> | "all") => {
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
