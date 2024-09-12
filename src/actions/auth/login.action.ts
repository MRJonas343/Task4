"use server"

import { signIn } from "@/auth"

export async function authenticate(
	prevState: string | undefined,
	formData: FormData,
) {
	try {
		console.log(Object.fromEntries(formData))
		await signIn("credentials", Object.fromEntries(formData))
	} catch (error) {
		return "Could not log in"
	}
}
