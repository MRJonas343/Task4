"use server"

export async function register(formData: FormData) {
	const credentials = {
		name: formData.get("name"),
		email: formData.get("email"),
		password: formData.get("password"),
	}

	try {
		await fetch("/api/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(credentials),
		})
	} catch (error) {
		return "Could not register"
	}
}
