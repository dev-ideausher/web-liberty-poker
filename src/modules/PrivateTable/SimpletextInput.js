"use client"
import React from "react"
import InstructionSmall from "@/icons/InstructionSmall"
import Input from "@/components/Input"

export default function SimpleTextInput({
  title,
  inputType = "number",
  defaultValue = 50,
  trailingText = "$", // % or Min or Days etc
}) {
  return (
    <div className="w-full flex items-center gap-6 px-5">

      {/* Icon + Title */}
      <div className="flex items-center gap-4 w-1/3">
        <InstructionSmall />
        <h4 className="text-[27px] font-bold leading-loose">{title}</h4>
      </div>
        <div className="size-6"></div>
      {/* Input + Text */}
      <div className="flex items-center w-1/6 gap-2">
        <Input
          type={inputType}
          defaultValue={defaultValue}
          className="
            border-primary border bg-transparent text-primary
            py-0 px-3 text-[22px] font-normal rounded-full
            text-center remove-arrows w-24
          "
        />
        {trailingText && (
          <p className="text-[22px] font-light">{trailingText}</p>
        )}
      </div>
    </div>
  )
}
