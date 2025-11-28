"use client"
import React, { useState } from "react"
import InstructionSmall from "@/icons/InstructionSmall"
import Input from "@/components/Input"

export default function DurationScheduleInput({
  title,
  inputType = "number", // "number" | "time"
  firstInput = 0,
  secondInput,
  firstText,
  secondText,
}) {
  const [checked, setChecked] = useState(false)

  return (
    <div className="w-full flex items-center gap-6 px-5">
      
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

      {/* Inputs Section */}
      <div
        className={`
          w-1/3 flex items-center gap-2 transition-all duration-300 
          ${checked ? "opacity-100 pointer-events-auto" : "opacity-50 pointer-events-none"}
        `}
      >
        {/* First Input (always visible) */}
        <Input
          type={inputType === "time" ? "time" : "number"}
          defaultValue={checked ? firstInput : ''}
          className="
            border-primary border bg-transparent text-primary
            py-0 px-3 text-[22px] font-normal rounded-full
            text-center remove-arrows max-w-1/2
          "
        />

        {/* First Text */}
        {firstText && <p className="text-[22px] font-light pr-2">{firstText}</p>}

        {/* Second Input (optional) */}
        {secondInput !== undefined && (
          <Input
            type={inputType === "time" ? "date" : "number"}
            defaultValue={checked ? secondInput : ''}
            className="
              border-primary border bg-transparent text-primary
              py-0 px-3 text-[22px] font-normal rounded-full
              text-center remove-arrows max-w-1/2
            "
          />
        )}

        {/* Second Text */}
        {secondText && <p className="text-[22px] font-light">{secondText}</p>}
        
      </div>
    </div>
  )
}
