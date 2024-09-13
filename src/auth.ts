import { signInValidator } from "./validators/credentials.validator"
import Credentials from "next-auth/providers/credentials"
import { db, UsersTable } from "./drizzle"
import { eq } from "drizzle-orm"
import NextAuth from "next-auth"
import { comparePassword } from "./utils"

export const { handlers, signIn, signOut, auth } = NextAuth({
	pages: {
		signIn: "/",
	},
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				const parseCredentials = signInValidator.safeParse(credentials)

				if (!parseCredentials.success) return null

				const { email, password } = parseCredentials.data

				const user = await db.query.UsersTable.findFirst({
					where: eq(UsersTable.email, email),
				})

				if (!user) return null

				if (user.status === "Blocked") return null

				const isPasswordValid = await comparePassword(password, user.password)

				if (!isPasswordValid) return null

				await db
					.update(UsersTable)
					.set({
						lastLogin: new Date(),
					})
					.where(eq(UsersTable.email, email))

				//*return the necessary user data
				const userWithoutPassword = {
					id: user.id.toString(),
					name: user.name,
					email: user.email,
				}
				return userWithoutPassword
			},
		}),
	],
})
