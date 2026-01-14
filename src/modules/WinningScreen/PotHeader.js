import React from 'react'

export default function PotHeader({pot}) {
  return (
    <div className='w-full flex items-start justify-normal'>
        <span className='px-10 py-3 gradient text-lg font-semibold capitalize relative rounded-r-xl'>
            <img className='absolute -top-1 -left-8' src="/images/game-assets/winner-badge.svg" />
            {`${pot} winners`}
        </span>
    </div>
  )
}
