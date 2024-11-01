// SocketContext.jsx
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socketInitialized, setSocketInitialized] = useState(false);
  const socket = useRef();

  useEffect(() => {
    socket.current = io(import.meta.env.VITE_BASE_URL, {
      transports: ["websocket"],
    });

    socket.current.on("connect", () => {
      setSocketInitialized(true);
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  if (!socketInitialized) return null; 

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
