import React, { useContext } from "react";
import Avatar from "../../../images/default_avatar.webp";
import { ConversationContext } from "../../../contexts/Conversation/ConversationContext";
import { LoginContext } from "../../../contexts/Login/LoginContext";
import { UserContext } from "../../../contexts/User/UserContext";

const Message = () => {
  const{selectedConversation}=useContext(ConversationContext)
  const{user}=useContext(UserContext)
  return (
    <>
    <div className="chat mt-4 chat-start">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={selectedConversation.avatar?`
            https://olx-backend-pexw.onrender.com/uploads/users/${selectedConversation.avatar}`:Avatar}
          />
        </div>
      </div>
      <div className="chat-bubble bg-gray-300 text-black">
        It was said that you would, destroy the Sith, not join them.
      </div>
    </div>
    <div className="chat chat-end mt-4">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={user?.avatar?`https://olx-backend-pexw.onrender.com/uploads/users/${user?.avatar}`:Avatar}
          />
        </div>
      </div>
      <div className="chat-bubble bg-gray-300 text-black">
        It was said that you would, destroy the Sith, not join them.
      </div>
    </div>
    </>
  );
};

export default Message;
