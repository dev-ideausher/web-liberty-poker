"use client"
import React, { useEffect, useState } from 'react'

export default function Dropdown(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
   
    return (
        <div className='relative w-full'>
            <div onClick={e=>setIsOpen(!isOpen)} className='flex cursor-pointer items-center justify-between border border-white rounded-md px-2'>
                <p className=' text-2xl font-normal text-white'>{selectedOption || props.placeholder}</p>
                <div className={isOpen? 'rotate-180':''}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="8" viewBox="0 0 13 8" fill="none">
                        <path d="M6.5 8L0 1.51351L1.51667 0L6.5 4.97297L11.4833 0L13 1.51351L6.5 8Z" fill="#F1F1F1"/>
                    </svg>
                </div>
            </div>
            {isOpen && <div className='absolute top-10 right-0 z-30 py-2 border border-white rounded-xl w-full'>
                {props.data?.map((item,index)=><p key={index} onClick={e=>setSelectedOption(item)} className=' text-2xl font-normal text-white opacity-70 cursor-pointer hover:text-primary px-4 py-1'>{item}</p>)}
            </div>}
        </div>
    )
}
