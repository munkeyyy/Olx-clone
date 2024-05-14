import React, { useContext, useEffect, useRef } from "react";
import Message from "../Message/Message";
import useGetMessages from "../../../hooks/useGetMessages";
import { ConversationContext } from "../../../contexts/Conversation/ConversationContext";
import MessageSkeleton from "./MessageSkeleton";
import useListenMessages from "../../../hooks/useListenMessages";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages()
  // console.log("messages", messages);
  const lastMessageRef = useRef();

  
// useEffect(()=>{
//   setTimeout(()=>{
//     lastMessageRef.current?.scrollIntoView({behaviour:"smooth"})
//   },100)
// },[messages])
  return (
    <div className="px-4 mb-24 side flex-1 overflow-auto">
      {console.log(messages)}
      {!loading &&
        messages.length > 0 &&
        messages?.map((message,i) => (
          <div key={i} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
      {!loading && messages.length === 0 && (
        <p className="text-center mt-2 text-black text-sm font-medium">
          Send a message to start conversation
        </p>
      )}
      {/* {loading && [...Array(3)].map((_, id) => <MessageSkeleton />)} */}
    </div>
  );
};

export default Messages;
