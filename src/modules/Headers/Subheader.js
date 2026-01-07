"use client"
import Button from '@/components/Button'
import { useBalance } from '@/context/balanceContext';
import { getUserName, removeToken, removeUserName, removeBalance } from '@/services/cookies'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { BeatLoader, PuffLoader, PulseLoader } from 'react-spinners';
import { useAccount, useDisconnect } from 'wagmi';
import { showSuccessMessage } from '@/utilities/toast';

export default function Subheader() {
    const [name, setName] = useState(null);
    const [mounted, setMounted] = useState(false);
    const balances = useBalance();
    const router = useRouter();
    const { isConnected, address } = useAccount();
    const { disconnect } = useDisconnect();

    useEffect(()=>{
        const n = getUserName();
        setName(n);
        setMounted(true);
    },[]);

    // Handle case when balance context is not available
    const displayBalance = balances?.poolBalance || '0.00';

    return (
        
        <div className='flex w-6/12 gap-2 justify-end'>
            <Button variant={"secondary"} className={"w-fit capitalize"}>{name?name: <PulseLoader color='#E39A08' size={8} />}</Button>
            <Button variant='gradient' className="px-8 font-bold w-fit" onClick={()=> router.push('/funds')}>
                {balances ? `${displayBalance} USDC` : <PulseLoader color='#E39A08' size={8} />}
            </Button>

            {mounted && isConnected && (
                <Button 
                    variant="secondary" 
                    className="px-8 font-bold w-fit"
                    onClick={() => {
                        disconnect();
                        // Clear all cookies/session data
                        removeToken();
                        removeUserName();
                        removeBalance();
                        showSuccessMessage('Wallet disconnected successfully!');
                        router.push('/connect-wallet');
                    }}
                >
                    Disconnect
                </Button>
            )}
        </div>
           
    )
}
