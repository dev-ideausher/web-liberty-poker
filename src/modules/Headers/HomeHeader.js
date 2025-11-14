import React from 'react'
import Funds from '../Funds'

export default function HomeHeader() {
  return (
    <div className='w-full absolute top-0 left-0 z-30'>
      <div className='layout-container flex items-center justify-between pt-5'>
        <h2 className='normal-text-shadow text-[48px] uppercase font-normal font-bebas'>Liberty Poker</h2>
        <Funds/>
      </div>
    </div>
  )
}
