import { RegisteredUser, action } from "@/interfaces"
import { Key } from "react"

export const optimisticReducer = (
	state: RegisteredUser[],
	action: action,
	selectedIds: Set<Key> | "all",
): RegisteredUser[] => {
	switch (action) {
		case "LOCK_USER":
			return state.map((user) => {
				if (selectedIds === "all" || selectedIds.has(user.id)) {
					return { ...user, status: "Blocked" }
				}
				return user
			})
		case "UNLOCK_USER":
			return state.map((user) => {
				if (selectedIds === "all" || selectedIds.has(user.id)) {
					return { ...user, status: "Active" }
				}
				return user
			})
		case "DELETE_USER":
			return state.filter(
				(user) => selectedIds !== "all" && !selectedIds.has(user.id),
			)
		case "FAILED":
			return state
	}
}
