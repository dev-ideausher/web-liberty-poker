"use client"
import Accordion from '@/components/Accordian'
import Button from '@/components/Button'
import Tabs from '@/components/Tabs'
import HorizontalLine from '@/icons/HorizontalLine'
import HorizontalLineLeft from '@/icons/HorizontalLineLeft'
import Funds from '@/modules/Funds'
import HomeOptions from '@/modules/HomeOptions'
import CheckInput from '@/modules/PrivateTable/CheckInput'
import DurationScheduleInput from '@/modules/PrivateTable/DurationScheduleInput'
import HeadingInput from '@/modules/PrivateTable/HeadingInput'
import PrizeInput from '@/modules/PrivateTable/PrizeInput'
import SimpleTextInput from '@/modules/PrivateTable/SimpletextInput'
import SitSettings from '@/modules/PrivateTable/SitSettings'
import TurnTimeInput from '@/modules/PrivateTable/TurnTimeInput'
import EntranceAmount from '@/modules/Stake/EntranceAmount'
import Link from 'next/link'
import React, { useState } from 'react'

export default function page() {
  const [tab,setTab] = useState("SIT")
  const tabHandler = (val) => setTab(val)

  return (
    <div className="min-h-screen h-full w-full flex bg-fixed bg-[url('/images/banners/banner-sit.png')] flex-col items-center bg-cover bg-center">
        <div className="h-full z-20 layout-container pb-5 flex flex-col items-center">
          <div className='w-full flex items-center justify-between'>
            <Link href="/tournament"><Button variant={"secondary"} className={"w-fit py-4 px-6 text-[32px]"}>TOURNAMENT</Button></Link>
            <h2 className='heading-texts text-[95px] font-cinzel font-black text-center leading-tight'>PRIVAT TABLE</h2>
            <Link href="/sit"><Button variant={"secondary"} className={"w-fit py-4 px-6 text-[32px]"}>SIT & GO</Button></Link>
          </div>
          <Funds className='text-[48px] uppercase font-normal font-ruso heading-texts'/>
          <Tabs handler={tabHandler} />
          {tab == 'SIT' && <div className='w-1/2 grid grid-cols-2 gap-8 mt-6'>
            <HeadingInput title="Blind" firstInput={10} firstText="small" secondText="big" secondInput={50} />
            <HeadingInput title="Players" firstInput={10} firstText="min" secondText="max" secondInput={100} />
          </div>}
          {tab == 'SIT' && <div className='w-full mt-6'>
            <Accordion classes="heading-input w-full" title="Settings">
              <SitSettings/>
            </Accordion> 
          </div>}
          {tab != 'SIT' && <div className='w-full grid grid-cols-4 gap-8 mt-6'>
            <HeadingInput title="Entry Price" firstInput={10} firstText="$"  />
            <HeadingInput title="Blind" firstInput={10} firstText="small" secondText="big" secondInput={50} />
            <HeadingInput title="Starting Jetons" firstInput={10000}  />
            <HeadingInput title="Players" firstInput={10} firstText="min" secondText="max" secondInput={100} />
          </div>}
          {tab != 'SIT' && <div className='w-4/5 mt-6'>
            <Accordion classes="heading-input w-full" title="Advanced Settings" >
              <CheckInput title="ANTE" /> 
              <CheckInput title="BLINDE INCREASE" /> 
              <TurnTimeInput title="TURN TIME" />
              <DurationScheduleInput title="DURATION" firstText="hrs" firstInput={3} secondInput={30} secondText="min" />
              <DurationScheduleInput title="SCHEDULE" inputType='time' firstInput={3} secondInput={30}  />
              <PrizeInput title="PRIZE SPLIT" />
              <SimpleTextInput title="TABLE COST" />
              <SimpleTextInput title="TABLE PROFIT" />
            </Accordion>
          </div>}
          <Link href="/creating-table" className="bg-[url('/images/chip.svg')] bg-cover flex items-center justify-center w-[330px] h-64">
              <p className='text-[40px] w-full font-cinzel font-black text-center leading-none -mt-4'>JOIN<br/> TABLE</p>
          </Link>
          <HomeOptions/>
        </div>
    </div>
  )
}