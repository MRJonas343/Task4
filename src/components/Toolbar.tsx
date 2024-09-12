"use client"
import { TbLock, TbLockOpen2, TbTrash } from "react-icons/tb"
import { TableHeaderProps } from "@/interfaces"
import { Button } from "@nextui-org/react"
import * as actions from "@/actions"
import { FC } from "react"

const Toolbar: FC<TableHeaderProps> = ({ selectedIds }) => {
	return (
		<div className="flex justify-between">
			<div className="flex  gap-4">
				<Button
					onClick={async () => {
						if (selectedIds !== "all" && selectedIds.size === 0) {
							return console.log("No keys selected")
						}
						await actions.lockSelectedUsers(selectedIds)
					}}
					radius="sm"
					endContent={<TbLock size={20} />}
				>
					Block
				</Button>

				<Button
					color="default"
					onClick={async () => {
						if (selectedIds !== "all" && selectedIds.size === 0) {
							return console.log("No keys selected")
						}
						await actions.unlockSelectedUsers(selectedIds)
					}}
					radius="sm"
					isIconOnly
				>
					<TbLockOpen2 size={20} />
				</Button>

				<Button
					onClick={async () => {
						if (selectedIds !== "all" && selectedIds.size === 0) {
							return console.log("No keys selected")
						}
						await actions.deleteSelectedUsers(selectedIds)
					}}
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
						await actions.executeSeed()
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
