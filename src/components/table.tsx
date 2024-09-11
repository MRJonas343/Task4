"use client"

import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	getKeyValue,
	Button,
} from "@nextui-org/react"

import { Key, useState } from "react"
import { rowsData, Row } from "@/data/fakeData"
import { TbLock, TbLockOpen2, TbTrash } from "react-icons/tb"

const AdminTable = () => {
	const [rows, setRows] = useState<Row[]>(rowsData)

	const columns = [
		{ key: "id", label: "ID" },
		{ key: "name", label: "Name" },
		{ key: "email", label: "Email" },
		{ key: "last-login", label: "Last Login" },
		{ key: "registration-time", label: "Registration Time" },
		{ key: "status", label: "Status" },
	]

	const handleSelectionChange = (keys: "all" | Set<Key>) => {
		console.log(keys)
	}

	const lockSelectedUsers = () => {}

	const unlockSelectedUsers = () => {}

	const deleteSelectedUsers = () => {}

	return (
		<>
			<div className="flex  gap-4">
				<Button
					onClick={lockSelectedUsers}
					radius="sm"
					endContent={<TbLock size={20} />}
				>
					Block
				</Button>

				<Button
					color="default"
					onClick={unlockSelectedUsers}
					radius="sm"
					isIconOnly
				>
					<TbLockOpen2 size={20} />
				</Button>

				<Button
					onClick={deleteSelectedUsers}
					color="danger"
					radius="sm"
					isIconOnly
				>
					<TbTrash size={20} />
				</Button>
			</div>

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
