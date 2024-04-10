"use client"

import React, { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { showToast } from '@/helpers/taosts';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';

const Login = () => {
   const variants = {
      hidden: { opacity: 0, x: 0, y: 200 },
      enter: { opacity: 1, x: 0, y: 0 },
   }
   const [user, setUser] = useState({
      email: "",
      password: ""
   })
   const [loading, setLoading] = useState<boolean>(false);
   const [showPassword, setShowPassword] = useState<boolean>(false);
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
   }
   const router = useRouter()
   const handleUserLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (user.email && user.password && !loading) {
         setLoading(true);
         const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login`, user);
         const result = response.data;
         if (result.success === true) {
            Cookies.set('LoginCookie', result.token!, { expires: 7 })
            router.push('/')
            setLoading(false)
         }
         else {
            if (result.exists === true) {
               showToast(result.message, true);
               setLoading(false)
            } else {
               showToast(result.message, false);
               setLoading(false)
            }
         }
      }
   };
   return (
      <div className='min-h-screen flex flex-col justify-between'>
         <div className='m-auto phone:w-[90%] tablet:w-[70%] md:w-[50%] flex flex-col justify-center items-center gap-7 min-h-screen'>
            <div className='flex flex-col gap-1 mx-auto'>
               <span className='phone:text-4xl md:text-6xl font-semibold gradient-text tracking-tight text-4xl bg-gradient-to-r from-slate-500 to-slate-800 bg-clip-text text-transparent py-1 z-10'>Welcome Back!</span>
            </div>
            <div className='mx-auto flex flex-col phone:gap-2 w-full text-[#212A3E]'>
               <input
                  type="email"
                  id="email"
                  name="email"
                  className="bg-white/20 py-3 px-5 rounded-lg backdrop-blur-sm outline-none border border-[#526D82]/30 font-medium w-full caret-slate-800"
                  placeholder='Email'
                  value={user.email}
                  required
                  onChange={(e) => { setUser({ ...user, email: e.target.value }) }}
               />
               <div className='flex'>
                  <input
                     type={showPassword ? 'text' : 'password'}
                     id="password"
                     name="password"
                     placeholder='Password'
                     value={user.password}
                     className="bg-white/20 py-3 px-5 rounded-lg backdrop-blur-sm outline-none border border-[#526D82]/30 font-medium w-full caret-slate-800 "
                     required
                     onChange={(e) => { setUser({ ...user, password: e.target.value }) }}
                  />
                  <button
                     onClick={togglePasswordVisibility}
                     className='text-[#333333] font-medium bg-transparent border-0 outline-none focus:outline-none cursor-pointer phone:-ml-[5vh] md:-ml-[2.5vw] z-10'
                  >
                     {showPassword ? (<Eye className='w-6 h-6' />) : (<EyeOff className='w-6 h-6' />)}
                  </button>
               </div>
            </div>
            <Button
               onClick={handleUserLogin}
               className={`rounded-md bg-[#27374D] text-[#DDE6ED] px-5 py-2 font-semibold text-base ml-auto flex mx-auto w-[60%] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
               disabled={loading}
            >
               {loading ? <div className='flex gap-3 justify-center items-center'><Loader2 className='rotate w-6 h-6 my-auto text-[#555555]' /><span className='text-[#555555] font-medium tracking-tight text-xl'>Logging In...</span></div> : 'Log In'}
            </Button>
            <div className='flex mx-auto'>
               <Link href="/auth/forgot-password" className='text-[#80796B] font-satoshi-medium text-sm hover:underline animation'>
                  Forgot Password?
               </Link>
            </div>
         </div>
      </div>
   )
}

export default Login
