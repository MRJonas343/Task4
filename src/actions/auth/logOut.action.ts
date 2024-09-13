"use server"

import { signOut } from "@/auth"
import { redirect } from "next/navigation"

export const logOut = async () => {
	await signOut()
	redirect("/")
}
