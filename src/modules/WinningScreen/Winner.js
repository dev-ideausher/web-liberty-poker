import React from 'react'
import PotHeader from './PotHeader'
import WinningPlayer from './WinningPlayer'

export default function Winner({data}) {
  return (
    <>
      {data && data.map((item, index)=><div key={`Winning-pot-${item.potType}`} className='w-full'>
          <PotHeader pot={item.potType} />
          <div className='w-full mt-10'>
            {item.winners && item.winners.map((player, ind)=> <WinningPlayer player={player} key={`${item.potType} winning player ${ind}`}></WinningPlayer>)}
          </div>
      </div>)}
    </>
  )
}
