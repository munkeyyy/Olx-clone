import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../contexts/User/UserContext";
import Avatar from "../../images/default_avatar.webp";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GiShadowFollower } from "react-icons/gi";
import { FaPenToSquare } from "react-icons/fa6";
import moment from "moment"
const ProfilePage = () => {
  const { user } = useContext(UserContext);

  // console.log(user);
  const navigate= useNavigate()
  return (
    <div className="flex items-start gap-6 realtive p-10 mx-auto my-0 max-w-[1280px]">
      <div className="w-[25%]">
        <div className="flex items-center justify-center">
          <div className="profile-image w-32 h-32 overflow-clip rounded-full">
            <img
              src={
                user.avatar
                  ? `http://localhost:8001/uploads/users/${user.avatar}`
                  : Avatar
              }
              className="object-cover h-full w-full"
              alt=""
            />
          </div>
        </div>
        <div className="user-info my-2">
          <div>
            <p className="text-[1.3vw] font-bold capitalize roboto">
              {user.user_name}
            </p>
          </div>
          <div className="flex items-start flex-col gap-4 my-4">
            <div className="flex items-center gap-2 text-[1vw] roboto font-regular text-[#002f34]">
              <div>
                <FaRegCalendarAlt />
              </div>
              <p>Member since {moment(user.created_at).format("MMM Do YY")  }</p>
            </div>
            <div className="flex items-center gap-2 text-[1vw] roboto font-regular text-[#002f34]">
              <div>
              <GiShadowFollower/>
              </div>
              <div><span><span className="font-medium">0 </span>Followers</span> <span className="text-gray-300">|</span> <span><span className="font-medium">0 </span> Following</span></div>
            </div>
            <button
              onClick={()=>navigate("/editprofile")}
            className="text-white mt-3 bg-[#002f34] py-2 px-4 rounded-md flex gap-2 items-center justify-center roboto font-medium w-full capitalize"
          >
            <div className="text-white"><FaPenToSquare /></div> Edit Profile
          </button>
          </div>
        </div>
      </div>
      <div className="w-[75%]">
              <>
              <div>

              </div>
              </>
      </div>
    </div>
  );
};

export default ProfilePage;
