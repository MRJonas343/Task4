import AdminTable from "./components/AdminTable"
import { db } from "@/drizzle/connection"
import { UsersTable } from "@/drizzle/user.schema"

const page = async () => {
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

	return (
		<main className="grid place-items-center h-screen">
			<section className="flex flex-col w-full gap-4 max-w-[700px]">
				<h1 className={"font-bold text-center mt-4"}>Admin Panel</h1>
				<AdminTable users={users} />
			</section>
		</main>
	)
}
export default page
