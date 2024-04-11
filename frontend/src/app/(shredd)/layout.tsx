import Navbar from '@/components/global/Navbar'
import React from 'react'

type Props = { children: React.ReactNode }

const Layout = (props: Props) => {
  return (
    <section className='-z-10'>
      <div className='lines'>
        <div className='single-line'></div>
        <div className='single-line'></div>
        <div className='single-line'></div>
        <div className='single-line'></div>
        <div className='single-line'></div>
        <div className='single-line'></div>
      </div>
      <Navbar />
      {props.children}
    </section>
  )
}

export default Layout
