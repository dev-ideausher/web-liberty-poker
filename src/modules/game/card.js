import React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/utilities/cn'

const faces = {
    Diamond: "/images/game-assets/Diamond.svg",
    Heart: "/images/game-assets/hearts.svg",
    Spade: "/images/game-assets/spades.svg",
    Club: "/images/game-assets/club.svg",
}
export default function Card({face, value, used, open=false,faceValue, variant, className, ...attributes}) {
  return (
    <div className={`gameCard ${cn(cardVariants({variant, className}))} transition-all ${open? "active":""}`}>
        <div className='cardInner w-full h-full'>
            <div className={`cardFront p-1.5 h-full w-full`}>
                <div className={`${used?"border-3 border-success -translate-y-3":""} h-full w-full bg-white rounded flex flex-col flex-wrap items-center justify-between p-1`}>
                    <div className='w-full flex flex-wrap leading-none justify-start'>
                        <h4 className='font-inter text-xs font-semibold'>{faceValue}</h4>
                        <div className='w-full'>
                            <img className='size-2' src={faces[face]} />
                        </div>
                    </div>
                    <img className='size-6' src={faces[face]} />
                    <div className='w-full flex flex-wrap leading-none justify-start rotate-180'>
                        <h4 className='font-inter text-xs font-semibold'>{faceValue}</h4>
                        <div className='w-full flex justify-start'>
                            <img className='size-2' src={faces[face]} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='cardBack flex w-full h-full'>
                <img className='w-full h-full' src={"/images/game-assets/backside.svg"} />
            </div>
        </div>
    </div>
  )
}


const cardVariants = cva("",{
    variants:{
        variant:{
            large:"w-20 h-[108px]",
            small:"w-10 h-16 small-card",
            medium:"w-16 h-24 medium-card"
        }
    },
    defaultVariants:{
        variant: "large"
    }
})