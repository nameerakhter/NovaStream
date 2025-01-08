import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <nav className="w-full p-2">
        <UserButton afterSignOutUrl="/sign-in" />
      </nav>
      <h1>Home page</h1>
    </div>
  );
}




