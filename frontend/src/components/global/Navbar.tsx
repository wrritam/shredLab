import Link from 'next/link'
import { FC } from 'react'

const Navbar: FC = () => {
  return (
    <section className=''>
      <div className='w-full px-[21vw] bg-[#9BA4B5] border-b border-white/15 py-3'>
         <div className='navbar-inside-wrap'>
            <div className='flex justify-between w-full'>
               <div className='flex gap-2'>
                  <img src="/Logo.svg" alt='shredlab' className='w-7 h-7 my-auto'/>
                  <h1 className='text-center my-auto font-bold text-xl tracking-tight'>Shredlab</h1>
               </div>
               <div className='my-auto'>
                  <div className='flex gap-5'>
                     <div className='flex-none h-auto relative w-auto'>
                        <Link href="/" className='icon-wrap'>
                           <img src="/icons/star.svg" alt='shredlab' className='w-7 h-7 opacity-90'/>
                        </Link>
                     </div>
                     <div className='flex-none h-auto relative w-auto'>
                        <Link href="/" className='icon-wrap'>
                           <img src="/icons/how-it-works.svg" alt='shredlab' className='w-7 h-7 opacity-90'/>
                        </Link>
                     </div>
                     <div className='flex-none h-auto relative w-auto'>
                        <Link href="/" className='icon-wrap'>
                           <img src="/icons/showcase.svg" alt='shredlab' className='w-7 h-7 opacity-90'/>
                        </Link>
                     </div>
                     <div className='flex-none h-auto relative w-auto'>
                        <Link href="/" className='icon-wrap'>
                           <img src="/icons/pricing.svg" alt='shredlab' className='w-7 h-7 opacity-90'/>
                        </Link>
                     </div>
                     <div className='flex-none h-auto relative w-auto'>
                        <Link href="/" className='icon-wrap'>
                           <img src="/icons/faq.svg" alt='shredlab' className='w-7 h-7 opacity-90'/>
                        </Link>
                     </div>
                     <div className='flex-none h-auto relative w-auto'>
                        <Link href="/" className='icon-wrap'>
                           <img src="/icons/brands.svg" alt='shredlab' className='w-7 h-7 opacity-90'/>
                        </Link>
                     </div>
                  </div>
               </div>
               <div className='flex gap-2'>
                  <img src="/icons/mail.svg" alt='mail' className='w-7 h-7 my-auto'/>
                  <h1 className='text-center my-auto font-medium text-lg tracking-tight'>Get in touch</h1>
               </div>
            </div>
         </div>
      </div>
    </section>
  )
}

export default Navbar
