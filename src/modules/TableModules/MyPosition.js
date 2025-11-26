import React from 'react'

export default function MyPosition() {
    return (
        <div className='absolute left-0 -bottom-28 w-full z-20'>
            <img src="/images/dog.png" alt="pl" className='size-[170px] rounded-full border-10 border-[#00000080] relative z-10 mx-auto' />
            <h4 className='text-[50px] leading-none font-normal font-ruso normal-text-shadow text-center'>$4,500</h4>
            <p className='text-base font-normal text-primary text-center'>CHIP COUNT</p>
        </div>
    )
}
