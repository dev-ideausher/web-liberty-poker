import Input from '@/components/Input'
import React from 'react'

export default function HeadingInput({
  title,
  firstInput = 0,
  secondInput = 0,
  firstText,
  secondText
}) {
  return (
    <div className='heading-input w-full py-5 px-2'>
      <h3 className='text-[36px] font-normal font-ruso text-center leading-none mb-3'>{title}</h3>

      <div className='w-full flex items-center justify-center gap-1.5'>
        <Input
          type="number"
          defaultValue={firstInput}
          className="
            border-primary border bg-transparent text-primary 
            py-0 px-3 text-[22px] font-normal rounded-full
            text-center remove-arrows max-w-1/3
          "
        />

        {firstText && <p className='text-[22px] font-light pr-2'>{firstText}</p>}

        {secondInput !== 0 && (
          <Input
            type="number"
            defaultValue={secondInput}
            className="
              border-primary border bg-transparent text-primary 
              py-0 px-3 text-[22px] font-normal rounded-full
              text-center remove-arrows
            "
          />
        )}

        {secondText && <p className='text-[22px] font-light'>{secondText}</p>}
      </div>
    </div>
  )
}
