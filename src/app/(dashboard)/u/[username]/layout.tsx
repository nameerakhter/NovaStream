import { redirect } from "next/navigation";
import { Metadata } from "next";
import { getSelfByUsername } from "@/lib/auth-service";
import Navbar from "@/app/(browse)/_components/navbar";
import { Sidebar } from "@/app/(browse)/_components/sidebar";
import { Container } from "@/app/(browse)/_components/container";


export const metadata: Metadata = {
	title: "Dashboard",
};

export default async function CreatorLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { username: string };
}) {
	const { username } = await params
	const self = await getSelfByUsername(username);

	if (!self) redirect("/");

	return (
		<>
			<Navbar />
			<div className="flex h-full pt-20">
				<Sidebar />
				<Container>{children}</Container>
			</div>
		</>
	);
}
