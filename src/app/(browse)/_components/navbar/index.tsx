import { Logo } from "./logo";

export default function Navbar() {
	return (
		<nav>
			<div className="fixed top-0 w-full h-20 z-[49]  px-2 lg:px-4 flex justify-between items-center shadow-sm">
				<Logo />
				Navbar
			</div>
		</nav>
	)
}
