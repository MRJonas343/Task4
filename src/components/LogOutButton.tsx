"use client"

import { logOut } from "@/actions/auth/logOut.action"

export const LogOutButton = () => {
	return (
		<div onClick={() => logOut()} className="text-blue-600 cursor-pointer">
			Log Out
		</div>
	)
}
