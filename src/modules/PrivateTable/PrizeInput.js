"use client"
import React, { useState } from "react"
import InstructionSmall from "@/icons/InstructionSmall"
import Input from "@/components/Input"

export default function PrizeInput({
  title = "Prize Split",
  defaultFirst = 50,
  defaultSecond = 30,
  defaultThird = 20,
}) {
  const [checked, setChecked] = useState(false)

  return (
    <div className="w-full flex items-center  gap-6  px-5">
      {/* Title */}
      <div className="flex items-center gap-4 w-1/3">
        <InstructionSmall />
        <h4 className="text-[27px] font-bold leading-loose">{title}</h4>
      </div>

      {/* Checkbox */}
      <input
        type="checkbox"
        className="size-6 cursor-pointer"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <div
        className={`
          flex items-center gap-3 transition-all duration-300 w-1/2
          ${checked ? "opacity-100 pointer-events-auto" : "opacity-50 pointer-events-none"}
        `}
      >
        {/* 1st */}
        <div className="border border-primary px-3 w-[180px] grid grid-cols-2 rounded-full">
          <p className="text-[22px] font-light">1st</p>
          <div className="flex items-center justify-end border-l border-primary">
            <Input
              type="number"
              className="text-[22px] text-primary font-medium border-none p-0 text-right w-3/4 bg-transparent remove-arrows"
              defaultValue={checked ? 50 : ""}
            />
            <p className="text-[22px] font-medium">%</p>
          </div>
        </div>

        {/* 2nd */}
        <div className="border border-primary px-3 w-[180px] grid grid-cols-2 rounded-full">
          <p className="text-[22px] font-light">2nd</p>
          <div className="flex items-center justify-end border-l border-primary">
            <Input
              type="number"
              className="text-[22px] text-primary font-medium border-none p-0 text-right w-3/4 bg-transparent remove-arrows"
              defaultValue={checked ? 30 : ""}
            />
            <p className="text-[22px] font-medium">%</p>
          </div>
        </div>

        {/* 3rd */}
        <div className="border border-primary px-3 w-[180px] grid grid-cols-2 rounded-full">
          <p className="text-[22px] font-light">3rd</p>
          <div className="flex items-center justify-end border-l border-primary">
            <Input
              type="number"
              className="text-[22px] text-primary font-medium border-none p-0 text-right w-3/4 bg-transparent remove-arrows"
              defaultValue={checked ? 20 : ""}
            />
            <p className="text-[22px] font-medium">%</p>
          </div>
        </div>
      </div>
    </div>
  )
}
