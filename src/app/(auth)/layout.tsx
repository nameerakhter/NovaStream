import { Logo } from "./_components/logo";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" space-y-4 h-screen flex flex-col items-center justify-center">
      <Logo />
      {children}
    </div>

  )
}
