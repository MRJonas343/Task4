"use client"

import { Button, Input } from "@nextui-org/react"
import { useFormState } from "react-dom"
import { authenticate } from "@/actions"

const LoginForm = () => {
	const [state, dispatch] = useFormState(authenticate, undefined)
	console.log(state)
	return (
		<form action={dispatch}>
			<Input name="email" placeholder="Email" />
			<Input name="password" type="password" placeholder="Password" />

			<Button type="submit">Log in</Button>
		</form>
	)
}
export default LoginForm
