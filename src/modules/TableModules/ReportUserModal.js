"use client";
import Button from '@/components/Button';
import RedCrossSmall from '@/icons/RedCrossSmall'
import React, { useEffect, useRef } from 'react'

export default function ReportUserModal({exitHandler, position}) {
    const modalRef = useRef(null);

    const positionObj = {
        "top-right": "top-full right-0",
        "top-left": "top-full left-0",
        "bottom-right": "bottom-full right-0",
        "bottom-left": "bottom-full left-0"
    };

    // Auto-close on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                exitHandler(); // close modal
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [exitHandler]);

    return (
        <div
            ref={modalRef}
            className={`popup-table w-[415px] py-2 flex flex-col items-center absolute ${positionObj[position]}`}
        >
            <div onClick={exitHandler} className='w-full flex justify-end cursor-pointer px-3'>
                <RedCrossSmall />
            </div>
            <div className='px-5 w-full'>
                <h2 className='text-[40px] text-primary font-cinzel font-black heading-texts text-center'>REPORT</h2>
                <textarea rows="5" className='border border-[#f4e07ebf] rounded-xl p-2 resize-none outline-none w-full text-xl font-medium normal-text-shadow' />
            </div>
            <Button className="text-[22px] font-normal font-ruso normal-text-shadow w-fit mt-5 px-5">Submit</Button>
        </div>
    )
}
