"use client"

import { Button } from '@nextui-org/react'
import React from 'react'

type Props = {}

const UpdateProfileButton = (props: Props) => {
   const handleClick = () => {

   }
   return (
      <Button onClick={handleClick} className='rounded-md bg-[#27374D] text-[#DDE6ED] px-5 py-2 font-semibold text-base flex'>
         Create repository
      </Button>
   )
}

export default UpdateProfileButton
