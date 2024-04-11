import axios from 'axios';
import React from 'react'
import { headers } from '@/utils/auth-header-utils';
import { User } from '@/types/user-type';

const page = async ({ params }: {params: {slug: string}}) => {
  const username = params.slug

  const response = await axios.get(`${process.env.SERVER_URL}/api/get-user-info/${username}`);
  const result: User = response.data.data
  return (
    <section className='grid grid-cols-[1fr_2fr] gap-5'>
      <div className='flex flex-col gap-5'>
        {username}
      </div>
    </section>
  )
}

export default page
