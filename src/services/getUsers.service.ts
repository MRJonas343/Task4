import { db } from "@/drizzle/connection"
import { UsersTable } from "@/drizzle/user.schema"

export const getUsers = async () => {
	const users = await db
		.select({
			id: UsersTable.id,
			email: UsersTable.email,
			name: UsersTable.name,
			lastLogin: UsersTable.lastLogin,
			registrationTime: UsersTable.registationTime,
			status: UsersTable.status,
		})
		.from(UsersTable)

	const formatDate = (date: Date) => {
		return date
			? date.toLocaleString("en-US", {
					weekday: "short",
					year: "numeric",
					month: "short",
					day: "2-digit",
					hour: "2-digit",
					minute: "2-digit",
				})
			: null
	}

	const formattedUsers = users.map((user) => ({
		...user,
		lastLogin: user.lastLogin ? formatDate(user.lastLogin) : null,
		registrationTime: user.registrationTime
			? formatDate(user.registrationTime)
			: null,
	}))

	return formattedUsers
}
