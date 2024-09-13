import { auth } from "@/auth"
import AdminTable from "@/components/AdminTable"
import { getUsers } from "@/services"
import { redirect } from "next/navigation"
import { LogOutButton } from "@/components/LogOutButton"
import ForceLogOut from "@/components/ForceLogOut"

const page = async () => {
	const session = await auth()

	if (!session) redirect("/")

	let shouldForceLogOut = false

	const users = await getUsers()

	const user = users.find((user) => user.email === session.user?.email)

	if (!user || user.status === "Blocked") {
		shouldForceLogOut = true
	}

	return (
		<>
			<ForceLogOut shouldLogOut={shouldForceLogOut} />
			<main className="grid place-items-center h-screen">
				<section className="flex flex-col w-full gap-4 max-w-[900px]">
					<div className="w-full text-lg gap-4 pr-5  flex justify-end">
						<div>Hello {session.user?.name}</div>
						<div> | </div>
						<LogOutButton />
					</div>
					<h1 className={"font-bold text-2xl text-center mt-4"}>
						Admin Panel 🖥️
					</h1>
					<AdminTable users={users} />
				</section>
			</main>
		</>
	)
}
export default page
