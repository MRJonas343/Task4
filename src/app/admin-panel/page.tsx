import AdminTable from "@/components/table";

const page = () => {
	return (
		<main className="grid place-items-center h-screen">
			<section className="flex flex-col w-full gap-4 max-w-[700px]">
				<h1 className={"font-bold text-center mt-4"}>Admin Panel</h1>
				<AdminTable />
			</section>
		</main>
	);
};
export default page;
