"use client"
import React, { useState } from "react"
import InstructionSmall from "@/icons/InstructionSmall"

export default function TurnTimeInput({ title }) {
    const [checked, setChecked] = useState(false)
    const [selected, setSelected] = useState(null)

    const timeOptions = ["15s", "25s", "35s", "45s"]

    return (
        <div className="w-full flex items-center gap-6 px-5">
            
            {/* Title Section */}
            <div className="flex items-center gap-4 w-1/3">
                <InstructionSmall />
                <h4 className="text-[27px] font-bold">{title}</h4>
            </div>

            {/* Checkbox */}
            <input
                type="checkbox"
                className="size-6 cursor-pointer"
                checked={checked}
                onChange={() => {
                    setChecked(!checked)
                    if (!checked === false) setSelected(null) // reset when unchecked
                }}
            />

            {/* Time Options */}
            <div
                className={`flex items-center gap-6 transition-all duration-300 
                ${checked ? "opacity-100 pointer-events-auto" : "opacity-50 pointer-events-none"}`}
            >
                {timeOptions.map((t, i) => (
                    <label key={i} className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="time_option"
                            value={t}
                            checked={selected === t}
                            onChange={() => setSelected(t)}
                            className="cursor-pointer size-5"
                        />
                        <span className="text-2xl font-normal transition text-primary">{t}</span>
                    </label>
                ))}
            </div>
        </div>
    )
}
