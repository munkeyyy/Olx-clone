import React, { useContext, useEffect, useRef } from "react";
import Message from "../Message/Message";
import useGetMessages from "../../../hooks/useGetMessages";
import { ConversationContext } from "../../../contexts/Conversation/ConversationContext";
import MessageSkeleton from "./MessageSkeleton";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  console.log("messages", messages);
  const lastMessageRef = useRef();

  
useEffect(()=>{
  setTimeout(()=>{
    lastMessageRef.current?.scrollIntoView({behaviour:"smooth"})
  },100)
},[messages])
  return (
    <div className="px-4 mb-24 side flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message.id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
      {loading && [...Array(3)].map((_, id) => <MessageSkeleton />)}
      {!loading && messages.length === 0 && (
        <p className="text-center mt-2 text-black text-sm font-medium">
          Send a message to start conversation
        </p>
      )}
    </div>
  );
};

export default Messages;
