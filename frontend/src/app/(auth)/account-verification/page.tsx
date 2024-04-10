"use client"

import React, { useEffect, useState } from 'react'
import {
   InputOTP,
   InputOTPGroup,
   InputOTPSeparator,
   InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import * as jose from 'jose'
import Cookies from "js-cookie";
import axios from 'axios'
import { showToast } from '@/helpers/taosts'
import { Loader2 } from 'lucide-react'

interface Payload {
   email: string;
   exp: number;
   iat: number
 }

const page = () => {
   const [value, setValue] = useState("");
   const [loading, setLoading] = useState<boolean>(false);
   const [email, setEmail] = useState<string>("");
   const router = useRouter();
   useEffect(() => {
      const cookie = Cookies.get("RegisterCookie");
      if (cookie) {
        const payload: Payload = jose.decodeJwt(cookie);
        setEmail(payload.email)
      }
      else {
         router.push("/auth/register")
      }
    }, [])
   const handleVerification = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setLoading(true);
      try {
        const response = await axios.post(`${process.env.VITE_SERVER_URL}/user/verify-registration`, {email, oneTimePass: value})
        const result = response.data
         if (result.success === true) {
          router.push("/");
         } else {
          showToast("Wrong OTP", false)
         }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
   return (
      <section className='flex justify-center flex-col gap-5 items-center text-[#212A3E] font-semibold min-h-screen -mt-[10vw]'>
         <h1 className='font-bold text-4xl bg-gradient-to-r from-slate-500 to-slate-800 bg-clip-text text-transparent py-1 z-10 tracking-wide'>Account Verification</h1>
         <div className='z-10'>
            <InputOTP maxLength={6} value={value} onChange={(value) => setValue(value)}>
               <InputOTPGroup className='caret-[#212A3E]'>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
               </InputOTPGroup>
               <InputOTPSeparator />
               <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
               </InputOTPGroup>
            </InputOTP>
         </div>
         <Button
            onClick={handleVerification}
            className={`rounded-md bg-[#27374D] text-[#DDE6ED] px-5 py-2 font-semibold text-base ml-auto flex mx-auto w-[60%] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
         >
            {loading ? <div className='flex gap-3 justify-center items-center'><Loader2 className='rotate w-6 h-6 my-auto text-[#555555]' /><span className='text-[#555555] font-medium tracking-tight text-xl'>Signing Up...</span></div> : 'Sign Up'}
         </Button>
      </section>

   )
}

export default page
