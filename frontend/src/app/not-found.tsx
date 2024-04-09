import Navbar from '@/components/global/Navbar'
import { Button } from '@nextui-org/react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <section>
      <div className='lines'>
        <div className='single-line'></div>
        <div className='single-line'></div>
        <div className='single-line'></div>
        <div className='single-line'></div>
        <div className='single-line'></div>
        <div className='single-line'></div>
      </div>
      <Navbar />
      <div className='flex flex-col gap-3 justify-center items-center min-h-screen -mt-[10vw]'>
        <h2 className='font-bold text-4xl bg-gradient-to-r from-slate-500 to-slate-800 bg-clip-text text-transparent py-1 z-10'>Sorry, No such shredds found.</h2>
        <p></p>
        <Link href="/">
          <Button className='rounded-md bg-[#27374D] text-[#DDE6ED] px-5 py-2 font-semibold text-lg'>
              Return Home
          </Button>
        </Link>
      </div>
    </section>

  )
}
