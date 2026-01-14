"use client"
import Button from '@/components/Button'
import { useWebSocket } from '@/context/socketContext';
import Poker from '@/hooks/Poker';
import Card from '@/modules/game/card';
import Player from '@/modules/game/player';
import { calculateCoins,delay, isOwnView } from '@/utilities/helper';
import { showDefaultMessgage, showDescriptionMessage, showErrorMessage, showInfoMessage, showSuccessMessage } from '@/utilities/toast';
import { useParams, useRouter } from 'next/navigation';
import React, { Fragment,useEffect, useRef, useState } from 'react';
import { playerPositions, centerPoint, ownPosition, cardsPosition } from '@/utilities/staticData';
import Quit from '@/modules/game/quit';
import Raise from '@/modules/game/Raise';
import WinnerScreen from '@/modules/game/WinnerScreen';
import Winner from '@/modules/WinningScreen/Winner';
import { useBalance } from '@/context/balanceContext';
import Rebuy from '@/modules/game/Rebuy';
import { ethers } from 'ethers';
import pokerTableAbi from '../../../PokerTable.json';
import erc20Abi from '../../../MockUSDT.json';
import StackCoins from '@/components/StackCoins';

export default function Table() {
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
  const router = useRouter();
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
    <div className='poker-container min-h-screen w-full flex flex-col items-start justify-center'>
      <div className='w-full absolute top-0 left-0 py-3'>
        <div className='layout-container flex flex-wrap items-center justify-between'>
          
          <Quit />
          <h1 className='text-gradient text-[40px] font-worksans font-semibold uppercase'>
            Poker Game
          </h1>

          <div>
            <Button variant='gradient' className="px-8 font-bold">
              {`${balance.poolBalance} USDC`}
            </Button>
          </div>
        </div>
      </div>
      
      <div ref={playerRef} className='layout-container flex flex-wrap justify-center items-center'>
        <div className='w-[830px] flex flex-wrap items-center justify-center relative'>
          <img src='/images/table-asset.svg' className='w-full object-fill rotate-180' />

          {/* Game Pot */}
          <div style={{ top: `60px` }} className={`absolute flex flex-wrap items-center justify-center`}>
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
          <div className='absolute grid grid-cols-5'>
            {communityCards && communityCards.map((item, index) => <Card
                key={`player-card-${index}`} 
                face={item.suit} 
                value={item.value} 
                faceValue={item.cardFace} 
                open={true} />
              )}
              
          </div>

          {details && players.map((item, index) => item && <Player 
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
          </Player>)}
        </div>
      </div>
      {showWinningScreen && winnersList && <WinnerScreen>        
        <div className="w-full layout-container text-center">
          <Winner data={winnersList} />
        </div>
      </WinnerScreen>}
      <div className='w-full absolute bottom-0 left-0 py-3'>
        <div className='layout-container flex flex-wrap items-center justify-between'>
          <div className='w-3/12'>
              <Button buttontype="icon" variant={"icon"} size={"cw"} >
                <svg className='size-6' xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M2.66602 24.5C2.66602 23.7636 3.26297 23.1667 3.99935 23.1667H27.9993C28.7357 23.1667 29.3327 23.7636 29.3327 24.5C29.3327 25.2364 28.7357 25.8334 27.9993 25.8334H3.99935C3.26297 25.8334 2.66602 25.2364 2.66602 24.5Z" fill="white"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M2.66602 16.5C2.66602 15.7636 3.26297 15.1667 3.99935 15.1667H27.9993C28.7357 15.1667 29.3327 15.7636 29.3327 16.5C29.3327 17.2364 28.7357 17.8334 27.9993 17.8334H3.99935C3.26297 17.8334 2.66602 17.2364 2.66602 16.5Z" fill="white"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M2.66602 8.50002C2.66602 7.76364 3.26297 7.16669 3.99935 7.16669H27.9993C28.7357 7.16669 29.3327 7.76364 29.3327 8.50002C29.3327 9.2364 28.7357 9.83335 27.9993 9.83335H3.99935C3.26297 9.83335 2.66602 9.2364 2.66602 8.50002Z" fill="white"/>
                </svg>
              </Button>
          </div>
          <div className='w-6/12 flex items-center justify-center gap-3 relative'>
            {hasTurn && playerTurn && playerTurn.availableOptions.map((item, index) => <>
              <Button disabled={loading} variant={"gradient"} className={`rounded-2xl capitalize ${loading ? 'opacity-40':''}`} value={item} onClick={actionHandler}>{item=="call"?`${item}(${playerTurn.callAmount})`:item}</Button>
            </>)}
            {hasRaise && <Raise data={playerTurn} closeHandler={setHasRaise} />}
          </div>
          <div className='w-3/12 flex justify-end relative'>
            {/* <Button variant="icon" buttontype="icon" size={"cw"}>
              <svg className='size-6' xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
                  <path d="M26.9608 17.127C26.7473 16.8834 26.6299 16.5705 26.6303 16.2466C26.6307 15.9227 26.749 15.6101 26.9631 15.367L28.6724 13.4493C28.8607 13.2398 28.9778 12.976 29.007 12.6958C29.0361 12.4155 28.9757 12.1333 28.8344 11.8895L26.174 7.27263C26.0341 7.02914 25.821 6.83599 25.565 6.72073C25.309 6.60547 25.0231 6.57397 24.7481 6.63072L22.2408 7.13403C21.9218 7.19951 21.5898 7.14595 21.3075 6.98345C21.0253 6.82096 20.8122 6.56077 20.7086 6.25198L19.8986 3.8109C19.8095 3.54595 19.6394 3.3157 19.4123 3.1527C19.1852 2.9897 18.9127 2.90219 18.6331 2.90254L13.2998 2.8954C13.0091 2.87983 12.7212 2.95986 12.4802 3.12326C12.2393 3.28665 12.0584 3.52443 11.9653 3.80028L11.2153 6.23928C11.1109 6.54778 10.8972 6.8074 10.6145 6.96914C10.3318 7.13088 9.99968 7.18356 9.68081 7.11723L7.10816 6.60712C6.84761 6.56994 6.58189 6.61071 6.34446 6.72428C6.10704 6.83785 5.90854 7.01915 5.77397 7.24533L3.10113 11.8551C2.95569 12.0958 2.89007 12.3763 2.91364 12.6565C2.93721 12.9367 3.04877 13.2023 3.23238 13.4153L4.92314 15.3375C5.13657 15.5811 5.25404 15.8941 5.25361 16.218C5.25318 16.5419 5.13487 16.8545 4.92079 17.0975L3.22489 19.0153C3.04071 19.2278 2.92844 19.4931 2.90411 19.7732C2.87979 20.0534 2.94467 20.334 3.08946 20.5751L5.74996 25.192C5.88976 25.4355 6.10286 25.6286 6.35889 25.7439C6.61491 25.8591 6.90079 25.8906 7.17577 25.8339L9.68311 25.3306C10.0022 25.2651 10.3341 25.3187 10.6164 25.4812C10.8987 25.6437 11.1117 25.9038 11.2153 26.2126L12.0253 28.6537C12.1177 28.9298 12.298 29.1681 12.5385 29.3321C12.7791 29.4962 13.0667 29.577 13.3574 29.5622L18.6908 29.5693C18.9703 29.5704 19.2431 29.4836 19.4706 29.3212C19.6981 29.1588 19.8689 28.929 19.9587 28.6643L20.7753 26.2254C20.8797 25.9169 21.0934 25.6573 21.3761 25.4956C21.6588 25.3338 21.9909 25.2811 22.3098 25.3475L24.8158 25.8575C25.0906 25.915 25.3765 25.8843 25.6329 25.7697C25.8892 25.6551 26.1028 25.4625 26.2433 25.2194L28.9161 20.6096C29.058 20.3663 29.1191 20.0842 29.0908 19.8039C29.0624 19.5236 28.946 19.2595 28.7582 19.0494L26.9608 17.127ZM24.9717 18.911L26.0368 20.1125L24.3261 23.0702L22.7532 22.7481C21.7932 22.5505 20.7941 22.7123 19.9454 23.2027C19.0968 23.6932 18.4578 24.4781 18.1497 25.4086L17.641 26.9012L14.2277 26.8967L13.7497 25.376C13.4441 24.4447 12.8072 23.6581 11.9599 23.1654C11.1126 22.6727 10.1138 22.5082 9.15329 22.7032L7.57953 23.0211L5.85014 20.0721L6.91841 18.8735C7.57533 18.1411 7.93924 17.1921 7.94056 16.2082C7.94187 15.2243 7.58051 14.2745 6.92555 13.5402L5.86049 12.3388L7.57108 9.40774L9.14398 9.72985C10.104 9.92743 11.1032 9.76564 11.9518 9.2752C12.8004 8.78476 13.4394 7.9998 13.7475 7.06934L14.2562 5.56335L17.6696 5.56792L18.1742 7.08859C18.4798 8.01988 19.1167 8.80654 19.964 9.29925C20.8113 9.79196 21.8101 9.95642 22.7706 9.76141L24.3444 9.44352L26.0471 12.4058L24.9788 13.6044C24.3293 14.3352 23.9699 15.2786 23.9686 16.2564C23.9673 17.2341 24.3241 18.1785 24.9717 18.911ZM15.9558 10.899C14.9009 10.8975 13.8694 11.209 12.9915 11.7938C12.1137 12.3787 11.429 13.2107 11.024 14.1847C10.619 15.1587 10.512 16.2309 10.7164 17.2658C10.9208 18.3006 11.4275 19.2516 12.1723 19.9985C12.9172 20.7454 13.8669 21.2546 14.9011 21.4617C15.9354 21.6689 17.0079 21.5647 17.983 21.1624C18.9581 20.76 19.7919 20.0775 20.3792 19.2013C20.9664 18.325 21.2805 17.2943 21.282 16.2394C21.2838 14.8249 20.7238 13.4676 19.7249 12.4661C18.726 11.4646 17.3702 10.9009 15.9558 10.899ZM15.9451 18.899C15.4176 18.8982 14.9023 18.7412 14.4641 18.4476C14.026 18.154 13.6848 17.737 13.4836 17.2495C13.2824 16.7619 13.2303 16.2257 13.3339 15.7085C13.4375 15.1914 13.6921 14.7166 14.0655 14.3442C14.439 13.9717 14.9145 13.7184 15.4319 13.6162C15.9493 13.514 16.4854 13.5675 16.9724 13.77C17.4594 13.9725 17.8754 14.3148 18.1679 14.7537C18.4603 15.1927 18.616 15.7084 18.6153 16.2359C18.6143 16.9431 18.3325 17.621 17.8317 18.1204C17.3309 18.6199 16.6523 18.8999 15.9451 18.899Z" fill="white"/>
              </svg>
            </Button> */}

            <div className='flex flex-wrap absolute -right-24 -bottom-8 rounded-md bg-white w-[350px] max-h-[120px] overflow-y-auto'>
                {details?.gameState?.actionHistory.map((item, index)=> <>
                  <span key={`History-${index}`} className='w-full px-3 py-1 text-[13px] font-worksans capitalize border-b'>{item.event}</span>
                </>)}
            </div>
          </div>
        </div>
      </div>

      {reBuy && <Rebuy />}
    </div>
  )
}
