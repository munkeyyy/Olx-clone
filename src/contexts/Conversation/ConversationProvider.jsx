import React, { useState } from "react";
import { ConversationContext } from "./ConversationContext";

const ConversationProvider = ({ children }) => {
    const[selectedConversation,setSelectedConversation]=useState(null)
    const [convoId, setConvoId]=useState("")
    const[messages,setMessages]=useState([])
  return (
    <ConversationContext.Provider value={{selectedConversation,setSelectedConversation,messages, setMessages, convoId, setConvoId}}>{children}</ConversationContext.Provider>
  );
};

export default ConversationProvider;
