import Button from '@/components/Button'
import HorizontalLine from '@/icons/HorizontalLine'
import HorizontalLineLeft from '@/icons/HorizontalLineLeft'
import Funds from '@/modules/Funds'
import HomeOptions from '@/modules/HomeOptions'
import EntranceAmount from '@/modules/Stake/EntranceAmount'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className="min-h-screen h-full w-full flex bg-[url('/images/banners/banner-sit.png')] flex-col justify-end items-center bg-cover bg-center">
        <div className="h-full z-20 layout-container pb-5 flex flex-col items-center">
            <div className='layout-container flex items-center justify-between'>
                <Link href="/tournament"><Button variant={"secondary"} className={"w-fit py-4 px-6 text-[32px]"}>TOURNAMENT</Button></Link>
                <h2 className='heading-texts text-[95px] font-cinzel font-black text-center leading-loose'>PRIVAT TABLE</h2>
                <Link href="/sit"><Button variant={"secondary"} className={"w-fit py-4 px-6 text-[32px]"}>SIT & GO</Button></Link>
            </div>
            <Funds className='text-[48px] uppercase font-normal font-ruso heading-texts'/>
        </div>
    </div>
  )
}