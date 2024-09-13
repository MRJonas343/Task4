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
import { FC, Key, startTransition, useOptimistic, useState } from "react"
import { optimisticReducer } from "@/utils/optimisticReducer"
import { RegisteredUser, action } from "@/interfaces"
import { columns } from "@/constants/tableColumns"
import * as adminAction from "@/actions/admin"
import Toolbar from "@/components/Toolbar"

const actionHandlers = {
	LOCK_USER: adminAction.lockSelectedUsers,
	UNLOCK_USER: adminAction.unlockSelectedUsers,
	DELETE_USER: adminAction.deleteSelectedUsers,
}

const AdminTable: FC<{ users: RegisteredUser[] }> = ({ users }) => {
	const [selectedIds, setSelectedIds] = useState<Set<Key> | "all">(
		new Set<Key>(),
	)

	const handleSelectionChange = (keys: "all" | Set<Key>) => {
		setSelectedIds(keys === "all" || keys.size > 0 ? keys : new Set())
	}

	const [optimisticRow, setOptimisticRow] = useOptimistic(
		users,
		(state, action: action) => optimisticReducer(state, action, selectedIds),
	)

	const handleOptimisticChange = async (action: action) => {
		if (action === "FAILED") return setOptimisticRow("FAILED")

		startTransition(() => setOptimisticRow(action))

		try {
			const handler = actionHandlers[action]
			if (handler) await handler(selectedIds)
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
