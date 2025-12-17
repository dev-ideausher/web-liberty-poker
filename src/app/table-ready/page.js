"use client"
import Button from '@/components/Button'
import DayTimer from '@/components/DayTimer'
import Input from '@/components/Input'
import Book from '@/icons/Book'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function page() {
    const router = useRouter()
    useEffect(()=>{
        setTimeout(()=>{
            router.push("/players-joined")
        },[4000])
    },[])
    return (
        
        <div className={`w-full min-h-screen relative`}>
            <img
                src="/images/banners/table-ready.png"
                alt="bba"
                className="h-full absolute w-full object-cover z-10"
            />

            <div className="w-full h-full absolute top-0 left-0 z-20 bg-linear-to-b from-[#00000000] to-[#00000099]"></div>

            <div className="layout-container flex flex-col items-center pb-10 relative z-30">
                <div className="w-full flex items-center justify-between pt-5">
                    <h2 className="normal-text-shadow text-[48px] uppercase font-normal font-bebas">
                    Liberty Poker
                    </h2>
                </div>

                <h1 className="text-[80px] text-primary font-black font-cinzel glow-shadow text-center leading-none mt-5">
                    YOUR TABLE IS READY
                </h1>

                <h2 className="text-[32px] font-normal font-ruso text-center leading-[110%] mt-1 glow-shadow">
                Your private table was configured with the following
                </h2>
                <div className='mt-12 flex items-center justify-center gap-10'>
                    <div className='flex items-center gap-4 earn-input py-3.5 px-8'>
                        <h4 className='text-[32px] font-bold text-primary normal-text-shadow'>CHECK RULES</h4>
                        <Book/>
                    </div>
                    <div className=''>
                        <p className='text-2xl font-normal text-primary text-center mb-2'>Game will start automatically in</p>
                        <DayTimer minutes={3200} className='text-[80px] font-normal font-bebas text-center leading-none' />
                        <p className='text-2xl font-normal text-primary text-center'>With players on the link</p>
                    </div>
                </div>
                <div className='mt-12 flex items-center justify-center gap-5 w-1/2'>
                    <Input type="text" readOnly value="www.poker/privatetable/user_id" className={"w-full  earn-input text-primary text-[32px] font-normal"} />
                    <p className={"w-fit bg-primary px-3 text-sm font-normal text-black rounded-full py-0.5 border border-black button-shadow cursor-pointer"}>SHARE</p>
                </div>
                <p className='mt-12 font-normal text-2xl'>1. config option up to 8 words<br/>
                2. config option up to 8 words<br/>
                3. config option up to 8 words</p>
                <h1 className='text-[58px] text-primary font-normal font-bebas normal-text-shadow text-center leading-none mt-16'>Earn 30% of commission for Life from Every Hand your Recruits Play</h1>
                <p className='text-[36px] font-normal text-primary normal-text-shadow text-center line-through'>Learn More</p>
            </div>
        </div>
    )
}
