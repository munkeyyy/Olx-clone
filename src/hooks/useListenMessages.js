import React, { useContext, useEffect } from 'react'
import { SocketContext } from '../contexts/Socket/SocketContext'
import { ConversationContext } from '../contexts/Conversation/ConversationContext'

const useListenMessages = () => {
  const {socket}=useContext(SocketContext)
  const{messages,setMessages}=useContext(ConversationContext);

  useEffect(()=>{
        socket?.on("newMessage",(newMessage)=>{
            console.log("New message received:", newMessage);
            setMessages([...messages, newMessage])
            console.log("mesageafterNew", messages)
        })
        console.log("Listening for new messages"); 
        return ()=>socket?.off("newMessage")
  },[socket, setMessages ,messages])
}

export default useListenMessages