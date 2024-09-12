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

import { FC, Key, useState } from "react"
import { RegisteredUser } from "@/interfaces/registeredUser"
import { columns } from "../constants/tableColumns"
import Toolbar from "./Toolbar"

const AdminTable: FC<{ users: RegisteredUser[] }> = ({ users }) => {
	const [rows, setRows] = useState<RegisteredUser[]>(users)

	const handleSelectionChange = (keys: "all" | Set<Key>) => {
		console.log(keys)
	}

	const lockSelectedUsers = () => {}

	const unlockSelectedUsers = () => {}

	const deleteSelectedUsers = () => {}

	return (
		<>
			<Toolbar
				lockSelectedUsers={lockSelectedUsers}
				unlockSelectedUsers={unlockSelectedUsers}
				deleteSelectedUsers={deleteSelectedUsers}
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
				<TableBody items={rows} emptyContent={"No rows to display."}>
					{(item) => (
						<TableRow key={item.id}>
							{(columnKey) => (
								<TableCell>{getKeyValue(item, columnKey)}</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</>
	)
}

export default AdminTable
