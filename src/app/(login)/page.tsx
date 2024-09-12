import { Link } from "@nextui-org/react"
import LoginForm from "./ui/LoginForm"

const page = () => {
	return (
		<main className="grid place-items-center h-screen">
			<section className="flex flex-col w-full gap-4 max-w-[350px]">
				<h1 className={"font-bold text-center mt-4"}>Log in</h1>

				<LoginForm />
				<Link className="text-center" href="/register">
					Don't you have an account yet?
				</Link>
			</section>
		</main>
	)
}
export default page
