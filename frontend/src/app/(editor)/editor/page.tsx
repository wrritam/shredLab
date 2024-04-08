"use client"

import { FC, useEffect, useState } from 'react'
import { Info, MoreHorizontal } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Button } from '@nextui-org/react';

const Editor = dynamic(() => import("./editor"), { ssr: false })

const Page: FC = () => {
  const [title, setTitle] = useState<string>('');

  const handleTitlekeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.keyCode == 13) {
      e.preventDefault()
    }
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let input = e.target;
    const text = input.value;
    setTitle(text);
    input.style.height = 'auto';
    input.style.height = input.scrollHeight + 'px';

    localStorage.setItem('blogTitle', text);
  }

  useEffect(() => {
    const storedTitle = localStorage.getItem('blogTitle');
    if (storedTitle) {
      setTitle(storedTitle);
    }
  }, []);

  return (
    <section className='min-h-screen'>
      <div className="flex justify-between px-[11vw] w-full mx-auto py-4 fixed z-10 bg-[#9BA4B5] border-b-[1px] border-neutral-200">
         <div className='flex gap-2'>
            <img src="/Logo.svg" alt='shredlab' className='w-6 h-6 my-auto'/>
            <h1 className='text-center my-auto font-medium text-xl tracking-tight'>Shredlab</h1>
         </div>
          <div className="flex gap-1">
              <Button className="bg-[#212A3E] animation px-5 py-2 rounded-md my-auto text-[#9BA4B5] font-semibold shadow">
                  Publish Preview
              </Button>
              <p className="my-auto tracking-tight font-satoshi-medium"></p>
          </div>
      </div>
      <hr className='w-[100%] border-t-[1px] border-neutral-200'/>
      <div className='mx-auto max-w-[80%] w-full mt-32'>
        <textarea
          placeholder='Blog Title'
          className='text-4xl scroll font-bold w-full outline-none resize-none mt-10 leading-tight bg-transparent caret-teal-900 text-[#040D12] title'
          onKeyDown={handleTitlekeyDown}
          onChange={handleTitleChange}
          value={title}
        ></textarea>
      </div>
      <Editor />
      <hr className='w-[70%] rounded-full mx-auto border-neutral-500 border-dashed'/>
      <div className="flex gap-2 justify-center mt-3 pb-10 -z-10">
        <Info className="w-4 h-4 my-auto text-neutral-400" />
        <p className="text-sm text-[#183D3D] font-semibold">
          Your shredds are saved in real time, close the tabs and take a break if you
          want, it&apos;ll be there when you come back.
        </p>
      </div>
    </section>
  )
}
export default Page
