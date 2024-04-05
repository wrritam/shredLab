import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

const Navbar: FC = () => {
  return (
    <section className='navbar-wrap'>
      <div className='w-full'>
         <div className='navbar-inside-wrap'>
            <div className='navbar-container py-5'>
               <div className='left-part'>
                  <Image src="/Logo.svg" alt='shredlab' width={1080} height={1080} className='w-5 h-5 my-auto'/>
                  <h1 className='text-center my-auto font-medium'>Shredlab</h1>
               </div>
               <div className='center-part'>
                  <div className='icons-wrap'>
                     <div className='flex-none h-auto relative w-auto'>
                        <Link href="/" className='icon-wrap'>
                           <div className='w-5 h-5 my-auto'>
                              <Image src="/icons/star.svg" alt='shredlab' width={1080} height={1080} className='w-full h-full'/>
                           </div>
                        </Link>
                     </div>
                     <div className='flex-none h-auto relative w-auto'>
                        <Link href="/" className='icon-wrap'>
                           <div className='w-5 h-5 my-auto'>
                              <Image src="/icons/how-it-works.svg" alt='shredlab' width={1080} height={1080} className='w-full h-full'/>
                           </div>
                        </Link>
                     </div>
                     <div className='flex-none h-auto relative w-auto'>
                        <Link href="/" className='icon-wrap'>
                           <div className='w-5 h-5 my-auto'>
                              <Image src="/icons/showcase.svg" alt='shredlab' width={1080} height={1080} className='w-full h-full'/>
                           </div>
                        </Link>
                     </div>
                     <div className='flex-none h-auto relative w-auto'>
                        <Link href="/" className='icon-wrap'>
                           <div className='w-5 h-5 my-auto'>
                              <Image src="/icons/pricing.svg" alt='shredlab' width={1080} height={1080} className='w-full h-full'/>
                           </div>
                        </Link>
                     </div>
                     <div className='flex-none h-auto relative w-auto'>
                        <Link href="/" className='icon-wrap'>
                           <div className='w-5 h-5 my-auto'>
                              <Image src="/icons/faq.svg" alt='shredlab' width={1080} height={1080} className='w-full h-full'/>
                           </div>
                        </Link>
                     </div>
                     <div className='flex-none h-auto relative w-auto'>
                        <Link href="/" className='icon-wrap'>
                           <div className='w-5 h-5 my-auto'>
                              <Image src="/icons/brands.svg" alt='shredlab' width={1080} height={1080} className='w-full h-full'/>
                           </div>
                        </Link>
                     </div>
                  </div>
               </div>
               <div className='right-part'>
                  <Image src="/icons/mail.svg" alt='mail' width={1080} height={1080} className='w-5 h-5 my-auto'/>
                  <h1 className='text-center my-auto font-medium'>Get in touch</h1>
               </div>
            </div>
         </div>
      </div>
    </section>
  )
}

export default Navbar
