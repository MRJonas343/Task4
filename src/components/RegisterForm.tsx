"use client"
import { Button, Input } from "@nextui-org/react"
import { CreateUserInput } from "@/interfaces"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { registerUser } from "@/actions"
import { useState } from "react"

const RegisterForm = () => {
	const router = useRouter()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [formError, setFormError] = useState<string | null>(null)
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<CreateUserInput>()

	const onSubmit = async (data: CreateUserInput) => {
		setIsSubmitting(true)
		reset()

		const authStatus = await registerUser(data.name, data.email, data.password)

		if (authStatus === "USER_EXISTS") setFormError("User already exists")

		if (authStatus === "ERROREGISTER") setFormError("Error registering user")

		if (authStatus === "SUCCESS") router.push("/admin-panel")

		setIsSubmitting(false)
	}
	return (
		<form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
			<Input
				placeholder="Name"
				isInvalid={Boolean(errors.name)}
				errorMessage="This field is required"
				{...register("name", {
					required: true,
				})}
			/>
			<Input
				placeholder="Email"
				isInvalid={Boolean(errors.email)}
				errorMessage="This field is required"
				{...register("email", {
					required: true,
				})}
			/>
			<Input
				placeholder="Password"
				isInvalid={Boolean(errors.password)}
				errorMessage="The the password should be at least 1 character long"
				type="password"
				{...register("password", {
					required: true,
					minLength: 1,
				})}
			/>
			<Button isLoading={isSubmitting} type="submit">
				Register
			</Button>
			<p className="text-[#f31260] text-sm text-center">{formError}</p>
		</form>
	)
}
export default RegisterForm
