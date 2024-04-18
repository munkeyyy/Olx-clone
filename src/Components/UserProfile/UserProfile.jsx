import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/User/UserContext";
import Avatar from "../../images/default_avatar.webp";

const UserProfile = () => {
  const { user } = useContext(UserContext);
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="relative">
      <div className="profile-image w-12">
        <img src={Avatar} className="object-cover h-full w-full" alt="" />
      </div>
      <div className="profile-info absolute bg-white rounded-sm min-w-[300px]  left-[-14rem]  bottom-[-310%] shadow-md">
        <div className="p-4">

        <div className="flex items-center gap-4">
          <div className="profile-image w-16">
            <img src={user.avatar?`http://loaclhost8000/uploads/users/${user.avatar}`:Avatar} className="object-cover h-full w-full" alt="" />
          </div>
          <p className="capitalize text-xl font-bold roboto">{user.user_name}</p>
        </div>
        <button className="text-white mt-3 bg-[#002f34] py-2 px-4 rounded-md roboto font-medium w-full capitalize">
            view Profile
        </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
