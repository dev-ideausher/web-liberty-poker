"use client"
import Button from '@/components/Button'
import ProgressLoader from '@/components/ProgressLoader'
import Book from '@/icons/Book'
import Envelop from '@/icons/Envelop'
import Reward from '@/icons/Reward'
import ShareLarge from '@/icons/ShareLarge'
import UserCircle from '@/icons/UserCircle'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function page() {
    const router = useRouter()
    const [joined,setJoined] = useState(false)
    useEffect(()=>{
        setTimeout(()=>{
            setJoined(true)
        },5000)
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
                <h2 className="normal-text-shadow text-[48px] uppercase font-normal font-bebas py-5 w-full">
                    Liberty Poker
                </h2>
                <div className='w-full grid grid-cols-2'>
                    <div className=''>
                        <div className='size-[420px] rounded-full bg-[#000000BF] p-3 relative z-10'>
                            <img src="/images/cat.png" alt="cat" className='w-full rounded-full' />
                        </div>
                        <div className='size-[420px] rounded-full bg-[#000000BF] p-3 -mt-48 relative z-20 ml-auto'>
                            {joined && <img src="/images/dog.png" alt="cat" className='w-full rounded-full' />}
                        </div>
                    </div>
                    <div className='px-10'>
                        <h1 className="text-[78px] text-primary font-normal font-bebas text-center leading-none mt-5">
                            We Prepred Your Table
                        </h1>
                        <div className='w-full flex items-center justify-between mt-5'>
                            <img src="/images/qr.png" alt="qr" className='w-1/3' />
                            <div>
                                <div className='flex items-center gap-7'>
                                    <Reward/>
                                    <h4 className='text-[40px] font-normal text-primary normal-text-shadow'>1/2</h4>
                                </div>
                                <div className='flex items-center gap-7 mt-3'>
                                    <UserCircle/>
                                    <h4 className='text-[40px] font-normal text-primary normal-text-shadow'>2/2</h4>
                                </div>
                                <div className='flex items-center gap-7 mt-3'>
                                    <Envelop/>
                                    <h4 className='text-[40px] font-normal text-primary normal-text-shadow'>1/2</h4>
                                </div>
                            </div>
                            <ShareLarge/>
                        </div>
                        <div className='flex w-fit items-center justify-center gap-4 earn-input py-3.5 px-8 my-7 mx-auto'>
                            <h4 className='text-[32px] font-bold text-primary normal-text-shadow'>CHECK RULES</h4>
                            <Book/>
                        </div>
                        <p className='text-2xl font-normal text-center text-primary'>Reserved for 15 minutes & 59 seconds</p>
                        <ProgressLoader className={"w-4/5 mx-auto"} />
                        <Button onClick={()=>router.push("/table/doc_12345")} disabled={!joined} className={`mt-10 text-[40px] font-normal font-ruso rounded-full mx-auto w-1/2 ${joined ? '':'opacity-50'}`}>Start</Button>
                    </div>
                </div>
                <h3 className='text-[58px] text-primary font-normal font-bebas normal-text-shadow text-center leading-none mt-16'>Earn 33% for life from every hand your invitees play forever</h3>
                <p className='text-[36px] font-normal text-primary normal-text-shadow text-center line-through'>Learn More</p>
            </div>
        </div>
    )
}
