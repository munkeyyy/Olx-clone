import React from "react";
import Avatar from "../../../images/default_avatar.webp";

const Message = () => {
  return (
    <>
    <div className="chat mt-4 chat-start">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={Avatar}
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
            src={Avatar}
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
