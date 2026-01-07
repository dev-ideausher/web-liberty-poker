"use client"
import Exit from '@/icons/Exit'
import Info from '@/icons/Info'
import Send from '@/icons/Send'
import Settings from '@/icons/Settings'
import User from '@/icons/User'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import LoginModule from './LoginModule'
import { getAuthToken } from '@/utilities/helper'
import { removeToken, removeUserName } from '@/services/cookies'
import {  useDisconnect } from "wagmi";

export default function HomeOptions({className}) {
  const { disconnect } = useDisconnect();
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    // initial check
    if (getAuthToken()) {
      setLoggedIn(true)
    }
  }, [])
  return (
    <div className={`flex relative items-center dark-gradient justify-between w-96 px-10 py-5 gap-5 mt-10 shadow-[0_2px_32px_5px_rgba(0, 0, 0, 0.50)]`}>
      <Send/>
      {loggedIn ?  <div  className='red-gradient cursor-pointer left-[35%] flex items-center justify-center absolute size-[120px] rounded-full  flex-col'>
        <div onClick={() => {
          disconnect();
          setOnboardingComplete(false);
          removeToken()
          removeUserName()
        }}><Exit/></div>
           
        </div>
      :
      <LoginModule setLoggedIn={setLoggedIn} />}
      <Info/>        
    </div>
  )
}
