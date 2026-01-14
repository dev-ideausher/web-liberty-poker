import React from 'react'
import Card from '../game/card'

export default function WinningPlayer({player}) {
  return (
    <div className='w-full flex relative items-center justify-between rounded-l-xl bg-[rgba(255,255,255,0.15)] mb-5 pr-0'>
        {/* <div className='w-5/12 flex items-center'>
            <img src="/images/avatar.png" className='size-28 rounded-full -ml-10' />
            <span className='text-white font-inter text-lg font-light ml-10'>{player.username}</span>
        </div> */}
        <div className="w-3/12 flex items-center">
            <img src="/images/avatar.png" className="size-28 rounded-full -ml-10" />
            <span className="text-white font-inter text-lg font-light ml-10"
                >{player.username}</span
            >
            </div>

        <div className="w-2/12 text-center">
            <span className="text-white font-inter text-lg font-bold"
                >{player.winningHand}</span
            >
        </div>
        <div className='w-2/12 flex flex-wrap'>
            {player.cards && player.cards.holeCards &&  player.cards.holeCards.map((item, index) => <Card
                    key={`player-card-${index}`} 
                    face={item.suit} 
                    value={item.value} 
                    faceValue={item.cardFace}
                    used={item.used} 
                    open={true}    
                />
            )}
        </div>
        <div className='w-5/12 flex flex-wrap justify-end'>
            {player.cards && player.cards.communityCards &&  player.cards.communityCards.map((item, index) => <Card
                key={`player-card-${index}`} 
                face={item.suit} 
                value={item.value} 
                faceValue={item.cardFace}
                used={item.used} 
                open={true} />
            )}
        </div>
    </div>
  )
}
