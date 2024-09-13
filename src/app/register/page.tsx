import RegisterForm from "@/components/RegisterForm"
import ForceLogOut from "@/components/ForceLogOut"
import { redirect } from "next/navigation"
import { Link } from "@nextui-org/react"
import { getUsers } from "@/services"
import { auth } from "@/auth"

const page = async () => {
	const session = await auth()

	let shouldForceLogOut = false

	if (session) {
		const users = await getUsers()
		const user = users.find((user) => user.email === session.user?.email)

		if (!user || user.status === "Blocked") {
			shouldForceLogOut = true
			return
		}
		redirect("/admin-panel")
	}

	return (
		<>
			<ForceLogOut shouldLogOut={shouldForceLogOut} />
			<main className="grid place-items-center h-screen">
				<section className="flex flex-col w-full max-w-[400px] gap-4">
					<h1 className={"font-bold text-3xl text-center mt-4"}>Register</h1>
					<h2 className={"font-bold text-lg text-center "}>
						Don't worry, your password is secure with me 😇
					</h2>
					<RegisterForm />
					<Link className="flex justify-center" href="/">
						Already have an account? Log in here
					</Link>
				</section>
			</main>
		</>
	)
}
export default page
