import React from 'react'

const StackCoins = ({coinValue, index, total }) => {
    return (
        <img
            key={index}
            src={`/images/StackCoins/${coinValue}.svg`} // Path to your 1 rupee coin image
            className={`h-[26px] w-[42px] object-cover ${index !== 0 ? '-mt-[30px]' : ''} ${index === total - 1 ? '' : ''} `}
        // style={{ transform: `translateY(-${index * 10}px)` }} // Adjust the translateY value as needed
        />
    )
}

export default StackCoins