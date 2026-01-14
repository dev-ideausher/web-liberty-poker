import Button from '@/components/Button';
import Confirmation from '@/components/Confirmation';
import Poker from '@/hooks/Poker';
import Back from '@/icons/Back';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

export default function Quit() {
    const [modal, setModal] = useState(false);
    const {leaveRoom} = Poker();
    const handler = () => {
        setModal(true);
    }
    const leaveTheTable = () => {
        leaveRoom();
    }
    return (
        <>
            <div onClick={handler} className='table-btns rounded-lg size-16 flex items-center justify-center'><Back/></div>
            {modal && <Confirmation confirmHandler={leaveTheTable} cancelHandler={setModal}  />}
        </>
    );
}

