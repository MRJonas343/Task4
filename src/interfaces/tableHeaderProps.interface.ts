import { Key } from "react"

export interface TableHeaderProps {
	lockSelectedUsers: (userIds: Set<Key> | "all") => void
	unlockSelectedUsers: (userIds: Set<Key> | "all") => void
	deleteSelectedUsers: (userIds: Set<Key> | "all") => void
	selectedIds: Set<Key> | "all"
}
