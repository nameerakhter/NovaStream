
import Image from 'next/image'
import { Poppins } from "next/font/google"
import { cn } from '@/lib/utils'


const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"]
})
export function Logo() {
  return (
    <div className='flex flex-col gap-y-4 items-center'>
      <div className='bg-white rounded-full p-2'>
        <Image src="/logo.svg" alt='logo' width={80} height={80} />
      </div>
      <div className={cn(' flex flex-col items-center justify-center', font.className)}>
        <p className='text-xl font-semibold'>Nova Stream</p>
        <p className='text-xl text-muted-foreground font-semibold'>Let's Play</p>
      </div>
    </div>
  )
}
