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
                <Link href="/sit"><Button variant={"secondary"} className={"w-fit py-4 px-6 text-[32px]"}>SIT & GO</Button></Link>
                <h2 className='heading-texts text-[90px] font-cinzel font-black text-center leading-loose'>TOURNAMENT</h2>
                <Link href="/private-table"><Button variant={"secondary"} className={"w-fit py-4 px-3 text-[32px]"}>PRIVATE TABLE</Button></Link>
            </div>
            <Funds className='text-[48px] uppercase font-normal font-ruso heading-texts'/>
            <div className='flex items-center justify-center gap-5 mt-12'>
                <HorizontalLine/>
                <h3 className='text-[55px] normal-text-shadow uppercase font-normal font-ruso'>ENTRANCE AMOUNTS</h3>
                <HorizontalLineLeft/>
            </div>
            <div className="w-full pt-5 mt-7 flex gap-7 overflow-x-auto px-1 hide-scrollbar py-2 min-h-32">
                <EntranceAmount 
                    title="0.01 Small - 0.3 Big $" 
                    amount={[
                    "0.01 - 0.02 $",
                    "0.03 - 0.05 $",
                    "0.06 - 0.10 $",
                    "0.11 - 0.20 $",
                    // "0.21 - 0.30 $"
                    ]} 
                    free={true}
                    joined={true}
                    timer={true}
                />
                <EntranceAmount 
                    title="0.31 Small - 0.6 Big $" 
                    amount={[
                    "0.31 - 0.35 $",
                    "0.36 - 0.40 $",
                    "0.41 - 0.45 $",
                    "0.46 - 0.50 $",
                    // "0.51 - 0.60 $"
                    ]} 
                    locked={true}
                    timer={true}
                />
                <EntranceAmount 
                    title="0.61 Small - 0.8 Big $" 
                    amount={[
                    "0.61 - 0.65 $",
                    "0.66 - 0.70 $",
                    "0.71 - 0.75 $",
                    "0.76 - 0.80 $"
                    ]} 
                    locked={true}
                    timer={true}
                />
                <EntranceAmount 
                    title="0.81 Small - 1 Big $" 
                    amount={[
                    "0.81 - 0.85 $",
                    "0.86 - 0.90 $",
                    "0.91 - 0.95 $",
                    "0.96 - 1.00 $"
                    ]} 
                    locked={true}
                    timer={true}
                />
                <EntranceAmount 
                    title="1.01 Small - 1.2 Big $" 
                    amount={[
                    "1.01 - 1.05 $",
                    "1.06 - 1.10 $",
                    "1.11 - 1.15 $",
                    "1.16 - 1.20 $"
                    ]} 
                    locked={true}
                    timer={true}
                />
            </div>
            <Link href="/watch-and-earn" className="bg-[url('/images/chip.svg')] bg-cover flex items-center justify-center w-[330px] h-64 mt-10">
                <p className='text-[40px] w-full font-cinzel font-black text-center leading-none -mt-4'>JOIN<br/> TABLE</p>
            </Link>
            <HomeOptions/>
        </div>
    </div>
  )
}
