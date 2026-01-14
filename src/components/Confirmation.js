import React, { useState } from 'react'
import Button from './Button'

export default function Confirmation({cancelHandler, confirmHandler}) {
  const [loading,setLoading] = useState(false)
  const handler = () => {
    confirmHandler()
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
    },[7000])
  }
  return (
    <div className='fixed h-screen w-screen top-0 left-0 z-[9999] bg-[rgba(0,0,0,0.5)] flex flex-wrap justify-center'>
        <div className='w-[420px] bg-white h-max flex flex-wrap mt-10 rounded-lg px-4 py-3 '>
            <h2 className='text-xl font-semibold text-black font-worksans capitalize'> Are you sure to quit?</h2>
            <h4 className='font-inter font-medium text-black font-base opacity-70'>By tap on yes you will leave the game room. All of your winnings will settle down for this session.</h4>
            <div className='w-full grid grid-cols-2 gap-5 mt-5'>
                <Button variant={"teal"} className={"rounded-lg"} onClick={()=> cancelHandler(false)}>No</Button>
                <Button variant={"primary"} onClick={handler} className={`border-transparent rounded-lg ${loading ? 'opacity-50':''}`} disabled={loading}>Yes, Quit it!</Button>
            </div>
        </div>
    </div>
  )
}
