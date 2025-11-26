import Button from '@/components/Button'
import React from 'react'

export default function OutofFundsModal({exitHandler}) {
    return (
        <div className='popup-container'>
            <div className='popup w-2/3 p-12 flex flex-col items-center'>
                <h1 className='text-[64px] font-normal font-ruso normal-text-shadow text-center'>Oh no! You&apos;re out of funds.</h1>
                <h3 className='text-[32px] font-normal normal-text-shadow text-center '>Choose Rebuy Amount<br/>
                Min X ___________Max Y</h3>
                <div className='w-full flex items-center justify-center gap-20 mt-12'>
                    <Button variant={"custom"} className={"w-fit text-[40px] font-normal font-ruso p-2 px-12 rounded-[20px] bg-[#600000] border-[#320000] text-[#F4E17EE5]"}>GIVE UP</Button>
                    <Button className={"text-[40px] font-normal font-ruso p-2 w-fit px-5"}>BUY BACK IN</Button>
                </div>
            </div>
        </div>
    )
}
