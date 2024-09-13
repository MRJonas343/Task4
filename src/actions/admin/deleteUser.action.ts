"use server"
import { db, UsersTable } from "@/drizzle"
import { inArray } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { Key } from "react"

export const deleteSelectedUsers = async (userIds: Set<Key> | "all") => {
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
