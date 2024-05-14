import React, { useEffect, useState } from "react";
import Conversation from "../Conversation/Conversation";
import axios from "axios";
import { baseUrl } from "../../../utils";

const SideBar = () => {
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      await axios
        .get(`${baseUrl}users/get-users`)
        .then((res) => {
          setConversations(res.data.data);
          console.log(conversations)
          setLoading(false);
        })
        .catch((err) => console.log(err));
    };
    getUsers();
  }, []);
  return (
    <div className="w-full overflow-clip relative">
      <div className="header bg-[#EBEEEF] stick top-0 flex border-b-2 justify-start px-3 py-[18px]">
        <h1 className="text-xl font-bold roboto">INBOX</h1>
      </div>
      <div className="mt-2 side h-[60vh]  overflow-auto">
        {conversations.map((conversation, i) => (
          <Conversation key={conversation._id} conversation={conversation}/>
        ))}

        {/* <Conversation/>
            <Conversation/>
            <Conversation/>
            <Conversation/>
            <Conversation/> */}
      </div>
    </div>
  );
};

export default SideBar;
