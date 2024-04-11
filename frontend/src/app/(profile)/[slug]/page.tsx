import axios from 'axios';
import React from 'react'
import { User } from '@/types/user-type';
import { Clock, Dot } from 'lucide-react';
import UpdateProfileButton from '../components/update-profile-button';
import { currentTimeFormatted } from '../components/get-date';

const page = async ({ params }: { params: { slug: string } }) => {
   const username = params.slug
   const response = await axios.get(`${process.env.SERVER_URL}/api/get-user-info/${username}`);
   const user: User = response.data.data
   console.log(user)
   const currentUTCDate = new Date().toUTCString();
   return (
      <section className='grid grid-cols-[1fr_2fr] gap-5 w-[70%] mx-auto py-[2vw]'>
         <div className='flex flex-col gap-3'>
            <img src={user.profilePictureUrl} alt='' className='w-40 h-40 my-auto rounded-full' />
            <div>
               <div className='font-semibold text-3xl text-[#526D82] tracking-tighter flex'>
                  <div className='flex'><span>{user.name}</span> <Dot className='w-10 h-10 my-auto' /></div>
                  <p className=''>{user.username}</p>
               </div>
               <p className='text-[#27374D] font-medium tracking-tight'>{user.bio}</p>
            </div>
            <UpdateProfileButton />
            <div className='text-[#27374D] flex gap-1'>
               <Clock className='w-5 h-5 my-auto'/>
               <span className='font-semibold my-auto tracking-tighter'>{currentTimeFormatted}</span>
            </div>
            <hr className='border-t-[1px] border-[#9db2bf80] my-3' />
         </div>
      </section>
   )
}

export default page
