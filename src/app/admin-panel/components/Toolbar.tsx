"use client"

import { executeSeed } from "@/actions/admin/admin.actions"
import { TableHeaderProps } from "@/interfaces/tableHeaderProps"
import { Button } from "@nextui-org/react"
import { FC } from "react"
import { TbLock, TbLockOpen2, TbTrash } from "react-icons/tb"

const Toolbar: FC<TableHeaderProps> = ({
	lockSelectedUsers,
	unlockSelectedUsers,
	deleteSelectedUsers,
}) => {
	return (
		<div className="flex justify-between">
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
			<div>
				<Button
					onClick={async () => {
						await executeSeed()
					}}
					radius="sm"
				>
					Seed Users
				</Button>
			</div>
		</div>
	)
}
export default Toolbar
