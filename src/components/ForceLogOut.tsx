"use client"
import { logOut } from "@/actions/auth/logOut.action"
import { useRouter } from "next/navigation"
import { FC } from "react"

interface ForceLogOutProps {
	shouldLogOut: boolean
}

const ForceLogOut: FC<ForceLogOutProps> = ({ shouldLogOut }) => {
	const router = useRouter()

	const shouldForceLogOut = async () => {
		if (shouldLogOut) {
			await logOut()
			router.refresh()
		}
	}

	shouldForceLogOut()

	return <></>
}
export default ForceLogOut
