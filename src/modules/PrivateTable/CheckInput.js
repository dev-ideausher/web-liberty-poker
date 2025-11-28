"use client"
import Input from '@/components/Input'
import InstructionSmall from '@/icons/InstructionSmall'
import React, { useState } from 'react'

export default function CheckInput({ title }) {
    const [checked, setChecked] = useState(false)

    return (
        <div className='w-full flex items-center gap-6 px-5'>
            <div className="flex items-center gap-4 w-1/3">
                <InstructionSmall />
                <h4 className='text-[27px] font-bold leading-loose'>{title}</h4>
            </div>

            {/* Checkbox */}
            <input
                type="checkbox"
                className='size-6 cursor-pointer'
                checked={checked}
                onChange={() => setChecked(!checked)}
            />

            {/* Numbers Div */}
            <div
                className={`w-1/3 border border-primary rounded-full grid grid-cols-2 px-2 transition-all duration-300 
                ${checked ? "opacity-100 pointer-events-auto" : "opacity-30 pointer-events-none"}`}
            >
                <div className='flex items-center justify-between px-2'>
                    <p className='text-2xl font-extralight text-primary'>rasied</p>
                    <Input
                        type="number"
                        className="w-1/3 text-right border-none outline-none text-2xl font-normal text-primary bg-transparent remove-arrows p-0"
                        defaultValue={checked ? 30 :''}
                    />
                </div>
                <div className='flex items-center justify-between border-l border-primary px-3'>
                    <p className='text-2xl font-extralight text-primary'>each</p>
                    <Input
                        type="number"
                        className="w-1/3 text-right border-none outline-none text-2xl font-normal text-primary bg-transparent remove-arrows p-0"
                        defaultValue={checked ? 3 : ''}
                    />
                </div>
            </div>

            {/* Radio Buttons Div */}
            <div
                className={`flex items-center gap-6 transition-all duration-300 
                ${checked ? "opacity-100 pointer-events-auto" : "opacity-30 pointer-events-none"}`}
            >
                <div className="flex items-center gap-2">
                    <input
                        type="radio"
                        id="password"
                        name="invitation"
                        value="password"
                        className="cursor-pointer size-5"
                    />
                    <label htmlFor="password" className="text-2xl font-normal cursor-pointer transition text-primary">
                        Minutes
                    </label>
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="radio"
                        id="hands"
                        name="invitation"
                        value="hands"
                        className="cursor-pointer size-5"
                    />
                    <label htmlFor="hands" className="text-2xl font-normal cursor-pointer transition text-primary">
                        Hands
                    </label>
                </div>
            </div>
        </div>
    )
}
