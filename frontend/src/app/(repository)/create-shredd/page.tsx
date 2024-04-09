"use client"

import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';
import React, { useMemo, useState } from 'react'

type Props = {}

const CreateShredd = (props: Props) => {
   const config: Config = {
      dictionaries: [adjectives, colors, animals],
      separator: '-',
    }
    const randomName = useMemo(() => uniqueNamesGenerator(config), []) ;

    const [shreddName, setShreddName] = useState<string>()

    const handleShreddName = (randomName: string) => {
      setShreddName(randomName)
    }
  return (
    <section className='w-[60%] mx-auto my-[3vw] text-[#212A3E]'>
      <div className='px-2'>
         <h1 className='font-bold text-3xl'>Create a new shredd</h1>
         <p className='font-medium text-sm text-[#526D82]'>A shredd contains all files, including the revision history. Already have a project repository elsewhere?</p>
      </div>
      <hr className='border-t-[1px] border-[#9db2bf80] my-5'/>
      <div className='flex gap-3 px-2'>
         <div className='flex flex-col gap-1'>
            <h1 className='font-bold'>Owner</h1>
            <button className='badge font-semibold'>
               <img src='/Chikorita.svg' alt='chikorita' className='w-6 h-6 my-auto'/>
               <p className='text-lg my-auto'>Oeuvars</p>
            </button>
         </div>
         <div className='font-bold text-2xl mt-8'>
            /
         </div>
         <div className='flex flex-col gap-1'>
            <h1 className='font-bold'>Shredd Name</h1>
            <input
               value={shreddName}
               className=' bg-white/5 py-2 px-5 rounded-lg backdrop-blur-sm outline-none border border-[#526D82]/30 font-medium'
            />
         </div>
      </div>
      <div className='px-2'>
         <div>Great Shredd names are short and memorable. Need inspiration? How about <button className='font-semibold' onClick={() => handleShreddName(randomName)}>{randomName} ?</button></div>
      </div>
      <div className='px-2 mt-5 flex flex-col gap-2'>
         <h1 className='font-bold'>Description (optional)</h1>
         <input
            className=' bg-white/5 py-2 px-5 rounded-lg backdrop-blur-sm outline-none border border-[#526D82]/30 font-medium'
         />
      </div>
      <hr className='border-t-[1px] border-[#9db2bf80] my-5'/>
      <div>

      </div>
    </section>
  )
}

export default CreateShredd
