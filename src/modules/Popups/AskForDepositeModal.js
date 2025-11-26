import Button from '@/components/Button'
import PopupCross from '@/icons/PopupCross'
import Link from 'next/link'
import React from 'react'

export default function AskForDepositeModal({exitHandler}) {
    return (
        <div className='popup-container'>
            <div className='popup w-2/5 p-12 flex flex-col items-center'>
                <div onClick={exitHandler} className='w-full flex justify-end cursor-pointer'><PopupCross/></div>
                <h3 className='text-[32px] mt-5 font-normal normal-text-shadow text-center leading-[125%]'>we see you didnt yet deposited and eliable for a deposit promotion. to play this tier either deposit & promote or by playing the your tier another xxx hands or </h3>
                <Link href="/choose-rank"><Button className={"mt-12 font-ruso text-[40px] font-normal w-fit px-10 py-2 uppercase"}>Deposite</Button></Link>
            </div>
        </div>
    )
}
