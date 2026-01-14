"use client"
import Button from '@/components/Button'
import Input from '@/components/Input'
import StackCoins from '@/components/StackCoins'
import { useBalance } from '@/context/balanceContext'
import { useWebSocket } from '@/context/socketContext'
import Poker from '@/hooks/Poker'
import Back from '@/icons/Back'
import Message from '@/icons/Message'
import SettingsT from '@/icons/SettingsT'
import Up from '@/icons/Up'
import MyPosition from '@/modules/TableModules/MyPosition'
import PlayerPosition from '@/modules/TableModules/PlayerPosition'
import Card from '@/modules/game/card'
import { cardsPosition, playerPositions } from '@/utilities/staticData'
import { showDescriptionMessage, showErrorMessage, showInfoMessage, showSuccessMessage } from '@/utilities/toast'
import { useParams, useRouter } from 'next/navigation'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { calculateCoins,delay, isOwnView } from '@/utilities/helper';
import Raise from '@/modules/game/Raise'
import WinnerScreen from '@/modules/game/WinnerScreen'
import Winner from '@/modules/WinningScreen/Winner'
import Quit from '@/modules/game/quit'

export default function page() {
    const router = useRouter()
    const [messageState,setMessageState] = useState('')

    const playerRef = useRef(null);
    const {id} = useParams()
    const {getTableDetails, playerAction, handleShowDown, startGame, winningMeterEvent, leaveRoom,confirmPayment} = Poker();
    const balance = useBalance();
    const [details, setDetails] = useState(null);
    const [players, setPlayers] = useState([]);
    const [playerTurn, setPlayerTurn] = useState(null);
    const [hasTurn, setHasTurn] = useState(false);
    const [isDealer, setIsDealer] = useState(null);
    const [smallBlind, setSmallBlind] = useState(null);
    const [bigBlind, setBigBlind] = useState(null);
    const [cards, setCards] = useState([]);
    const [communityCards, setCommunityCards] = useState([]);
    const [playerWindow, setPlayerWindow] = useState(-1);
    const [hasRaise, setHasRaise] = useState(false);
    const [back, setBack] = useState(true);
    const [isShowDown, setIsShowDown] = useState(false);
    const [revealCards, setRevealCards] = useState([]);
    const [winningMeter, setWinningMeter] = useState(false);
    const [isCallStartGame, setIsCallStartGame] = useState(false);
    const [newRoundStarting, setNewRoundStarting] = useState(false);
    const [showWinningScreen, setShowWinningScreen] = useState(false);
    const [winnersList, setWinnerList] = useState(null);
    const [reBuy, setRebuy] = useState(false);
    const [loading,setLoading] = useState(false)
    const socket = useWebSocket();
    const handlePlayerTurn = (payload) => {
        setPlayerTurn(payload.data);
        setHasTurn(true);
    }
    
    const suffleTheWindow = (data) => {
        console.log(data)
        if(data?.currentPlayers && data?.currentPlayers?.length>0){
            let arr = new Array(data.maxPlayers).fill(null);
            let players = data.currentPlayers;
            for(let i=0; i<players.length; i++){
                let seatPosition = players[i].seatPosition - 1;
                arr[seatPosition] = players[i];
            }
            for(let i=0; i<arr.length; i++){
                if(arr[i] && isOwnView(socket.id, arr[i].socketId)){
                setPlayerWindow(4-i);
                }
            }
            setPlayers([...arr]);
        }
        else{
            showErrorMessage("The table is empty or having some technical issue.")
        }
    }

    const findThePosition = (currentIndex) => {
        let position = (playerWindow + currentIndex) % 9;
        console.log(`Position =${position} and Current index=${currentIndex} and Player window=${playerWindow}`);
        return position;
    }

    const checkForTurn = () => {
        
    }

    const actionHandler = (e) => {
        if(loading) return
        const action = e.target.getAttribute("value");
        if(action != "raise"){
            playerAction({action: action});
        }
        else{
            setHasRaise(true);
        }
    }

    const decidedReveal = (playerId) => {
        const cc = revealCards.filter((item) => item.playerId == playerId);
        const selectedCards = cc.length>0?cc[0].hand:false;
        return selectedCards;
    }

    const startNewGame = async () => {
        startGame({});
    }
    const resetStates = (whoes) => {
        setIsShowDown(false);
        setCommunityCards([]);
        setRevealCards([]);
        setIsDealer(null);
        setSmallBlind(null);
        setBigBlind(null);
        setHasTurn(false);
        setPlayerTurn(null);
        setWinnerList(null);
        setShowWinningScreen(false)
    }

    
    const reBuyFunds = async (data) => {
        let signer;
        console.log("1");
        if (typeof window.ethereum !== "undefined") {
        try{
            console.log("2");
            // let provider = window.ethereum;
            // await provider.request({ method: "eth_requestAccounts" });
            // const web3Provider = new ethers.providers.Web3Provider(provider);
            // signer = web3Provider.getSigner();

            if (typeof window.ethereum !== "undefined") {
                let provider = window.ethereum;
                await provider.request({ method: "eth_requestAccounts" });
                const web3Provider = new ethers.providers.Web3Provider(provider);
                signer = web3Provider.getSigner();
            } else {
                showErrorMessage("Please install Metamask first");
            }
            console.log("3");

            
            const pokerTableAddress = data?.tableAddress;
            const pokerTableContract = new ethers.Contract(pokerTableAddress, pokerTableAbi.abi, signer);
            console.log("4");
            const tokenAddress = process.env.NEXT_PUBLIC_USDT_CONTRACT;

            const usdtTokenContract = new ethers.Contract(tokenAddress, erc20Abi.abi, signer);
            const amountInSmallestUnits = ethers.utils.parseUnits(data?.buyInAmount.toString(), 6);
            const tx = await usdtTokenContract.approve(pokerTableAddress, amountInSmallestUnits);
            // const tx = await usdtTokenContract.approve(pokerTableAddress, data?.buyInAmount);
            console.log("5");

            console.log(`Transaction submitted: ${tx.hash}`);

            await tx.wait();
            console.log("USDT approved successfully.");
            console.log("6");

            const tx2 = await pokerTableContract.deposit(amountInSmallestUnits);
            console.log(`Transaction submitted: ${tx2.hash}`);
            console.log("7");

            await tx2.wait();
            showInfoMessage("Transaction successful.")
            console.log("8");

            confirmPayment({
                "tableId": data?.tableId,
                "transactionHash":tx2.hash,
                "amount": data?.buyInAmount
            })
            console.log("9");

        }
        catch(e){
            console.log("error in rebuy"+e);
            showErrorMessage("Payment Failed.");
            leaveRoom();
        }
        } else {
            showErrorMessage("Metamask has not installed.");
            leaveRoom();
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
        const handleBeforeUnload = (event) => {
            // Modern browsers will ignore the returnValue
            event.preventDefault();
            event.returnValue = ''; // Chrome requires this to show the warning dialog
        };
        
        // Adding the event listener
        window.addEventListener('beforeunload', handleBeforeUnload);
        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        
        };
        }
    }, []);

    useEffect(()=>{
        if(socket){
            // Request for table details by emitting the event with table id
            getTableDetails(id);

            // Listner for getting the table details
            socket.on("tableInfo", (payload) => {
                if(payload.status){
                    setDetails(payload.data);
                    suffleTheWindow(payload.data);
                }
                else{
                    showErrorMessage(payload.message);
                }
            });
            socket.on("unableToGetTableInfo", (payload) => {
                showDescriptionMessage("Table Left","You have left the table you can join new one.");
                router.back()
            })
            socket.on("playerJoined", (payload) => {
                if(payload.status){
                    setDetails(payload.data);
                    suffleTheWindow(payload.data);
                    showSuccessMessage(payload.message)
                }
                else{
                    showErrorMessage(payload.message);
                }
            });
            socket.on("roomLeft", (payload)=>{
                if(payload.status){
                    showSuccessMessage(payload.message);
                    router.back();
                }
                else{
                    showErrorMessage(payload.message);
                }
            });
            socket.on("unableToLeave", (payload) => {
                showErrorMessage(payload.message);
            });
            socket.on("playerLeft", (payload)=>{
                if(payload.status){
                    setDetails(payload.data);
                    suffleTheWindow(payload.data);
                    showInfoMessage(payload.message);
                }
                else{
                    showErrorMessage(payload.message);
                }
            });
            
            // Start Game Listeners
            socket.on("gameStarted", (payload) => {
                setDetails(payload.data);
                suffleTheWindow(payload.data);
                showSuccessMessage(payload.message);
                setIsCallStartGame(false);
                setNewRoundStarting(false);
                // Trigger winning meter
                winningMeterEvent();
            });
            socket.on("unabletoStartGame", (payload) => {
                showErrorMessage(payload.message);
            });
            socket.on("receiveHand", (payload) => {
                setCards(payload.data.hand);
            });
            socket.on("playerTurn", (payload) => {
                handlePlayerTurn(payload);
                // Trigger winning meter
                winningMeterEvent();
            });
            socket.on("currentPlayerTurn", (payload) => {
                setPlayerTurn(payload.data);
                setHasTurn(false);
            });
            socket.on("smallBlind", (payload) => {
                setSmallBlind(payload.data)
            });
            socket.on("bigBlind", (payload) => {
                setBigBlind(payload.data)
            });
            socket.on("dealerAssigned", (payload) => {
                setIsDealer(payload.data)
            });
            
            socket.on("actionTaken", (payload) => {
                showSuccessMessage(payload.message)
            });
            socket.on("playerActionStarted", (payload) => {
                setLoading(true)
            });
            socket.on("playerActionEnded", (payload) => {
                setLoading(false)
            });
            socket.on("newPhase", (payload) => {
                if(payload.status){
                    showSuccessMessage(payload.message)
                }
            });
            socket.on("communityCardsDealt", (payload) => {
                if(payload.status){
                    setCommunityCards(payload.data);
                }
            });
            socket.on("unableToAct", (payload) => {
                if(payload.status){
                    showErrorMessage(payload.message);
                }
            });
            socket.on("gameOver", (payload) => {
                if(payload.status){
                    showInfoMessage(payload.message);
                }
            });
            socket.on("winnerCongratulation", (payload) => {
                if(payload.status){
                    showSuccessMessage(payload.message);
                }
            });
            socket.on("winners", (payload) => {
                if(payload.status){
                    setWinnerList(payload.data);
                    setShowWinningScreen(true)
                }
            });
            socket.on("refundChips", (payload) => {
                if(payload.status){
                    showSuccessMessage(payload.message);
                }
            });
            socket.on("playerFolded", (payload) => {
                if(payload.status){
                    setDetails(payload.data);
                    suffleTheWindow(payload.data);
                }
                else{
                    showErrorMessage(payload.message);
                }
            });
            socket.on("callShowDown", (payload) => {
                if(payload.status){
                    setHasTurn(false);
                    setPlayerTurn(null);
                    handleShowDown();
                    // Hide winning meter.
                    setWinningMeter(false);
                }
                else{
                    showErrorMessage(payload.message);
                }
            });
            socket.on("revealPlayerCards", async (payload) => {
                if (payload.status) {
                    await delay(800)
                    setRevealCards((prevRevealCards) => [...prevRevealCards, payload.data]);
                } else {
                    showErrorMessage(payload.message);
                }
            });
            socket.on("revealingDone", async (payload) => {
                setIsShowDown(true);
                await delay(2000);
            });
            socket.on("callStartGame", (payload) => {
                if (payload.status) {
                    startNewGame()
                } else {
                    showErrorMessage(payload.message);
                }
            });
            socket.on("newRoundStarting", (payload) => {
                if (payload.status) {
                    resetStates();
                } else {
                    showErrorMessage(payload.message);
                }
            });
            socket.on("winningProbability", (payload)=>{
                if(payload.status){
                    setWinningMeter(payload.data)
                }
                else{
                    setWinningMeter(false)
                }
            });
            socket.on("errorFetchingProbability", (payload)=>{
                setWinningMeter(false);
            });
            socket.on("rebuyRequested", (payload) => {
                setRebuy(true);
                reBuyFunds(payload.data)
            });
            socket.on("youWereEliminated", (payload) => {
                leaveRoom();
            });
            socket.on("rebuyError", (payload) => {
                leaveRoom();
            });
            socket.on("playerRebought", (payload) => {
                console.log(payload);
            });
            socket.on("rebuySuccess", (payload) => {
                console.log(payload);
            });
            
            return () => {
                socket.off('tableInfo');
                socket.off('unableToGetTableInfo');
                socket.off('playerJoined');
                socket.off('roomLeft');
                socket.off('unableToLeave');
                socket.off('playerLeft');
                socket.off('gameStarted');
                socket.off('unabletoStartGame');
                socket.off('receiveHand');
                socket.off('playerTurn');
                socket.off('smallBlind');
                socket.off('bigBlind');
                socket.off('currentPlayerTurn');
                socket.off('actionTaken');
                socket.off('newPhase');
                socket.off('communityCardsDealt');
                socket.off('unableToAct');
                socket.off('gameOver');
                socket.off('playerFolded');
                socket.off('callShowDown');
                socket.off('revealPlayerCards');
                socket.off('winners');
                socket.off('winnerCongratulation');
                socket.off('callStartGame');
                socket.off('newRoundStarting');
                socket.off('winningProbability');
                socket.off('errorFetchingProbability');
                socket.off('revealingDone');
                socket.off('rebuyRequested');
                socket.off('youWereEliminated');
                socket.off('rebuyError');
                socket.off('playerRebought');
                socket.off('playerActionStarted')
                socket.off('playerActionEnded')
            };
        }
    },[socket]);
    return (
        <div className="w-full bg-[url('/images/banners/match.png')] bg-cover py-2 min-h-screen relative">
            <div className='layout-container flex flex-col justify-between'>
                <div className='w-full flex items-center justify-between'>
                    <Quit/>
                    <div className='table-btns rounded-lg size-16 flex items-center justify-center'><SettingsT/></div>
                </div>
                <div ref={playerRef} className='layout-container flex flex-wrap justify-center items-center relative'>
                    <div className='w-3/4 flex flex-wrap items-center justify-center relative'>
                        <img src='/images/table.svg' className='w-full object-fill rotate-180' />
                        <div className='top-10 left-0 absolute w-full h-4/5 flex items-center justify-center z-10'>
                            <img src="/images/table-logo.svg" alt="logo" className='w-fit z-20' />
                        </div>
                    <img src="/images/table-border.svg" alt="border" className='absolute h-2/3 w-3/4 top-[20%] left-[12.5%] rounded-full z-10'></img>
                    
                    {/* Game Pot */}
                    <div style={{ top: `80px` }} className={`absolute flex flex-wrap items-center justify-center z-20`}>
                        <div className='flex items-center flex-col w-full'>
                        <span className='bg-[#2ED777] font-inter text-xs py-1 px-3 rounded-full font-medium w-fit flex justify-center'>
                            {details ? details.gameState?.pot : 0}
                        </span>
                        <div className='grid grid-cols-4 w-full justify-center mt-6'>
                            {calculateCoins(details?.gameState?.pot).map((coin, index) => (
                            <div key={index} className={`flex flex-col -ml-3 -mt-2`}>
                                {Array.from({ length: coin.count }, (_, index) => (
                                <Fragment key={index}>
                                    <StackCoins index={index} total={coin.count} coinValue={coin.text} />
                                </Fragment>
                                ))}
                            </div>
                            ))}
                        </div>
                        </div>
                    </div>
                    {/* Community Cards */}
                    <div className='absolute grid grid-cols-5 z-30'>
                        {communityCards && communityCards.map((item, index) => <Card
                            key={`player-card-${index}`} 
                            face={item.suit} 
                            value={item.value} 
                            faceValue={item.cardFace} 
                            open={true} />
                        )}
                    </div>

                    {details && players.map((item, index) => item && <PlayerPosition
                        key={`player-${index}`}
                        index={index}
                        cardsposition={cardsPosition[findThePosition(index)]}
                        cardCount={index+1}
                        badgePosition={playerPositions[findThePosition(index)].badge}
                        myposition={findThePosition(index)}
                        position={playerPositions[findThePosition(index)].player}
                        hasTurn={hasTurn?playerTurn.playerId==item._id:playerTurn && playerTurn.playerId==item._id}
                        playerTurn={playerTurn}
                        ownView={isOwnView(socket.id, item.socketId)}
                        showDown={isShowDown}
                        isDealer={isDealer}
                        isSmallBlind={smallBlind}
                        isBigBlind={bigBlind}
                        player={item}
                        status={item.status}
                        meter={winningMeter}
                    >
                        {cards && cards.map((it, ind) => <Card
                            key={`player-card-${ind}`} 
                            face={isShowDown?decidedReveal(item._id)?.[ind]?.suit:it.suit} 
                            value={isShowDown?decidedReveal(item._id)?.[ind]?.value:it.value} 
                            faceValue={isShowDown?decidedReveal(item._id)?.[ind]?.cardFace:it.cardFace}
                            variant={isShowDown?decidedReveal(item._id)?"medium":"medium":cardsPosition[findThePosition(index)] =="center"?"medium":"small"} 
                            open={isShowDown?decidedReveal(item._id)?true:false:cardsPosition[findThePosition(index)]=="center"?true:false} 
                            className={`card-${ind+(cards.length==2?2:1)} absolute`}
                        />)}
                        </PlayerPosition>)}
                    </div>
                </div>
                {showWinningScreen && winnersList && <WinnerScreen>        
                    <div className="w-full layout-container text-center">
                        <Winner data={winnersList} />
                    </div>
                </WinnerScreen>}
                <div className='w-full flex items-center justify-between gap-3 mt-20 relative z-40'>
                    <div className='flex items-center gap-3 w-2/5 justify-between'>
                        {!messageState && <h5 onClick={()=>setMessageState(true)} role='button' className='table-btns py-2 px-5 rounded-[30px] text-[32px] font-normal font-ruso normal-text-shadow min-w-28 flex items-center justify-center'><Message/></h5>}
                        {messageState && <div className='table-btns flex items-center justify-between px-3 py-2 rounded-[30px]'>
                            <Input type="text" placeholder="Text your message" className="bg-transparent border-none text-2xl font-normal text-primary placeholder:text-[#F4E17E80]" />
                            <div onClick={()=>setMessageState(false)} className='cursor-pointer'><Up/></div>
                        </div>}
                        <h5 role='button' className='table-btns py-2 px-5 rounded-[30px] text-[32px] font-normal font-ruso normal-text-shadow'>AWAY</h5>
                    </div>
                    <div className='flex items-center gap-3 relative w-2/5'>
                        {/* <h5 role='button' className='table-btns py-2 px-4 rounded-[30px] text-[32px] font-normal font-ruso normal-text-shadow'>FOLD</h5>
                        <h5 role='button' className='table-btns py-2 px-4 rounded-[30px] text-[32px] font-normal font-ruso normal-text-shadow'>CHECK</h5>
                        <h5 role='button' className='table-btns py-2 px-4 rounded-[30px] text-[32px] font-normal font-ruso normal-text-shadow min-w-32 text-center'>BET</h5>
                        <h5 role='button' className='table-btns py-2 px-4 rounded-[30px] text-[32px] font-normal font-ruso normal-text-shadow'>RAISE</h5> */}
                        {hasTurn && playerTurn && playerTurn.availableOptions.map((item, index) => <Button key={index} disabled={loading} variant={"gradient"} className={`rounded-[30px] text-2xl font-ruso normal-text-shadow uppercase table-btns ${loading ? 'opacity-40':''}`} value={item} onClick={actionHandler}>{item=="call"?`${item}(${playerTurn.callAmount})`:item}</Button>
                        )}
                        {hasRaise && <Raise data={playerTurn} closeHandler={setHasRaise} />}

                    </div>
                </div>
            </div>
        </div>
    )
}
