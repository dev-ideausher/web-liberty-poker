"use client";
import RedCrossSmall from '@/icons/RedCrossSmall'
import Request from '@/icons/Request'
import Silent from '@/icons/Silent'
import Warning from '@/icons/Warning'
import React, { useEffect, useRef } from 'react'

export default function UserInfoModal({ exitHandler, position, reportHandler }) {
    const modalRef = useRef(null);

    const positionObj = {
        "top-right": "top-full right-0",
        "top-left": "top-full left-0",
        "bottom-right": "bottom-full right-0",
        "bottom-left": "bottom-full left-0"
    };
    const handler = () => {
        exitHandler()
        reportHandler()
    }

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
            className={`popup-table w-[415px] py-2 absolute ${positionObj[position]}`}
        >
            <div onClick={exitHandler} className='w-full flex justify-end cursor-pointer px-3'>
                <RedCrossSmall />
            </div>

            <div className='flex items-center gap-5 px-6'>
                <img
                    src="/images/cat.png"
                    alt="pl"
                    className='size-[120px] rounded-full border-[6px] border-[#00000080] relative z-10'
                />

                <div>
                    <h5 className='text-lg font-medium leading-normal uppercase'>
                        NAME: <span className='font-extrabold normal-text-shadow'>THE_HUSTLER</span>
                    </h5>
                    <p className='text-xs font-normal'>invited by : eser303</p>

                    <h5 className='text-lg font-medium leading-normal uppercase'>
                        NET WORTH: <span className='font-extrabold normal-text-shadow'>102.6$</span>
                    </h5>

                    <h5 className='text-lg font-medium leading-normal uppercase'>
                        RANK: <span className='font-extrabold normal-text-shadow'>HUMAN</span>
                    </h5>
                </div>
            </div>

            <div className='mt-3 mb-8 flex items-center justify-between px-8'>
                <div role='button' onClick={handler} className='red-button py-3 px-5 cursor-pointer'><Warning /></div>
                <div role='button' className='green-button py-3 px-5 cursor-pointer'><Request /></div>
                <div role='button' className='blue-button py-3 px-5 cursor-pointer'><Silent /></div>
            </div>
        </div>
    );
}
