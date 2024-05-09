import React, { useContext } from "react";
import Avatar from "../../../images/default_avatar.webp";
import { SlOptions, SlOptionsVertical } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { ConversationContext } from "../../../contexts/Conversation/ConversationContext";
const Conversation = ({ conversation }) => {
  const navigate = useNavigate();
  const { selectedConversation, setSelectedConversation } =
    useContext(ConversationContext);
  const isSelected = selectedConversation?._id === conversation._id;
  return (
    <div
      onClick={() => setSelectedConversation(conversation)}
      className={`p-2 border-b-2  ${isSelected ? "bg-gray-200" : ""}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-3">
          <div className="h-16 w-16 rounded-full overflow-clip">
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
