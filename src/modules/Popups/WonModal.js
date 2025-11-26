import Button from '@/components/Button'
import React from 'react'

export default function WonModal({exitHandler}) {
    return (
        <div className='popup-container'>
            <div className='popup w-2/3 p-12 flex flex-col items-center'>
                <h2 className='text-[48px] font-normal font-ruso normal-text-shadow text-center'>Congratulations!</h2>
                <h1 className='text-[96px] font-normal font-ruso normal-text-shadow text-center leading-none'>You won $ 22.40</h1>
                <h3 className='text-[40px] font-normal normal-text-shadow text-center '>Only 942 hands left to become a <span className='text-red'>Rat</span> in Liberty Poker!</h3>
                <div className='w-full flex items-center justify-center gap-20 mt-12'>
                    <Button variant={"custom"} className={"w-fit text-[40px] font-normal font-ruso p-2 px-5 rounded-[20px] bg-[#600000] border-[#320000] text-[#F4E17EE5]"}>LEAVE THE GAME</Button>
                    <Button className={"text-[40px] font-normal font-ruso p-2 w-fit px-12"}>PLAY AGAIN</Button>
                </div>
            </div>
        </div>
    )
}
