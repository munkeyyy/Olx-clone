import React from "react";
import Avatar from "../../../images/default_avatar.webp";
import { SlOptions, SlOptionsVertical } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
const Conversation = () => {
    const navigate = useNavigate()
  return (
    <div onClick={()=>navigate("/chat/123")} className="p-2 border-b-2">
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-3">
          <div className="h-16 w-16 rounded-full">
            <img src={Avatar} alt="" className="h-full w-full cover" />
          </div>
          <div>
            <h2 className="text-[1.08vw] text-black font-bold uppercase">
              Abhishek Sharma
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
