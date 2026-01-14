import Button from '@/components/Button'
import Input from '@/components/Input'
import Inputrange from '@/components/InputRange'
import React, { useEffect, useState } from 'react'
import Poker from '@/hooks/Poker'
export default function Raise({data, closeHandler}) {
    const [amount, setAmount] = useState(data? data.minRaiseAmount: 0);
    const { playerAction} = Poker();
    const raiseAmount = (val) => {
        setAmount(val);
    }
    const raiseStepHandler = (e) => {
        const val = e.target.getAttribute("value");
        setAmount(val);
        playerAction({
            "action": "raise",
            "amount": parseInt(val)
        })
        closeHandler(false)
    }
    const submitHandler = () => {
        playerAction({
            "action": "raise",
            "amount": parseInt(amount)
        })
        closeHandler(false)
    }
    useEffect(()=>{
        if(data){
            setAmount(data.minRaiseAmount)
        }
    }, []);
  return (
    <div className='w-[420px] popup-bg absolute flex flex-wrap justify-center mt-10 rounded-lg px-4 py-3 -top-72 z-50'>
        <div className='relative w-full flex'>
            <button className='absolute right-0 top-0' onClick={() => {
                closeHandler(false)
            }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z" fill="black"/>
                </svg>
            </button>
        </div>
        <h3 className='text-xl font-normal text-black font-worksans capitalize w-full text-center'>Raise</h3>
        <div className='w-full  bg-light-blue p-1.5 rounded-lg text-center font-inter font-medium my-3'>
            {amount} USDT
        </div>

        <Inputrange min={data?data.minRaiseAmount:0} max={data?data.maxRaiseAmount:0} step={1} handler={raiseAmount} />

        <div className='w-full grid grid-cols-4 gap-2 mt-3'>
            {data?.raiseSteps.map((item, index) => <Button value={item.value} variant={"teal"} buttontype={"sm"} className={"rounded-lg"} onClick={raiseStepHandler}>{item.label}</Button> )}
            <Button variant={"primary"} buttontype={"sm"} className={"border-transparent"} onClick={submitHandler}>Submit</Button>
        </div>
        <div className='w-full grid grid-cols-1 gap-5 mt-2'>
        </div>
    </div>
  )
}
