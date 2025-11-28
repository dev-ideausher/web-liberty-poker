import DownArrow from '@/icons/DownArrow';
import React, { useState, useRef } from 'react';

export default function Accordion(props) {
    
    const [show, setShow] = useState(props.show ? props.show : false);
    const contentRef = useRef(null); // Ref to measure content height

    const toggleAccordion = () => {
        setShow(!show);
    };
    return (
        <div
            className={`${props.classes} overflow-hidden transition-all duration-300 ease-linear`}
        >
            {/* Accordion Header */}
            <div
                onClick={toggleAccordion}
                className="flex items-center justify-between w-full cursor-pointer px-5 py-2"
            >
                <h2 className='text-[36px] font-normal text-primary font-ruso'>{props.title}</h2>
                <div
                    className={`transform transition-transform duration-300 flex items-center ${
                        !show ? 'rotate-0' : 'rotate-180'
                    }`}
                >
                    <DownArrow/>
                </div>
            </div>

            {/* Accordion Content */}
            <div
                ref={contentRef}
                className="transition-all duration-300 ease-linear overflow-hidden"
                style={{
                    maxHeight: show ? `${contentRef?.current?.scrollHeight}px` : '0px',
                }}
            >
                <div className='pb-4'>{props.children}</div>
            </div>
        </div>
    );
}
