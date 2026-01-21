"use client"
import Button from '@/components/Button'
import Input from '@/components/Input'
import { useBalance } from '@/context/balanceContext'
import { useWebSocket } from '@/context/socketContext'
import Poker from '@/hooks/Poker'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import HorizontalLine from '@/icons/HorizontalLine'
import HorizontalLineLeft from '@/icons/HorizontalLineLeft'
import Funds from '@/modules/Funds'
import HomeOptions from '@/modules/HomeOptions'
import EntranceAmount from '@/modules/Stake/EntranceAmount'
import { checkTableExistence, getAllTiers } from '@/services/apis/tables'
import { showErrorMessage, showInfoMessage, showSuccessMessage } from '@/utilities/toast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function page() {
    const  balances  = useBalance()
    const displayBalance = balances?.poolBalance || '0.00';
    const router = useRouter()
    const socket = useWebSocket()
    const { joinTable, startGame } = Poker()
    const [tiersData,setTiersData] = useState(null)
    const [chipsCount,setChipsinCount] = useState('')
    const [selectedTier,setSelectedTier] = useState(null)
    const [selectedSubTier,setSelectedSubTier] = useState(null)
    const [loading,setLoading] = useState(false)
    const [data,setData] = useState(null)

    const getTiersHandler = async () => {
        const response = await getAllTiers()
        if(response.status){
            setTiersData(response.data)
        }
    }
    const nextHandler = async () => {
        if(chipsCount < selectedSubTier.minBuy){
            showInfoMessage("Enterance amount should not be less than min value")
            return
        }
        if(chipsCount > selectedSubTier.maxBuy){
            showInfoMessage("Enterance amount should not be greater than max value")
            return
        }
        const obj = {
            subTierId :selectedSubTier._id,
            chipsInPlay:chipsCount,
            playerCount:selectedSubTier?.maxSeats || 5
        }
        setLoading(true)
        const response = await checkTableExistence(obj)
        if(response.status){
            setData(response.data)
            if(response.data.tableId) {
                showSuccessMessage("Joining existing table")
                joinTableHandler(response.data)
            }
        }
        setLoading(false)
    }
    const joinTableHandler = async (apiData) => {
        const { blockChainTableId, chipsInPlay, autoRenew, maxBuy } = apiData;
        if(apiData?.subTierId == selectedSubTier._id){
            await joinTable({
                autoRenew: autoRenew,
                maxBuy: maxBuy,
                blockChainTableId: blockChainTableId,
                chipsInPlay: chipsInPlay,
            });
        }
    }
    useEffect(() => {
        if (!socket) return;
    
        const joinTableHandlerWrapper = (payload) => {
            if (payload.data?.subTierId == selectedSubTier?._id) {
                setData(payload.data);
            }
            joinTableHandler(payload.data);
        };
    
        socket.on("callJoinTable", joinTableHandlerWrapper);
    
        socket.on("roomJoined", (payload) => {
            console.log(payload.data);
            showSuccessMessage(payload.message);
            router.push(`/table/${payload.data._id}`);
        });
    
        socket.on("unableToJoin", (payload) => {
            showErrorMessage(payload.message);
        });
    
        socket.on("callStartGame", (payload) => {
            if (payload.status) startGame({});
            else showErrorMessage(payload.message);
        });
    
        return () => {
            socket.off("callJoinTable", joinTableHandlerWrapper);
            socket.off("roomJoined");
            socket.off("unableToJoin");
            socket.off("callStartGame");
        };
    }, [socket, selectedSubTier]);
    
    useEffectOnce(()=>{
        getTiersHandler()
    })
    return (
        <div className="min-h-screen h-full w-full flex relative flex-col justify-end items-center bg- bg-center">
            <img src="/images/banners/banner-sit.png" alt="bba" className="h-full absolute w-full" />

            <div className="h-full z-20 layout-container pb-6 flex flex-col items-center">
                <div className='layout-container flex items-center justify-between'>
                    <Link href="/private-table"><Button variant={"secondary"} className={"w-fit py-4 px-3 text-[32px]"}>PRIVATE TABLE</Button></Link>
                    <h2 className='heading-texts text-[120px] font-cinzel font-black text-center'>SIT & GO</h2>
                    <Link href="/tournament"><Button variant={"secondary"} className={"w-fit py-4 px-6 text-[32px]"}>TOURNAMENT</Button></Link>
                </div>
                <Funds balances={displayBalance} className='text-[48px] uppercase font-normal font-ruso heading-texts'/>
                <div className='flex items-center justify-center gap-5'>
                    <HorizontalLine/>
                    <h3 className='text-[55px] normal-text-shadow uppercase font-normal font-ruso'>STAKE OPTIONS</h3>
                    <HorizontalLineLeft/>
                </div>
                <div className="w-full pt-5 flex gap-7 overflow-x-auto px-1 hide-scrollbar py-2 min-h-32">
                    {tiersData?.map((item)=><EntranceAmount 
                        key={item._id}
                        title={`${item.minBuy} Small - ${item.maxBuy} Big $`}
                        data={item}
                        setSelectedSubTier={setSelectedSubTier}
                        setSelectedTier={setSelectedTier}
                    />)}
                </div>
            
                <h3 className='text-[55px] normal-text-shadow uppercase font-normal font-ruso leading-none mt-16'>ENTRANCE AMOUNT</h3>
                <div className='flex items-end justify-center gap-2'>
                    <h4 className='text-[32px] font-bold text-primary normal-text-shadow'>Min {selectedSubTier?.minBuy || 0} </h4>
                    <Input type="text" value={chipsCount} onChange={(e)=>setChipsinCount(e.target.value)} className="border-b-2 border-primary rounded-none text-[32px] bg-transparent w-28 outline-none text-primary text-center focus:outline-none" />
                    <h4 className='text-[32px] font-bold text-primary normal-text-shadow'>Max {selectedSubTier?.maxBuy || 0} $</h4>
                </div>
                <button disabled={(!selectedSubTier || !chipsCount)} onClick={nextHandler} className={`bg-[url('/images/chip.svg')] bg-cover flex items-center justify-center w-[330px] h-64 mt-7 ${(!selectedSubTier || !chipsCount) ? 'opacity-30':''}`}>
                    {!loading && <p className='text-[40px] w-full font-cinzel font-black text-center leading-none -mt-4'>JOIN<br/> TABLE</p>}
                    {loading && <p className='text-[24px] w-full font-cinzel font-black text-center leading-none -mt-4'>LOADING</p>}
                </button>
                <HomeOptions/>
            </div>
        </div>
    )
}
