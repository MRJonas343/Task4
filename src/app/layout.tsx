import type { Metadata } from "next"
import { Providers } from "./providers"
import { oswald } from "@/fonts/fonts"
import "./globals.css"

export const metadata: Metadata = {
	title: "Task#4 Admin-Pannel",
	description: "Admin-Pannel for Task#4",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={`${oswald.className} antialiased w-screen h-screen`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
