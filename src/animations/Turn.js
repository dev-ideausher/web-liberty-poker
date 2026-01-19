import React, { useEffect, useRef } from 'react'
import {motion, useAnimation} from "motion/react"

export default function Turn({children, trigger, user}) {
    const mainControls = useAnimation();
    const viewRef = useRef(null);
    console.log(`${user} has turn ${user}`)
    useEffect(()=>{
        mainControls.start("end")
    }, [trigger, user])
    return (
        <motion.span 
            ref={viewRef}
            variants={{
                start: {width: 0},
                end: {width: "100%"}
            }}
            initial={"start"}
            animate={mainControls}
            transition={{
                duration: 5,
                ease: "linear"
            }}
            onUpdate={(latest) => {
                if (latest.width === "100%") {
                  // Instantly reset to the start state
                  mainControls.set("start");
                }
            }}

            className='absolute top-0 left-0 z-50 h-full w-full' style={{background: "rgba(0,0,0,0.2)"}}
        >
        </motion.span>
    )
}
