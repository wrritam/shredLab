import { FC } from 'react'
import Navbar from '@/components/globals/Navbar'
import Hero from './(home)/Hero'

const Home: FC = () => {
  return (
    <section>
      <div className='lines'>
        <div className='single-line'></div>
        <div className='single-line'></div>
        <div className='single-line'></div>
        <div className='single-line'></div>
        <div className='single-line'></div>
        <div className='single-line'></div>
      </div>
      <Navbar />
      <Hero />
    </section>
  )
}

export default Home
