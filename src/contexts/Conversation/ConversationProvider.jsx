import React, { useState } from "react";
import { ConversationContext } from "./ConversationContext";

const ConversationProvider = ({ children }) => {
    const[selectedConversation,setSelectedConversation]=useState(null)
    const[messages,setMessages]=useState([])
  return (
    <ConversationContext.Provider value={{selectedConversation,setSelectedConversation,messages, setMessages}}>{children}</ConversationContext.Provider>
  );
};

export default ConversationProvider;
