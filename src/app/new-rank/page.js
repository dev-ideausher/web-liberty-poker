"use client"
import Button from '@/components/Button'
import React, { useState } from 'react'

export default function page() {
    const [currentRank, setCurrentRank] = useState("cat")
    return (
        <div className="h-screen w-full bg-[url('/images/banners/new-rank.png')] overflow-hidden bg-cover">
            <div className="layout-container flex flex-col items-center">
                <h2 className="normal-text-shadow text-[48px] uppercase font-normal font-bebas pt-5 w-full">
                    Liberty Poker
                </h2>
                <div className='w-full flex items-center justify-between mt-'>
                    <div className='w-[30%] rankimg-shadow rounded-[30px]'>
                        <img src="/images/rank-cat.png" alt="rank" className='w-full object-cover' />
                    </div>
                    <div className='flex flex-col items-center'>
                        <h3 className='text-[64px] font-ruso font-normal normal-text-shadow'>Congratulations!</h3>
                        <h3 className='text-[64px] font-ruso font-normal normal-text-shadoe mt-6'>You’ve reached the rank:</h3>
                        <h1 className=' uppercase text-[128px] font-normal font-ruso normal-text-shadow leading-none'>{currentRank}</h1>
                        <Button className={"w-fit text-[48px] font-normal font-ruso mt-6 px-8"}>CLAIM YOUR REWARD</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
