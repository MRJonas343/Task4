"use client"
import { Button, Input } from "@nextui-org/react"
import { authenticate } from "@/actions"
import { useForm } from "react-hook-form"
import { UserCredentials } from "@/interfaces"
import { useState } from "react"
import { useRouter } from "next/navigation"

const LoginForm = () => {
	const router = useRouter()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [formError, setFormError] = useState<string | null>(null)
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<UserCredentials>()

	const onSubmit = async (data: UserCredentials) => {
		setIsSubmitting(true)
		reset()
		const authStatus = await authenticate(data.email, data.password)
		if (authStatus === "ERRORLOGIN") setFormError("Invalid email or password")

		if (authStatus === "CREDENTIALSERROR") setFormError("server error")

		if (authStatus === "SUCCESS") router.push("/admin-panel")

		setIsSubmitting(false)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			<Input
				isInvalid={Boolean(errors.email)}
				errorMessage="This field is required"
				autoFocus
				placeholder="Email"
				{...register("email", {
					required: true,
				})}
			/>
			<Input
				isInvalid={Boolean(errors.password)}
				errorMessage="The the password should be at least 1 character long"
				type="password"
				placeholder="Password"
				{...register("password", {
					required: true,
					minLength: 1,
				})}
			/>

			<Button isLoading={isSubmitting} type="submit">
				Log in
			</Button>
			<p className="text-[#f31260] text-sm text-center">{formError}</p>
		</form>
	)
}
export default LoginForm
