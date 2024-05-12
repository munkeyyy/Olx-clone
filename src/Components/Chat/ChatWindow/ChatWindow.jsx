import React, { useContext, useEffect, useState } from "react";
import Avatar from "../../../images/default_avatar.webp";
import { FaPhoneAlt } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";
import Messages from "../Messages/Messages";
import { IoIosSend } from "react-icons/io";
import empty from "../../../images/emptyChat.webp";
import { ConversationContext } from "../../../contexts/Conversation/ConversationContext";
import axios from "axios";
import { baseUrl } from "../../../utils";
import { UserContext } from "../../../contexts/User/UserContext";
import { notification } from "antd";
const ChatWindow = () => {
const token=  localStorage.getItem("token")
  const {
    selectedConversation,
    setSelectedConversation,
    messages,
    setMessages,
  } = useContext(ConversationContext);
  const { user, setConvoId } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
  const sendMessage = async () => {
    setLoading(true);
    await axios
      .post(`http://localhost:8001/api/v1/messages/send/${selectedConversation?._id}`, {
        message: message,
      },{
        headers:{
          "Authorization": token,
        }
      })
      .then((res) => {
        console.log(res.data);
        setMessages([...messages, res.data.newMessage]);
        // notification.success(res.data.message)
        setLoading(false);
        setConvoId(res.data.conversationId)
      })
      .catch((err) => {
          
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage();
    setMessage("");
  };
  return (
    <>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <div className="w-full  h-[70vh] relative flex flex-col overflow-hidden">
          <>
            <div className="flex p-2 border-b-2 w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-12 w-12 rounded overflow-hidden">
                  <img
                    src={
                      selectedConversation.avatar
                        ? `
https://olx-backend-pexw.onrender.com/uploads/users/${selectedConversation.avatar}`
                        : Avatar
                    }
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-[1.08vw] text-black font-bold uppercase">
                    {selectedConversation.user_name}
                  </h2>
                </div>
              </div>
              <div className="text-xl px-3 text-black flex gap-4 font-bold">
                {/* <SlOptionsVertical /> */}
                <div className="cursor-pointer">
                  <FaPhoneAlt />
                </div>
                <div className="text-xl cursor-pointer text-balck font-bold">
                  <SlOptionsVertical />
                </div>
              </div>
            </div>
          </>

          <Messages />
          <>
            <div className="w-full bg-white absolute bottom-0">
              <form onSubmit={handleSubmit} className="px-4 my-3">
                <div className="w-full flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="type a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border bg-white w-full text-sm rounded-lg p-2.5 text-black"
                    id=""
                  />

                  <button
                    type="submit"
                    className="bg-[#012F34] text-white text-lg p-3 rounded-full cursor-pointer justify-center flex items-center pe-3"
                  >
                    {loading ? (
                      <div className="loading loading-spinner"></div>
                    ) : (
                      <IoIosSend />
                    )}
                  </button>
                </div>
              </form>
            </div>
          </>
        </div>
      )}
    </>
  );
};

export default ChatWindow;

const NoChatSelected = () => {
  return (
    <div className="flex  h-[70vh] justify-center items-center">
      <div>
        <div className="h-40 w-40">
          <img src={empty} className="h-full w-full object-cover" alt="" />
        </div>
        <p className="mt-3 text-black">Select a convo to chat</p>
      </div>
    </div>
  );
};
