import React, { useContext } from "react";
import Avatar from "../../../images/default_avatar.webp";
import { ConversationContext } from "../../../contexts/Conversation/ConversationContext";
import { LoginContext } from "../../../contexts/Login/LoginContext";
import { UserContext } from "../../../contexts/User/UserContext";
import moment from "moment";

const Message = ({ message }) => {
  const { selectedConversation } = useContext(ConversationContext);
  const { user } = useContext(UserContext);
  const LoggedInUser = message?.senderId === user._id;
  const className = LoggedInUser ? "chat-end" : "chat-start";
  const profilePic = LoggedInUser ? user?.avatar : selectedConversation?.avatar;
  const bubbleColor = LoggedInUser ? "bg-[#ceddff]" : "bg-gray-300";
  console.log("receive", message.receiverId);
  console.log("Send", message.senderId);
  return (
    <>
      <div className={`chat mt-4 ${className}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={
                profilePic
                  ? `
            https://olx-backend-pexw.onrender.com/uploads/users/${profilePic}`
                  : Avatar
              }
            />
          </div>
        </div>
        <div className={`chat-bubble ${bubbleColor} text-black`}>
          {message.message}.
        </div>
        <div className="chat-footer opacity-50 text-xs flex gap-1  items-center">
          {moment(message.createdAt).format("LT")}
        </div>
      </div>
      {/* <div className="chat chat-end mt-4">
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
    </div> */}
    </>
  );
};

export default Message;
