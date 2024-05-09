import React from "react";
import SideBar from "./SideBar/SideBar";
import ChatWindow from "./ChatWindow/ChatWindow";
import { Route, Routes } from "react-router-dom";

const Chat = () => {
  console.log("heloo im chat");
  return (
    <div className="mx-auto  relative my-0 max-w-[1280px] px-4 md:px-8 py-6">
      <div className="border-2 flex items-start bg-white rounded">
        <div className="w-[40%] border-r-2">
          <SideBar />
        </div>
        <div className="grow">
            <ChatWindow/>
        </div>
      </div>
    </div>
  );
};

export default Chat;
