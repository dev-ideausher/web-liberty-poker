import Button from '@/components/Button'
import PopupCross from '@/icons/PopupCross'
import React from 'react'
import ContactSupportTeam from '../ContactSupportTeam'

export default function WrongEmailModal({exitHandler}) {
    return (
        <div className='popup-container'>
            <div className='popup w-2/3 p-12 flex flex-col items-center'>
                <div onClick={exitHandler} className='w-full flex justify-end cursor-pointer'><PopupCross/></div>
                <h1 className='text-[64px] font-normal font-ruso normal-text-shadow text-center'>WRONG EMAIL </h1>
                <h3 className='text-[32px] font-normal normal-text-shadow text-center '>Your email is already in use.<br/>To continue, please ...</h3>
                <Button onClick={exitHandler} className={"mt-16 font-ruso text-[40px] font-normal w-fit px-10 py-2 uppercase"}>I understad</Button>
                <ContactSupportTeam/>
            </div>
        </div>
    )
}
