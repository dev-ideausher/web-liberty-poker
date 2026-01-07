"use client"

import React, { useEffect, useState } from "react"
import Subheader from "./Subheader"
import { getAuthToken } from "@/utilities/helper"

export default function HomeHeader() {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    // initial check
    if (getAuthToken()) {
      setLoggedIn(true)
      return
    }

    // poll every 5 seconds if not logged in
    const intervalId = setInterval(() => {
      if (getAuthToken()) {
        setLoggedIn(true)
        clearInterval(intervalId)
      }
    }, 5000)

    // cleanup on unmount
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="layout-container flex items-center justify-between pt-5 relative z-20">
      <h2 className="normal-text-shadow text-[48px] uppercase font-normal font-bebas">
        Liberty Poker
      </h2>

      {loggedIn && <Subheader />}
      {/* <Funds /> */}
    </div>
  )
}
