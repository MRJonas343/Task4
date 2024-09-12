import { Input, Button } from "@nextui-org/react"
import { signIn } from "@/auth"

const page = () => {
	return (
		<main className="grid place-items-center h-screen">
			<section className="flex flex-col w-full gap-4 max-w-[350px]">
				<h1 className={"font-bold text-center mt-4"}>Register</h1>

				<form
					action={async (formData) => {
						"use server"

						const credentials = {
							name: formData.get("name"),
							email: formData.get("email"),
							password: formData.get("password"),
						}

						await signIn("credentials", credentials)
					}}
				>
					<Input name="name" placeholder="Name" />
					<Input name="email" placeholder="Email" />
					<Input name="password" placeholder="Password" type="password" />
					<Button type="submit">Register</Button>
				</form>
			</section>
		</main>
	)
}
export default page
