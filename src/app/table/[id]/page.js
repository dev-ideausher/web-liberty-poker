"use client"
import Input from '@/components/Input'
import Back from '@/icons/Back'
import Message from '@/icons/Message'
import SettingsT from '@/icons/SettingsT'
import Up from '@/icons/Up'
import MyPosition from '@/modules/TableModules/MyPosition'
import PlayerPosition from '@/modules/TableModules/PlayerPosition'
import React, { useState } from 'react'

export default function page() {
    const [messageState,setMessageState] = useState('')

    return (
        <div className="w-full bg-[url('/images/banners/match.png')] bg-cover py-2 min-h-screen">
            <div className='layout-container flex flex-col justify-between'>
                <div className='w-full flex items-center justify-between'>
                    <div className='table-btns rounded-lg size-16 flex items-center justify-center'><Back/></div>
                    <div className='table-btns rounded-lg size-16 flex items-center justify-center'><SettingsT/></div>
                </div>
                <div className='relative w-3/4 mx-auto'>
                    <img src="/images/table.svg" alt="table" className=' mx-auto relative z-10' />
                    <div className='top-0 left-0 absolute w-full h-4/5 flex items-center justify-center z-20'>
                        <img src="/images/table-logo.svg" alt="logo" className='w-fit z-20' />
                    </div>
                    <img src="/images/table-border.svg" alt="border" className='absolute h-2/3 w-2/3 top-[13%] left-[17%] rounded-full z-20'></img>
                    <PlayerPosition className="-top-16 right-[12%]" position="top-right" />
                    <PlayerPosition className="top-1/6 -right-10" position="top-right" />
                    <PlayerPosition className="bottom-1/5 -right-10" position="bottom-right" />
                    <PlayerPosition className="-bottom-5 right-[12%]" position="bottom-right" />
                    <MyPosition/>
                    <PlayerPosition className="-top-16 left-[12%]" position="top-left" />
                    <PlayerPosition className="top-1/6 -left-10" position="top-left" />
                    <PlayerPosition className="bottom-1/5 -left-10" position="bottom-left" />
                    <PlayerPosition className="-bottom-5 left-[12%]" position="bottom-left" />
                </div>
                <div className='w-full flex items-center justify-between gap-3 mt-8 relative z-40'>
                    <div className='flex items-center gap-3 w-2/5 justify-between'>
                        {!messageState && <h5 onClick={()=>setMessageState(true)} role='button' className='table-btns py-2 px-5 rounded-[30px] text-[32px] font-normal font-ruso normal-text-shadow min-w-28 flex items-center justify-center'><Message/></h5>}
                        {messageState && <div className='table-btns flex items-center justify-between px-3 py-2 rounded-[30px]'>
                            <Input type="text" placeholder="Text your message" className="bg-transparent border-none text-2xl font-normal text-primary placeholder:text-[#F4E17E80]" />
                            <div onClick={()=>setMessageState(false)} className='cursor-pointer'><Up/></div>
                        </div>}
                        <h5 role='button' className='table-btns py-2 px-5 rounded-[30px] text-[32px] font-normal font-ruso normal-text-shadow'>AWAY</h5>
                    </div>
                    <div className='flex items-center gap-3'>
                        <h5 role='button' className='table-btns py-2 px-4 rounded-[30px] text-[32px] font-normal font-ruso normal-text-shadow'>FOLD</h5>
                        <h5 role='button' className='table-btns py-2 px-4 rounded-[30px] text-[32px] font-normal font-ruso normal-text-shadow'>CHECK</h5>
                        <h5 role='button' className='table-btns py-2 px-4 rounded-[30px] text-[32px] font-normal font-ruso normal-text-shadow min-w-32 text-center'>BET</h5>
                        <h5 role='button' className='table-btns py-2 px-4 rounded-[30px] text-[32px] font-normal font-ruso normal-text-shadow'>RAISE</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}
