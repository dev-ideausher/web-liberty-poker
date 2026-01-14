import React, { useEffect, useState } from 'react'

export default function Timer({count, callback}) {
    const [counter, setCounter] = useState(count);
    useEffect(()=>{
        const interval = setInterval(()=>{
            setCounter(prev => prev>0?prev - 1:0);
        },1000)
        return () => {
            clearInterval(interval);
        }
    },[counter])
    return (
        <>{counter}</>
    )
}
