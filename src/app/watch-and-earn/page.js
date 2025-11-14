"use client"
import Button from '@/components/Button'
import Input from '@/components/Input'
import VideoRewardModal from '@/components/VideoRewardModal'
import CircleTickPrimary from '@/icons/CircleTickPrimary'
import GreenTick from '@/icons/GreenTick'
import RedCross from '@/icons/RedCross'
import HomeOptions from '@/modules/HomeOptions'
import React, { useState } from 'react'

export default function page() {
    const [showVideo,setShowVideo] = useState(false)
    const [email,setEmail] = useState("")
    const [isValid,setIsValid] = useState(false)
    const emailHandler = () => {
        const strictEmailRe = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
        if(strictEmailRe.test(String(email))){
            setIsValid(true)
        }else{
            setIsValid(false)
        }
    }
    const showVideoHandler = () => setShowVideo(!showVideo)
    return (
        <div className={`w-full min-h-screen bg-[url('/images/banners/earn.svg')] bg-cover`}>
            <div className='layout-container flex flex-col items-center pb-5 relative'>
                <div className='w-full flex items-center justify-between pt-5'>
                    <h2 className='normal-text-shadow text-[48px] uppercase font-normal font-bebas'>Liberty Poker</h2>
                </div>
                <img src="/images/tv.svg" alt="tv" className={`absolute top-1/4 right-[10%] ${isValid ? '':'opacity-50'}`} />
                <h1 className='text-[70px] font-black text-primary font-cinzel text-primary-shadow text-center leading-none mt-5'>WATCH & EARN 0.3$ CASH REWARD</h1>
                <h3 className='text-[48px] font-ruso font-normal text-primary-shadow text-center'>PLAY FIRST GAME FOR FREE !</h3>
                <div className='w-4/5'>
                    <div className='earn-details mt-16 p-6 pr-10 w-fit'>
                        <div className='flex items-center gap-2'>
                            <CircleTickPrimary/>
                            <p className='text-[32px] font-normal text-primary text-shadow-[0_2px_4px_#000]0_2px_4px_#000'>Play instantly — no deposit</p>
                        </div>
                        <div className='flex items-center gap-2 mt-4'>
                            <CircleTickPrimary/>
                            <p className='text-[32px] font-normal text-primary text-shadow-[0_2px_4px_#000]0_2px_4px_#000'>Game starts in 45s</p>
                        </div>
                        <div className='flex items-center gap-2 mt-4'>
                            <CircleTickPrimary/>
                            <p className='text-[32px] font-normal text-primary text-shadow-[0_2px_4px_#000]0_2px_4px_#000'>Real winnings, zero cost</p>
                        </div>
                        <div className='flex items-center gap-2 mt-4'>
                            <CircleTickPrimary/>
                            <p className='text-[32px] font-normal text-primary text-shadow-[0_2px_4px_#000]0_2px_4px_#000'>Real winnings, zero cost</p>
                        </div>
                    </div>
                </div>
                <div className='flex w-full items-center justify-between mt-24 mb-4'>
                    <div className='flex items-center gap-2'>
                        {isValid ? <GreenTick/> : <RedCross/>}
                        <p className='text-[40px] font-normal text-primary text-shadow-[0_2px_4px_#000]'>Email required:</p>
                    </div>
                    <Input variant={"earn"} className={"w-2/5 px-8"} value={email} onChange={e=>setEmail(e.target.value)} />
                    {!isValid && <Button onClick={emailHandler} className={"w-fit text-[40px] font-ruso font-normal px-6"}>Confirm Email</Button>}
                    {isValid && <Button onClick={showVideoHandler} className={"w-fit text-[40px] font-ruso font-normal px-6"}>Watch & Win</Button>}
                </div>
                <HomeOptions/>
            </div>
            {showVideo && <VideoRewardModal src="/video.mp4" onClose={showVideoHandler} />}
        </div>
    )
}
