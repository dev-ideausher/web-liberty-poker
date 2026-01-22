import { useWebSocket } from '@/context/socketContext'
import { getAuthToken } from '@/utilities/helper';

export default function Poker() {
  const socket = useWebSocket();
  const joinTable = (payload) => {
    socket.emit("joinTable", {...payload, token: getAuthToken()});
  }
  const getTableDetails = () => {
    socket.emit("getTableInfo", {token: getAuthToken()});
  }
  const startGame = (payload) => {
    socket.emit("startGame", {...payload, token: getAuthToken()});
  }
  const leaveRoom = () => {
    socket.emit("leaveRoom", {token: getAuthToken()});
  }
  const playerAction = (payload) => {
    console.log(payload, "Player action");
    socket.emit("playerAction", {...payload, token: getAuthToken()});
  }
  const handleShowDown = () => {
    socket.emit("handleShowDown", {token: getAuthToken()});
  }
  const winningMeterEvent = () => {
    socket.emit("updateWinningProbability", {token: getAuthToken()});
  }
  const confirmPayment = (payload) => {
    socket.emit("confirmRebuy", {...payload, token: getAuthToken()});
  }
  const tableJoinRequest = (payload) => {
    socket.emit("tableJoinRequest", {...payload, token: getAuthToken()});
  }
  const tableCreated = (payload) => {
    socket.emit("tableCreated", {...payload, token: getAuthToken()});
  }
  const authenticateSocket = () => {
    socket.emit("authenticate", {token: getAuthToken()});
  }
  const getMatchmakingSubTiers = () => {
    socket.emit("getMatchmakingSubTiers", {token: getAuthToken()});
  }
  const setAwayUser = () => {
    socket.emit("setAway", {token: getAuthToken()});
  }
  const setBackUser = () => {
    socket.emit("setBack", {token: getAuthToken()});
  }
  return {
    joinTable,
    getTableDetails,
    leaveRoom,
    startGame,
    playerAction,
    handleShowDown,
    winningMeterEvent,
    confirmPayment,
    tableJoinRequest,
    tableCreated,
    authenticateSocket,
    getMatchmakingSubTiers,
    setAwayUser,
    setBackUser
  }
}


