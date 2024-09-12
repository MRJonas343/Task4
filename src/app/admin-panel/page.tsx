import AdminTable from "@/components/AdminTable"
import { getUsers } from "@/services"

const page = async () => {
	const users = await getUsers()

	return (
		<main className="grid place-items-center h-screen">
			<section className="flex flex-col w-full gap-4 max-w-[1000px]">
				<h1 className={"font-bold text-center mt-4"}>Admin Panel</h1>
				<AdminTable users={users} />
			</section>
		</main>
	)
}
export default page
