import { Button } from '@nextui-org/react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <h2>Oops! I dont think this even exists.</h2>
      <p></p>
      <Link href="/">
         <Button className='rounded-md'>
            Return Home
         </Button>
      </Link>
    </div>
  )
}
