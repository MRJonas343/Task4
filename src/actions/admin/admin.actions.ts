"use server"

import { db } from "@/drizzle/connection"
import { UsersTable } from "@/drizzle/user.schema"
import { fakeUsers } from "@/interfaces/fakeData"

const lockSelectedUsers = () => {}

const unlockSelectedUsers = () => {}

const deleteSelectedUsers = () => {}

const executeSeed = async (): Promise<string> => {
	console.log("Seeding users...")
	try {
		const result = await db.insert(UsersTable).values(fakeUsers)
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
