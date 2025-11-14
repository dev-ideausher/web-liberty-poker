"use client";
import { cn } from '@/utilities/cn'
import { cva } from 'class-variance-authority'
import React from 'react'

export default function Input({children,variant, invalidmessage,type, className, ...attributes}) {
    return (
        <>
            <input type={type} {...attributes} className={cn(inputVariants({variant, type, className}))} />
            {invalidmessage && <span className="w-full my-1 hidden peer-invalid:block text-danger text-sm">
                {invalidmessage}
            </span>}
        </>
    )
}

const inputVariants = cva("w-full peer focus:outline-none",{
    variants:{
        variant:{
            poker:"toggler-shadow rounded-lg font-jakarta text-base bg-white text-black px-4 py-2 placeholder-shown:text-neutral4",
            earn:"rounded-full text-[32px] bg-white text-black px-4 py-2.5 text-primary placeholder-shown:text-primary font-extralight text-shadow-[0_2px_4px_#000] earn-input",
            pokerlarge:"toggler-shadow rounded-lg font-jakarta text-base bg-white text-black px-4 py-4 placeholder-shown:text-neutral4",
        },
        type:{
            "email": "focus:border-primary focus:border-2",
            "text": "focus:border-primary focus:border-2",
            "password": "focus:border-primary focus:border-2",
            "number": "disable-scroller",
            "date": "focus:border-primary focus:border-2 disable-scroller",
            "time": "focus:border-primary focus:border-2 disable-scroller",
        }
    },
    defaultVariants:{
        variant: "poker",
        type: "email"
    }
})