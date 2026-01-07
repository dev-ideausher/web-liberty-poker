"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Create WebSocket connection.
    const socketInstance = new io(process.env.NEXT_PUBLIC_SOCKET_URL);
    // Set the WebSocket instance to state
    setSocket(socketInstance);

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      socketInstance.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};
export const useWebSocket = () => useContext(WebSocketContext);
