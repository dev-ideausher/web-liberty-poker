import Exit from '@/icons/Exit'
import Info from '@/icons/Info'
import Send from '@/icons/Send'
import Settings from '@/icons/Settings'
import User from '@/icons/User'
import React from 'react'

export default function HomeOptions({className}) {
  return (
    <div className={`flex relative items-center dark-gradient flex items-center justify-between w-96 px-10 py-5 gap-5 mt-10 shadow-[0_2px_32px_5px_rgba(0, 0, 0, 0.50)]`}>
        <Send/>
        <div className='red-gradient left-[35%] flex items-center justify-center absolute size-[120px] rounded-full'>
            <Exit/>
        </div>
        
        <Info/>        
    </div>
  )
}
