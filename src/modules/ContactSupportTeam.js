import SupportSend from '@/icons/SupportSend'
import React from 'react'

export default function ContactSupportTeam() {
    return (
        <div className='border border-primary rounded-full py-3 px-6 flex items-center justify-between shadow-[0_2px_4px_0_#000] gap-12 mt-16'>
            <p className='text-xl font-normal text-primary normal-text-shadow'>Need help? Contact our support team anytime.</p>
            <SupportSend/>
        </div>
    )
}
