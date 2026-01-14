import React from 'react'
import Timer from './Timer';

export default function Rebuy(expiry) {
    return (
      <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.7)]">
        
  
        {/* Winner Screen content */}
        <div className="w-full flex flex-wrap  items-center justify-center max-w-[662px] bg-black p-10 rounded-3xl">
            
            <h2 className='text-primary text-3xl font-bold w-full text-center mb-3'>Insufficient Funds</h2>
            <span className='text-white text-xl font-medium text-center  w-full '>
                User funds has been over. You have to re-buy the funds. Please check the metamask popup.
            </span>

            <div className='flex items-center mt-2'>
                <span className='text-white text-xl w-full flex flex-wrap  items-center justify-center font-bold gap-3'>
                    Please Re-buy in 
                </span>
                <span className='ml-2 text-xl font-bold text-primary'>
                    <Timer count={120} callback={()=>{}} />
                </span>
            </div>
        </div>
      </div>
    );
}
