export interface RegisteredUser {
	id: number
	name: string
	email: string
	lastLogin: string | null
	registrationTime: string | null
	status: string | null
}

export interface CreateUserInput {
	name: string
	email: string
	password: string
}

export interface UserCredentials {
	email: string
	password: string
}
