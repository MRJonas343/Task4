import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

const page = () => {
	return (
		<main className="grid place-items-center h-screen">
			<section className="flex flex-col w-full gap-4 max-w-[350px]">
				<h1 className={"font-bold text-center mt-4"}>Register</h1>

				<Input placeholder="name" />
				<Input placeholder="Email" />
				<Input placeholder="Password" />
				<Input placeholder="Confirm Password" />

				<Button>Register</Button>
			</section>
		</main>
	);
};
export default page;
