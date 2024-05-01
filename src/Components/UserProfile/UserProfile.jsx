import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/User/UserContext";
import Avatar from "../../images/default_avatar.webp";
import { useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import { RiLockPasswordFill } from "react-icons/ri";
import { LoginContext } from "../../contexts/Login/LoginContext";
const UserProfile = () => {
  const { user } = useContext(UserContext);
  const { setIsLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  // useEffect(()=>{
  //   getLocation()
  // },[])

  return (
    <div className="relative">
      <div
        onClick={() => setIsVisible(!isVisible)}
        className="profile-image w-12 h-12 rounded-full overflow-clip"
      >
        <img
          src={
            user.avatar
              ? `https://olx-backend-pexw.onrender.com/uploads/users/${user.avatar}`
              : Avatar
          }
          className="object-cover h-full w-full"
          alt=""
        />
      </div>
      <div
        className={`profile-info absolute bg-white rounded-sm min-w-[300px] translate-y-[11rem]   left-[-14rem]  bottom-[-410%] shadow-md ${
          isVisible ? "block" : "hidden"
        }`}
      >
        <div className="p-4">
          <div className="flex items-center gap-4">
            <div className="profile-image w-16 h-16 overflow-clip rounded-full">
              <img
                src={
                  user.avatar
                    ? `https://olx-backend-pexw.onrender.com/uploads/users/${user.avatar}`
                    : Avatar
                }
                className="object-cover h-full w-full"
                alt=""
              />
            </div>
            <p className="capitalize text-xl font-bold roboto">
              {user.user_name}
            </p>
          </div>
          <button
            onClick={() => {
              navigate("/editprofile");
              setIsVisible(!isVisible);
            }}
            className="text-white mt-3 bg-[#002f34] py-2 px-4 rounded-md roboto font-medium w-full capitalize"
          >
            view Profile & Edit Profile
          </button>
        </div>
        <div className="p-4 border-y">
          <div
            onClick={() => {
              navigate("/my-favourites");
              setIsVisible(!isVisible);
            }}
            className="text-[#002f34] py-4 hover:bg-[#00ffff43] cursor-pointer font-medium text-[1.2vw] flex items-center gap-6"
          >
            <div className="text-[1.5vw]">
              <FaRegHeart />
            </div>
            <span>Favourites</span>
          </div>
          <div
            onClick={() => {
              localStorage.clear();
              setIsLoggedIn(false);
            }}
            className="text-[#002f34] py-4 hover:bg-[#00ffff43] cursor-pointer font-medium text-[1.2vw] flex items-center gap-6"
          >
            <div className="text-[1.5vw]">
              <RiLogoutBoxLine />
            </div>
            <span>Logout</span>
          </div>
          <div className="text-[#002f34] py-4 hover:bg-[#00ffff43] cursor-pointer font-medium text-[1.2vw] flex items-center gap-6">
            <div className="text-[1.5vw]">
              <RiLockPasswordFill />
            </div>
            <span>Change Password</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
