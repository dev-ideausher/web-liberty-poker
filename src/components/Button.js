import React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/utilities/cn'

export default function Button({children,variant, buttontype,size, className, disabled=false, loading=false, ...attributes}) {
  return (
    <button className={cn(buttonVariants({variant,buttontype,size,className}),(loading || disabled)?"cursor-not-allowed opacity-50":"")} disabled={(loading || disabled)?true:false} {...attributes}>
        {children}

        {loading && <svg className='animate-spin ml-2' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18.364 5.63604L16.9497 7.05025C15.683 5.7835 13.933 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12H21C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C14.4853 3 16.7353 4.00736 18.364 5.63604Z" fill="white"/>
        </svg>}
    </button>
  )
}

const buttonVariants = cva("flex items-center justify-center rounded-lg font-inter leading-snug font-semibold hover:-translate-y-1 origin-center transition-all ease-in-out",{
    variants:{
        variant:{
            primary:"border-shadow bg-primary text-white",
            secondary: "secondary-border-shadow bg-secondary text-white",
            "gradient": "btn-primary rounded-full",
            "icon": "rounded-2xl bg-teal teal-shadow border-2 border-[#01796F]",
            teal: "bg-[#01796F] rounded-full teal-button-shadow border border-[#01796fbd] text-white",
            "white": "bg-white text-white toggler-shadow",
            'white-teal':'bg-white text-teal'
        },
        buttontype:{
            sm: "text-sm px-2 py-2",
            md: "text-base px-4 py-3",
            lg: "text-lg px-4 py-3",
            submit: "text-base px-4 py-3",
            icon: "p-4"
        },
        size:{
            fw:"w-full",
            cw: "w-max"
        }
    },
    defaultVariants:{
        variant: "primary",
        buttontype: "md",
        size: "fw"
    }
})