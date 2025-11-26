import React from 'react'
import Funds from '../Funds'

export default function HomeHeader() {
  return (
      <div className='layout-container flex items-center justify-between pt-5 relative z-20'>
        <h2 className='normal-text-shadow text-[48px] uppercase font-normal font-bebas'>Liberty Poker</h2>
        <Funds/>
      </div>
  )
}
