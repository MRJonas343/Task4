import { db } from "@/drizzle/connection"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import Credentials from "next-auth/providers/credentials"
import NextAuth from "next-auth"
import { signInValidator } from "./actions/validators/authValidator"
import { eq } from "drizzle-orm"
import { UsersTable } from "./drizzle/user.schema"
import { hashPassword } from "./utils/passwordUtils"

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
				console.log("im here")
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
