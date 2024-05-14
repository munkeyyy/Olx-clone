import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "./SocketContext";
import { UserContext } from "../User/UserContext";
import { io } from "socket.io-client";

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      console.log("User:", user);
      const socket = io("https://olx-backend-pexw.onrender.com", {
        query: {
          userId: user._id,
        },
      });

      setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        socket.close();
        console.log("Socket connection closed");    
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
        console.log("Socket connection closed (No user)")
      }
    }
  }, [user]);
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
