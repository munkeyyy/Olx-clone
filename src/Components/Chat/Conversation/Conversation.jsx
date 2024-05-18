import React, { useContext } from "react";
import Avatar from "../../../images/default_avatar.webp";
import { SlOptions, SlOptionsVertical } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { ConversationContext } from "../../../contexts/Conversation/ConversationContext";
import { SocketContext } from "../../../contexts/Socket/SocketContext";
import { LoginContext } from "../../../contexts/Login/LoginContext";
import { notification } from "antd";
const Conversation = ({ conversation }) => {
  // console.log("convo", conversation)
  const navigate = useNavigate();
  const { selectedConversation, setSelectedConversation } =
    useContext(ConversationContext);
  const isSelected = selectedConversation?._id === conversation._id;
  const {onlineUsers}=useContext(SocketContext)
  const isOnline = onlineUsers.includes(conversation._id)
  const {isLoggedIn}=useContext(LoginContext)
  // console.log("ye kya hai",selectedConversation)
  return (
    <div
      onClick={() => {isLoggedIn?setSelectedConversation(conversation):notification.error({message:"please log in first"})
        // console.log("selectedConcvo", selectedConversation)
      }}
      className={`p-2 border-b-2 cursor-pointer  ${isSelected ? "bg-gray-200" : ""}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-3">
          <div className={`avatar ${isOnline?'online':''}`}>

          <div className="h-16 w-16  rounded-full overflow-clip">
            <img
              src={
                conversation.avatar
                  ? `https://olx-backend-pexw.onrender.com/uploads/users/${conversation.avatar}`
                  : Avatar
              }
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          </div>
          <div>
            <h2 className="text-[1.08vw] text-black font-bold uppercase">
              {conversation.user_name}
            </h2>
            <p>sometsjkksjsj loee oebndbkjn</p>

            <div className="mt-2">image</div>
          </div>
        </div>
        <div className="text-xl text-balck font-bold">
          <SlOptionsVertical />
        </div>
      </div>
    </div>
  );
};

export default Conversation;
