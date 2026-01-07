import React from 'react'
import { BounceLoader, FadeLoader, MoonLoader, PacmanLoader, PuffLoader } from 'react-spinners'

export default function Loader() {
  return (
    <div className='w-full flex items-center justify-center py-5'>
        <PacmanLoader color='#E39A08' />
    </div>
  )
}
