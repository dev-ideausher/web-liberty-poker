import React, { useRef, useState } from 'react'
import Button from './Button';

export default function Inputrange({min, max, step, handler}) {
    const rangeRef = useRef(null);
    const [value, setValue] = useState(min);
    function updateRangeFill() {
        if(rangeRef.current){
            const value = (rangeRef.current.value - rangeRef.current.min) / (rangeRef.current.max - rangeRef.current.min) * 100;
            rangeRef.current.style.background = `linear-gradient(to right, #4CAF50 ${value}%, #ddd ${value}%)`;
        }
        setValue(rangeRef.current.value);
        handler(rangeRef.current.value);
    }
    const incrementHandler = () => {
        if(rangeRef.current){
            rangeRef.current.value = parseInt(rangeRef.current.value) + parseInt(step);
        }
        setValue(rangeRef.current.value);
        handler(rangeRef.current.value);
    }
    const decrementHandler = () => {
        if(rangeRef.current){
            rangeRef.current.value = parseInt(rangeRef.current.value)>0? parseInt(rangeRef.current.value) - parseInt(step):0;
        }
        setValue(rangeRef.current.value);
        handler(rangeRef.current.value);
    }

    return (
        <>
            <div className='w-full flex gap-5 justify-between items-center mt-4'>
                <div>
                    <Button variant="primary" onClick={decrementHandler} className="p-1">
                        <svg className='scale-75' xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
                            <path d="M25.334 15.1667H6.66732C6.3137 15.1667 5.97456 15.3072 5.72451 15.5572C5.47446 15.8073 5.33398 16.1464 5.33398 16.5C5.33398 16.8536 5.47446 17.1928 5.72451 17.4428C5.97456 17.6929 6.3137 17.8334 6.66732 17.8334H25.334C25.6876 17.8334 26.0267 17.6929 26.2768 17.4428C26.5268 17.1928 26.6673 16.8536 26.6673 16.5C26.6673 16.1464 26.5268 15.8073 26.2768 15.5572C26.0267 15.3072 25.6876 15.1667 25.334 15.1667Z" fill="#FFFFFF"/>
                        </svg>
                    </Button>
                </div>

                <input type="range" ref={rangeRef} defaultValue={min} name="stake-range" min={min} max={max} step={step} onChange={updateRangeFill}></input>

                <div>
                    <Button variant="primary" onClick={incrementHandler} className="p-1">
                        <svg className='scale-75' xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
                            <path d="M25.334 15.1666H17.334V7.16665C17.334 6.81302 17.1935 6.47389 16.9435 6.22384C16.6934 5.97379 16.3543 5.83331 16.0007 5.83331C15.647 5.83331 15.3079 5.97379 15.0578 6.22384C14.8078 6.47389 14.6673 6.81302 14.6673 7.16665V15.1666H6.66732C6.3137 15.1666 5.97456 15.3071 5.72451 15.5572C5.47446 15.8072 5.33398 16.1464 5.33398 16.5C5.33398 16.8536 5.47446 17.1927 5.72451 17.4428C5.97456 17.6928 6.3137 17.8333 6.66732 17.8333H14.6673V25.8333C14.6673 26.1869 14.8078 26.5261 15.0578 26.7761C15.3079 27.0262 15.647 27.1666 16.0007 27.1666C16.3543 27.1666 16.6934 27.0262 16.9435 26.7761C17.1935 26.5261 17.334 26.1869 17.334 25.8333V17.8333H25.334C25.6876 17.8333 26.0267 17.6928 26.2768 17.4428C26.5268 17.1927 26.6673 16.8536 26.6673 16.5C26.6673 16.1464 26.5268 15.8072 26.2768 15.5572C26.0267 15.3071 25.6876 15.1666 25.334 15.1666Z" fill="white"/>
                        </svg>
                    </Button>
                </div>
            </div>
        </>
    )
}
