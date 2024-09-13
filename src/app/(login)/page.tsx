import LoginForm from "@/components/LoginForm"
import { redirect } from "next/navigation"
import { Link } from "@nextui-org/react"
import { auth } from "@/auth"

const page = async () => {
	const session = await auth()

	if (session) redirect("/admin-panel")

	return (
		<main className="grid place-items-center h-screen">
			<section className="flex flex-col w-full gap-4 max-w-[400px]">
				<h1 className={"font-bold text-3xl text-center"}>
					Welcome to the Task # 4
				</h1>
				<h2 className={"font-bold text-2xl text-center"}>Admin Panel 🚀</h2>
				<h1 className={"font-bold text-2xl text-center mt-4"}>Log in</h1>

				<LoginForm />
				<Link className="flex justify-center" href="/register">
					Don't you have an account yet? Register here
				</Link>
			</section>
		</main>
	)
}
export default page
