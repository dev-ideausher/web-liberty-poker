"use client"
import React, { useState } from 'react'

export default function Tabs({ handler }) {
  const [tab, setTab] = useState("SIT")

  const movePosition = tab === "SIT" ? "left-0" : "left-1/2"

  return (
    <div className="relative tabs-bg grid grid-cols-2 w-1/2 mt-4 overflow-hidden rounded-3xl">

      {/* Sliding highlight background */}
      <div
        className={`absolute top-0 h-full w-1/2 border-2 border-primary rounded-3xl transition-all duration-500 ease-out ${movePosition}`}
      ></div>

      {/* Tabs */}
      <h5
        onClick={() => { setTab("SIT"); handler("SIT") }}
        className={`relative z-10 text-[36px] font-normal font-ruso text-center normal-text-shadow cursor-pointer py-1.5 text-primary`}
      >
        SIT & GO
      </h5>

      <h5
        onClick={() => { setTab("TOURNAMENT"); handler("TOURNAMENT") }}
        className={`relative z-10 text-[36px] font-normal font-ruso text-center normal-text-shadow cursor-pointer py-1.5 text-primary`}
      >
        TOURNAMENT
      </h5>
    </div>
  )
}
