"use client"
import React, { useState } from 'react'

import UserInfoModal from './UserInfoModal'
import ReportUserModal from './ReportUserModal'

export default function PlayerPosition({className, position}) {
    const [showInfoModal,setShowInfoModal] = useState(false)
    const [showReportModal,setShowReportModal] = useState(false)

    const infoModalHandler = () => setShowInfoModal(!showInfoModal)

    const reportModalHandler = () => setShowReportModal(!showReportModal)

    return (
        <div className={`absolute ${className} ${showInfoModal ? '':showReportModal ? '':"z-30"}`}>
            <div onClick={infoModalHandler} className='w-full cursor-pointer z-10 relative'>
                <img src="/images/cat.png" alt="pl" className='size-[130px] rounded-full border-10 border-[#00000080] relative z-10' />
                <p className='w-full bg-[#000000BF] rounded-full border-[3px] border-[#00000080] text-center text-xl font-normal text-primary normal-text-shadow -mt-8 relative z-20 leading-none'>
                    Name<br/>
                    $1,500
                </p>
            </div>
            {showInfoModal && <UserInfoModal exitHandler={infoModalHandler} reportHandler={reportModalHandler} position={position} />}
            {showReportModal && <ReportUserModal position={position} exitHandler={reportModalHandler} />}
        </div>
    )
}
