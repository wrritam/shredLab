"use client"

import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';
import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion';
import { CheckIcon, ChevronDown, Info } from 'lucide-react';
import Checkbox from '@/components/ui/checkbox';
import { Button } from '@nextui-org/react';
import axios from 'axios';

const CreateShredd = () => {
   const config: Config = {
      dictionaries: [adjectives, colors, animals],
      separator: '-',
      length: 2
   }
   const randomName = useMemo(() => uniqueNamesGenerator(config), []);

   const [shreddName, setShreddName] = useState<string>()
   const [isVisible, setIsVisible] = useState<string>("Public");
   const [showIsVisibleDropdown, setShowIsVisibleDropdown] = useState<boolean>(false);

   const handleShreddName = (randomName: string) => {
      setShreddName(randomName)
   }

   const visibility = [
      {
         value: 'Public',
         label: 'Public',
      },
      {
         value: 'Private',
         label: 'Private',
      },
   ];

   const handleClick = async () => {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/create-repo`, )
   }
   return (
      <section className='w-[60%] mx-auto my-[3vw] text-[#212A3E]'>
         <div className='px-2'>
            <h1 className='font-bold text-3xl'>Create a new shredd</h1>
            <p className='font-medium text-sm text-[#212A3E]'>A shredd contains all shredd.bc files, including the revision history.</p>
         </div>
         <hr className='border-t-[1px] border-[#9db2bf80] my-5' />
         <div className='flex gap-3 px-2'>
            <div className='flex flex-col gap-1'>
               <h1 className='font-bold'>Owner</h1>
               <button className='badge font-semibold'>
                  <img src='/Chikorita.svg' alt='chikorita' className='w-8 h-8 my-auto' />
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
                  className='bg-white/5 py-[0.62rem] px-5 rounded-lg backdrop-blur-sm outline-none border border-[#526D82]/30 font-medium w-[140%]'
               />
            </div>
         </div>
         <div className='px-2'>
            <div>Great Shredd names are short and memorable. Need inspiration? How about <button className='font-semibold' onClick={() => handleShreddName(randomName)}>{randomName} ?</button></div>
         </div>
         <div className='px-2 mt-5 flex flex-col gap-2'>
            <h1 className='font-bold'>Description (optional)</h1>
            <input
               className=' bg-white/5 py-[0.62rem] px-5 rounded-lg backdrop-blur-sm outline-none border border-[#526D82]/30 font-medium'
            />
         </div>
         <hr className='border-t-[1px] border-[#9db2bf80] my-5' />
         <div className="relative flex flex-col gap-2 font-medium w-[98.5%] mx-auto">
            <span className='my-auto capitalize font-bold px-2'>Visibility: </span>
            <div
               className="flex mx-auto w-full justify-between cursor-pointer px-5 py-[0.65rem] rounded-lg no-text-highlight outline-neutral-600 outline-offset-1 border border-[#526D82]/30 bg-white/5 backdrop-blur-xl drop-shadow-[0_0px_10px_rgba(0,0,0,0.075)]"
               onClick={() => setShowIsVisibleDropdown(!showIsVisibleDropdown)}
            >
               {isVisible ? visibility.find( organisation => organisation.value === isVisible )?.label : 'Sponsered by'}
               <ChevronDown className={`animation my-auto ml-2 h-6 w-6 shrink-0 opacity-50 ${showIsVisibleDropdown ? 'rotate-180' : 'rotate-0'}`}/>
            </div>
            {showIsVisibleDropdown && (
               <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-10 w-full justify-center mt-[5.2rem] rounded-lg bg-white/5 border border-[#526D82]/30 backdrop-blur-xl drop-shadow-[0_0px_10px_rgba(0,0,0,0.075)] py-1 px-1 font-medium"
               >
                  <div className="p-1 cursor-pointer">
                        {visibility.map(organisation => (
                           <div
                              key={organisation.value}
                              className="flex items-center justify-between px-2 py-3 hover:bg-[#9DB2BF]/40 rounded-md cursor-pointer"
                              onClick={() => {
                                    setIsVisible(organisation.value);
                                    setShowIsVisibleDropdown(false);
                              }}
                           >
                              <span className='capitalize text-base cursor-pointer font-medium no-text-highlight'>{organisation.label}</span>
                              {isVisible === organisation.value && (
                                    <CheckIcon className="h-4 w-4 text-neutral-950" />
                              )}
                           </div>
                        ))}
                  </div>
               </motion.div>
            )}
         </div>
         <hr className='border-t-[1px] border-[#9db2bf80] my-5' />
         <div className='px-2'>
            <h1 className='font-bold'>Initialize this repository with:</h1>
            <Checkbox id='c-1'>
               <Checkbox.Indicator />
               <Checkbox.Label>Add a README file</Checkbox.Label>
            </Checkbox>
         </div>
         <hr className='border-t-[1px] border-[#9db2bf80] my-5' />
         <div className='flex mx-auto justify-center gap-2 px-2'>
            <Info className='w-4 h-4 my-auto'/>
            <h1 className='font-medium text-sm'>You are creating a <span className='lowercase'>{isVisible}</span> repository in your personal account.</h1>
         </div>
         <hr className='border-t-[1px] border-[#9db2bf80] my-5' />
         <Button className='rounded-md bg-[#27374D] text-[#DDE6ED] px-5 py-2 font-semibold text-base ml-auto flex mr-2'>
            Create repository
         </Button>
      </section>
   )
}

export default CreateShredd
