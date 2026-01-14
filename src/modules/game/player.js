import React, { Fragment, useRef } from 'react'
import Card from './card'
import { BounceLoader } from 'react-spinners';
import Turn from '@/animations/Turn';
import { calculateCoins } from '@/utilities/helper';
import StackCoins from '@/components/StackCoins';

export default function Player({player, position, hasTurn, playerTurn, meter, isSmallBlind,isBigBlind, isDealer, badgePosition, cardsposition, ownView=false, status, index, myposition, children}) {
    const playerRef = useRef(null);
    const opacity = {
        "waiting": "opacity-35",
        "folded": "opacity-50",
        "all-in": "opacity-70",
    }
    return (
        <>
            <div style={{top: `${position.top}`, left: `${position.left}`}} className={`${hasTurn?"animate":""} absolute z-50 flex flex-wrap items-center justify-center`}>
                <div className={`w-full flex flex-col items-center justify-center ${opacity[status]} relative`}>
                    {/* When user has not his/her turn */}
                    {hasTurn && !ownView && <div className='absolute z-0' style={{top: "-13px", zIndex:"-1"}}>
                        <BounceLoader size={"90px"} color='#fff' />
                    </div>}

                    {/* Showing avatar when user is waiting/Folded */}
                    <div className="size-16">
                        {(!ownView || status=="waiting" || status=="folded") && <img src="/images/coin.png" className={`rounded-full size-16 border-4  ${hasTurn?"border-success":"border-white"}`} />}
                    </div>

                    {/* Showing Badge */}
                    <div className='flex flex-wrap flex-col relative items-center justify-center py-1 px-3 w-[100px] overflow-hidden rounded-md -mt-2.5' title={`${player.user.username}`} style={{zIndex: "999",background: hasTurn?"#2ED777":"linear-gradient(180deg, #FF9E57 0%, #FF8C43 54.39%, #FF7C33 100%)"}}>
                        {hasTurn && <Turn trigger={hasTurn} user={player.user.username}>
                        </Turn>}
                        <h5 className='text-white text-xs font-inter font-normal capitalize w-full text-center truncate'>{myposition} {`${player.user.username}`}</h5>
                        <h4 className='font-inter text-sm text-white font-semibold w-fit text-center'>{player.chipsInPlay}</h4>

                        {/* <div className='flex items-center gap-x-3'>
                            <h4 className='font-inter text-sm text-white font-semibold w-fit text-center'>{player.chipsInPlay}</h4>
                            <div className='grid grid-cols-4'>
                                {calculateCoins(player.chipsInPlay).map((coin, index) => (
                                    <div key={index} className={`flex flex-col -ml-3 -mt-2`}>
                                        {Array.from({ length: coin.count }, (_, index) => (
                                            <Fragment key={index}>
                                                <StackCoins index={index} total={coin.count} coinValue={coin.text} />
                                            </Fragment>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div> */}
                    </div>
                </div>

                {/* Showing user cards */}
                {!(status == "waiting" || status == "folded") && <>
                    {!ownView ? <div className='relative'>
                        <div className={`absolute `} style={cardsposition=="right"?{top: "-60px", left: "-15px"}:{top: "-60px", left: "-140px"}}>
                            <div className='w-12 h-20'>
                                {children}
                            </div>
                        </div>
                    </div>
                    :
                    <div className='relative'>
                        <div className='absolute ownCards' style={cardsposition=="right"?{top: "-60px", left: "-15px"}:cardsposition=="left"?{top: "-60px", left: "-140px"}:{top: "-75px", left: "-110px"}}>
                            <div className='w-12 h-20'>
                                {children}
                            </div>
                        </div>
                    </div>
                    }
                </>}

                {/* Showing winning meter */}
                {meter && ownView && <div className='text-white bottom-0 right-0 flex flex-wrap w-[220px] absolute' style={{right: "-55%", bottom:"-15px"}}>
                    {/* <div className='bg-black py-0.5 pl-2 rounded-full w-full flex flex-wrap items-center relative'>
                        <span className='text-white text-sm font-inter'>{`winning chance ${meter.probability}`}</span>
                        <span className='size-7 border-2 bg-[#3C3D44] border-white rounded-full absolute right-0 flex items-center justify-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M4.85547 17.5L6.20964 11.6458L1.66797 7.70832L7.66797 7.18749L10.0013 1.66666L12.3346 7.18749L18.3346 7.70832L13.793 11.6458L15.1471 17.5L10.0013 14.3958L4.85547 17.5Z" fill="white"/>
                            </svg>
                        </span>
                    </div> */}
                    <div className='w-full relative bg-[rgba(0,0,0,0.25)] border border-[#ECF0F1] h-3 rounded-full mt-3 grid grid-cols-8 gap-0.5 items-center justify-center px-0.5'>
                        <div className={`${parseFloat(meter.probability)>0 &&'bg-[#FF4A11]'} h-1.5 rounded`}>
                        </div>
                        <div className={`${parseFloat(meter.probability)>12.5 && 'bg-[#FF4A11]'} h-1.5 rounded`}>
                        </div>
                        <div className={`${parseFloat(meter.probability)>25 &&'bg-[#FFF500]'} h-1.5 rounded`}>
                        </div>
                        <div className={`${parseFloat(meter.probability)>37.5 &&'bg-[#FFF500]'} h-1.5 rounded`}>
                        </div>
                        <div className={`${parseFloat(meter.probability)>50 &&'bg-[#FFF500]'} h-1.5 rounded`}>
                        </div>
                        <div className={`${parseFloat(meter.probability)>62.5 &&'bg-[#FFF500]'} h-1.5 rounded`}>
                        </div>
                        <div className={`${parseFloat(meter.probability)>75 &&'bg-[#00D455]'} h-1.5 rounded`}>
                        </div>
                        <div className={`${parseFloat(meter.probability)>87.5 &&'bg-[#00D455]'} h-1.5 rounded`}>
                        </div>
                    </div>
                </div>}
            </div>

            {/* Dealer, small blind, big blind chips */}
            {isDealer && isDealer.player._id == player._id && <div style={{top: `${badgePosition.top}`, left: `${badgePosition.left}`}} className={`absolute flex flex-wrap items-center justify-center`}>
                <svg className='size-6' width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2.25" y="1.25" width="27.5" height="27.5" rx="13.75" fill="white"/>
                    <rect x="2.25" y="1.25" width="27.5" height="27.5" rx="13.75" stroke="white" strokeWidth="0.5"/>
                    <path d="M15.0455 21H11.2784V9.36364H15.1648C16.3049 9.36364 17.2841 9.59659 18.1023 10.0625C18.9205 10.5246 19.5473 11.1894 19.983 12.0568C20.4223 12.9205 20.642 13.9564 20.642 15.1648C20.642 16.3769 20.4205 17.4186 19.9773 18.2898C19.5379 19.161 18.9015 19.8314 18.0682 20.3011C17.2348 20.767 16.2273 21 15.0455 21ZM13.0341 19.4659H14.9489C15.8352 19.4659 16.572 19.2992 17.1591 18.9659C17.7462 18.6288 18.1856 18.142 18.4773 17.5057C18.7689 16.8655 18.9148 16.0852 18.9148 15.1648C18.9148 14.2519 18.7689 13.4773 18.4773 12.8409C18.1894 12.2045 17.7595 11.7216 17.1875 11.392C16.6155 11.0625 15.9053 10.8977 15.0568 10.8977H13.0341V19.4659Z" fill="white"/>
                    <rect x="0.25" y="0.25" width="27.5" height="27.5" rx="13.75" fill="#E39A08"/>
                    <rect x="0.25" y="0.25" width="27.5" height="27.5" rx="13.75" stroke="#242529" strokeWidth="0.5"/>
                    <path d="M13.0455 20H9.27841V8.36364H13.1648C14.3049 8.36364 15.2841 8.59659 16.1023 9.0625C16.9205 9.52462 17.5473 10.1894 17.983 11.0568C18.4223 11.9205 18.642 12.9564 18.642 14.1648C18.642 15.3769 18.4205 16.4186 17.9773 17.2898C17.5379 18.161 16.9015 18.8314 16.0682 19.3011C15.2348 19.767 14.2273 20 13.0455 20ZM11.0341 18.4659H12.9489C13.8352 18.4659 14.572 18.2992 15.1591 17.9659C15.7462 17.6288 16.1856 17.142 16.4773 16.5057C16.7689 15.8655 16.9148 15.0852 16.9148 14.1648C16.9148 13.2519 16.7689 12.4773 16.4773 11.8409C16.1894 11.2045 15.7595 10.7216 15.1875 10.392C14.6155 10.0625 13.9053 9.89773 13.0568 9.89773H11.0341V18.4659Z" fill="white"/>
                </svg>

            </div>}

            {isSmallBlind && isSmallBlind.player._id == player._id && <div style={{top: `${badgePosition.top}`, left: `${badgePosition.left}`}} className={`absolute flex flex-wrap items-center justify-center`}>
                <img className='size-6' src={"/images/small-blind.svg"} alt="Small Blind icon" />
            </div>}
            
            {isBigBlind && isBigBlind.player._id == player._id && <div style={{top: `${badgePosition.top}`, left: `${badgePosition.left}`}} className={`absolute flex flex-wrap items-center justify-center`}>
                <img className='size-6' src={"/images/big-blind.svg"} alt="Big Blind icon" />
            </div>}
        </>
    )
}
