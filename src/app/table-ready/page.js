import DayTimer from '@/components/DayTimer'
import Book from '@/icons/Book'
import React from 'react'

export default function page() {
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

                <h1 className="text-[80px] text-primary font-black font-cinzel glow-shadow text-center leading-none">
                    YOUR TABLE IS READY
                </h1>

                <h2 className="text-[32px] font-normal font-ruso text-center leading-[110%] mt-1 glow-shadow">
                Your private table was configured with the following
                </h2>
                <div className='mt-16 flex items-center justify-center gap-10'>
                    <div className='flex items-center gap-4 earn-input py-3.5 px-8'>
                        <h4 className='text-[32px] font-bold text-primary normal-text-shadow'>CHECK RULES</h4>
                        <Book/>
                    </div>
                    <div className=''>
                        <p className='text-2xl font-normal text-primary'>Game will start automatically in</p>
                        <DayTimer minutes={1500} />
                        <p className='text-2xl font-normal text-primary'>With players on the link</p>
                    </div>
                </div>
                <h1 className='text-[58px] text-primary font-normal font-bebas normal-text-shadow text-center leading-none mt-7'>Earn 30% of commission for Life from Every Hand your Recruits Play</h1>
                <p className='text-[36px] font-normal text-primary normal-text-shadow text-center line-through'>Learn More</p>
            </div>
        </div>
    )
}
