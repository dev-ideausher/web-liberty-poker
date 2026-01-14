import React from 'react'

export default function Funds({className='text-[48px] uppercase font-normal font-bebas', balances=0}) {
  return (
    <h2 className={`normal-text-shadow ${className} `}>FUNDS: $ {balances}</h2>
  )
}
 