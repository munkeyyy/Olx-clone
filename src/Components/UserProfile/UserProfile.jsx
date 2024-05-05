import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/User/UserContext";
import Avatar from "../../images/default_avatar.webp";
import { useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import { RiLockPasswordFill } from "react-icons/ri";
import { LoginContext } from "../../contexts/Login/LoginContext";
import { Modal } from "antd";
import LogIn from "../LogIn/LogIn";
import SingnUp from "../SignUp/SingnUp";
const UserProfile = ({onClose}) => {
  const { user } = useContext(UserContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  // useEffect(()=>{
  //   getLocation()
  // },[])

  return (
    <div className="grow md:grow-0 relative">
      <div
        onClick={() => setIsVisible(!isVisible)}
        className="profile-image hidden md:block w-12 h-12 rounded-full overflow-clip"
      >
        <img
          loading="eager"
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
            className="text-[#002f34] py-4 hover:bg-[#00ffff43] cursor-pointer font-medium text-[5vw] md:text-[1.2vw] flex items-center gap-6"
          >
            <div className="md:text-[1.5vw]">
              <FaRegHeart />
            </div>
            <span>Favourites</span>
          </div>
          <div
            onClick={() => {
              localStorage.clear();
              setIsLoggedIn(false);
            }}
            className="text-[#002f34] py-4 hover:bg-[#00ffff43] cursor-pointer font-medium text-[5vw] md:text-[1.2vw] flex items-center gap-6"
          >
            <div className="md:text-[1.5vw]">
              <RiLogoutBoxLine />
            </div>
            <span>Logout</span>
          </div>
          <div className="text-[#002f34] py-4 hover:bg-[#00ffff43] cursor-pointer font-medium text-[5vw] md:text-[1.2vw] flex items-center gap-6">
            <div className="md:text-[1.5vw]">
              <RiLockPasswordFill />
            </div>
            <span>Change Password</span>
          </div>
        </div>
      </div>
      <div className={`profile-inf block md:hidden lg:hidden`}>
        <div>
          <div className="px-4 py-2 w-full">
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
              {user.user_name ? (
                <p className="capitalize text-xl font-bold roboto">
                  {user.user_name}
                </p>
              ) : (
                <div>
                  <h1 className="capitalize text-xl font-bold roboto">
                    Welcome to Olx!
                  </h1>
                  <p className="font-medium text-sm text-gray-400">
                    Please sign in to list or buy items
                  </p>
                </div>
              )}
            </div>
            {isLoggedIn && (
              <button
                onClick={() => {
                  navigate(`/profile/${user._id}`);
                  setIsVisible(!isVisible);
                  onClose()
                }}
                className="text-white mt-3 bg-[#002f34] py-2 px-4 rounded-md roboto font-medium w-full capitalize"
              >
                view Profile & Edit Profile
              </button>
            )}
          </div>
          <div className="p-4 border-y">
            <div
              onClick={() => {
                if (isLoggedIn) {
                  navigate("/my-favourites");
                  setIsVisible(!isVisible);
                  onClose()
                } else {
                  setIsModalOpen(true);
                }
              }}
              className="text-[#002f34] py-4 hover:bg-[#00ffff43] cursor-pointer font-medium text-[5vw] md:text-[1.2vw] flex items-center gap-6"
            >
              <div className="text-[6vw] md:text-[1.5vw]">
                <FaRegHeart />
              </div>
              <span>Favourites</span>
            </div>
            {!isLoggedIn ? (
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-white mt-3 bg-[#002f34] py-2 px-4 rounded-md roboto font-medium w-full capitalize"
              >
                Log In
              </button>
            ) : (
              <div
                onClick={() => {
                  localStorage.clear();
                  setIsLoggedIn(false);
                  
                }}
                className="text-[#002f34] py-4 hover:bg-[#00ffff43] cursor-pointer font-medium text-[5vw] md:text-[1.2vw] flex items-center gap-6"
              >
                <div className="text-[6vw] md:text-[1.5vw]">
                  <RiLogoutBoxLine />
                </div>
                <span>Logout</span>
              </div>
            )}
            {isLoggedIn&&<div className="text-[#002f34] py-4 hover:bg-[#00ffff43] cursor-pointer font-medium text-[5vw] md:text-[1.2vw] flex items-center gap-6">
              <div className="text-[6vw] md:text-[1.5vw]">
                <RiLockPasswordFill />
              </div>
              <span>Change Password</span>
            </div>}
          </div>
        </div>

        <Modal
          title={isSignedUp ? "Log In" : "Sign UP"}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
        >
          {isSignedUp ? (
            <LogIn
              setIsModalOpen={setIsModalOpen}
              setIsSignedUp={setIsSignedUp}
            />
          ) : (
            <SingnUp setIsSignedUp={setIsSignedUp} />
          )}
        </Modal>
      </div>
    </div>
  );
};

export default UserProfile;
