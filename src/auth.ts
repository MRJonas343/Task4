import { signInValidator } from "./validators/credentials.validator"
import Credentials from "next-auth/providers/credentials"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db, UsersTable } from "./drizzle"
import { eq } from "drizzle-orm"
import NextAuth from "next-auth"

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: DrizzleAdapter(db),
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

				if (!parseCredentials.success) {
					return parseCredentials.error
				}
				const { email, password } = parseCredentials.data

				const user = await db.query.UsersTable.findFirst({
					where: eq(UsersTable.email, email),
				})

				//*inser user
				const result = await db.insert(UsersTable).values({
					email,
					password,
					name: "test",
					status: "Active",
					lastLogin: new Date(),
				})

				console.log(result)

				// const user = await db.query.UsersTable.findFirst({
				// 	where: eq(UsersTable.email, email),
				// })

				// if (user) {
				// 	return null
				// }

				return null
			},
		}),
	],
})
