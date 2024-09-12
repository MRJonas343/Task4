"use client"
import {
	Table,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	getKeyValue,
	TableHeader,
} from "@nextui-org/react"
import {
	deleteSelectedUsers,
	lockSelectedUsers,
	unlockSelectedUsers,
} from "@/actions"
import { FC, Key, startTransition, useOptimistic, useState } from "react"
import { columns } from "@/constants/tableColumns"
import Toolbar from "@/components/Toolbar"
import { RegisteredUser, action } from "@/interfaces"

const AdminTable: FC<{ users: RegisteredUser[] }> = ({ users }) => {
	const [selectedIds, setSelectedIds] = useState<Set<Key> | "all">(
		new Set<Key>(),
	)

	const handleSelectionChange = (keys: "all" | Set<Key>) => {
		if (keys !== "all" && keys.size === 0) {
			setSelectedIds(keys)
			return console.log("No keys selected")
		}

		setSelectedIds(keys)
	}

	const [optimisticRow, setOptimisticRow] = useOptimistic(
		users,
		(state, action: action) => {
			switch (action) {
				case "LOCK_USER": {
					return state.map((user) => {
						if (selectedIds === "all" || selectedIds.has(user.id)) {
							return { ...user, status: "Blocked" }
						}
						return user
					})
				}
				case "UNLOCK_USER": {
					return state.map((user) => {
						if (selectedIds === "all" || selectedIds.has(user.id)) {
							return { ...user, status: "Active" }
						}
						return user
					})
				}
				case "DELETE_USER": {
					return state.filter(
						(user) => selectedIds === "all" || !selectedIds.has(user.id),
					)
				}
				case "FAILED": {
					return state
				}
			}
		},
	)

	const handleOptimisticChange = async (action: action) => {
		startTransition(() => {
			setOptimisticRow(action)
		})

		try {
			switch (action) {
				case "LOCK_USER": {
					await lockSelectedUsers(selectedIds)
					break
				}
				case "UNLOCK_USER": {
					await unlockSelectedUsers(selectedIds)
					break
				}
				case "DELETE_USER": {
					await deleteSelectedUsers(selectedIds)
					break
				}
			}
		} catch (error) {
			setOptimisticRow("FAILED")
		}
	}

	return (
		<>
			<Toolbar
				selectedIds={selectedIds}
				lockSelectedUsers={() => handleOptimisticChange("LOCK_USER")}
				unlockSelectedUsers={() => handleOptimisticChange("UNLOCK_USER")}
				deleteSelectedUsers={() => handleOptimisticChange("DELETE_USER")}
			/>
			<Table
				aria-label="Admin Table"
				onSelectionChange={handleSelectionChange}
				radius="sm"
				color="default"
				selectionMode="multiple"
			>
				<TableHeader columns={columns}>
					{(column) => (
						<TableColumn key={column.key}>{column.label}</TableColumn>
					)}
				</TableHeader>
				<TableBody items={optimisticRow} emptyContent={"No rows to display."}>
					{(optimisticRow) => (
						<TableRow key={optimisticRow.id}>
							{(columnKey) => (
								<TableCell>{getKeyValue(optimisticRow, columnKey)}</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</>
	)
}

export default AdminTable
