"use client"

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Eye, EyeOff, Loader2, RotateCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { showToast } from '@/helpers/taosts';
import Link from 'next/link';
import { Button, Skeleton } from '@nextui-org/react';
import { getRandomImage } from '@/extra/avatars';

interface Result {
   success: boolean;
   message: string;
   token: string | null
}

const Register = () => {
   const [user, setUser] = useState({
      name: "",
      username: "",
      email : "",
      password : ""
    });
    const [userBio, setUserBio] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [avatarUrl, setAvatarUrl] = useState<string>("")

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    }
    const navigate = useRouter()
    const handleAddUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (user.email && user.name && user.password && user.username && !loading) {
         setLoading(true);
         const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/register`, {
            name: user.name,
            username: user.username,
            bio: userBio,
            profilePictureUrl: avatarUrl,
            email: user.email,
            password: user.password
         },
      )
         const result: Result = response.data
         if (result.success === false ) {
            localStorage.removeItem('userBio');
            showToast(result.message, false);
            setLoading(false)
         } else {
            Cookies.set('RegisterCookie', result.token! , { expires: 7 })
            console.log(result.token)
            setLoading(false);
            navigate.push("/account-verification");
         }
      } else {
         showToast("Enter all fields", false)
      }
    };

    useEffect(() => {
      setAvatarUrl(getRandomImage())
    }, [])
   const handleClick = () => {
      setAvatarUrl(getRandomImage())
   }
   const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      let input = e.target;
      const text = input.value;
      setUserBio(text);
      input.style.height = 'auto';
      input.style.height = input.scrollHeight + 'px';

      localStorage.setItem('userBio', text);
    }
  return (
      <div className='min-h-screen flex flex-col justify-between'>
         <div className='m-auto phone:w-[90%] tablet:w-[70%] md:w-[50%] flex flex-col justify-center phone:mt-[5vh] tablet:mt-[7vw]'>
            <div className='flex flex-col gap-1 mt-[4vw] mx-auto'>
               <span className='phone:text-4xl md:text-6xl font-semibold gradient-text tracking-tight text-4xl bg-gradient-to-r from-slate-500 to-slate-800 bg-clip-text text-transparent py-1 z-10'>Welcome ShreddLab!</span>
            </div>
            <div className='mx-auto flex flex-col phone:gap-2 tablet:gap-3 w-full phone:my-[2.5vh] tablet:my-10 text-[#212A3E] caret-teal-900'>
               <input
                  type="name"
                  id="name"
                  name="name"
                  placeholder='Name'
                  value={user.name}
                  className="bg-white/20 py-3 px-5 rounded-lg backdrop-blur-sm outline-none border border-[#526D82]/30 font-medium w-full"
                  required
                  onChange={(e)=>{setUser({...user,name:e.target.value})}}
               />
               <div className='grid grid-cols-2 gap-5'>
                  <input
                     type="username"
                     id="username"
                     name="username"
                     placeholder='Username'
                     value={user.username}
                     className="bg-white/20 py-3 px-5 rounded-lg backdrop-blur-sm outline-none border border-[#526D82]/30 font-medium w-full"
                     required
                     onChange={(e)=>{setUser({...user,username:e.target.value})}}
                  />
                  <div
                     className="bg-white/20 py-[0.33rem] px-2 rounded-lg backdrop-blur-sm outline-none border border-[#526D82]/30 font-medium w-full"
                  >
                     {avatarUrl ? (
                        <div className='flex gap-3'>
                           <img src={avatarUrl} alt={avatarUrl} className='w-10 my-auto h-10'/>
                           <Button onClick={handleClick} className='bg-white/30 rounded-lg px-3 font-semibold text-sm no-text-highlight flex justify-center items-center gap-1'><RotateCcw className='w-4 h-4 my-auto'/><span>Regenerate</span></Button>
                        </div>
                     ) : (
                        <Skeleton className='w-10 h-10 rounded-full'/>
                     )}
                  </div>
               </div>
               <input
                  type="email"
                  id="email"
                  name="email"
                  className="bg-white/20 py-3 px-5 rounded-lg backdrop-blur-sm outline-none border border-[#526D82]/30 font-medium w-full"
                  placeholder='Email'
                  value={user.email}
                  required
                  onChange={(e)=>{setUser({...user,email:e.target.value})}}
               />
               <div className='flex'>
                  <input
                     type={showPassword ? 'text' : 'password'}
                     id="password"
                     name="password"
                     placeholder='Password'
                     value={user.password}
                     className="bg-white/20 py-3 px-5 rounded-lg backdrop-blur-sm outline-none border border-[#526D82]/30 font-medium w-full"
                     required
                     onChange={(e)=>{setUser({...user,password:e.target.value})}}
                  />
                  <button
                     onClick={togglePasswordVisibility}
                     className='text-[#333333] font-medium bg-transparent border-0 outline-none focus:outline-none cursor-pointer phone:-ml-[5vh] md:-ml-[2.5vw] z-10'
                  >
                     {showPassword ? (<Eye className='w-6 h-6'/>) : (<EyeOff className='w-6 h-6'/>)}
                  </button>
               </div>
               <textarea
                  placeholder='Your bio...'
                  className='scroll resize-none leading-tight text-[#040D12] title bg-white/20 py-3 px-5 rounded-lg backdrop-blur-sm outline-none border border-[#526D82]/30 font-medium w-full'
                  value={userBio}
                  onChange={handleTitleChange}
               ></textarea>
            </div>
            <Button
               onClick={handleAddUser}
               className={`rounded-md bg-[#27374D] text-[#DDE6ED] px-5 py-2 font-semibold text-base ml-auto flex mx-auto w-[60%] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
               disabled={loading}
            >
               {loading ? <div className='flex gap-3 justify-center items-center'><Loader2 className='rotate w-6 h-6 my-auto text-[#555555]'/><span className='text-[#555555] font-medium tracking-tight text-xl'>Signing Up...</span></div> : 'Sign Up'}
            </Button>
         </div>
      </div>
  )
}

export default Register
