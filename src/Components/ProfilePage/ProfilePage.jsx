import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../contexts/User/UserContext";
import Avatar from "../../images/default_avatar.webp";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GiShadowFollower } from "react-icons/gi";
import { FaPenToSquare } from "react-icons/fa6";
import moment from "moment";
import axios from "axios";
import { baseUrl } from "../../utils";
import Listed from "../../images/no-publications.webp";
import ProductCard from "../ProductList/ProductCard";
import { MdDelete } from "react-icons/md";
const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState({});
  const [posts, setPosts] = useState([]);
  const { user } = useContext(UserContext);

  const { user_id } = useParams();
  useEffect(() => {
    axios
      .get(`${baseUrl}users/get-users/${user_id}`)
      .then((res) => {
        console.log(res.data.data);
        setUserInfo(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get(`${baseUrl}products/get-products`)
      .then((res) => {
        console.log(res.data.data);
        const postData = res.data.data;
        console.log("posts", postData);
        const filteredPost = postData.filter((post) => post.userId === user_id);
        console.log(filteredPost);
        setPosts(filteredPost)
      })
      .catch((err) => console.log(err));
  }, []);

  // console.log(user);
  const navigate = useNavigate();

  return (
    <div className="flex items-start realtive p-10 mx-auto my-0 max-w-[1340px]">
      <div className="w-[25%]">
        <div className="flex items-center justify-start">
          <div className="profile-image w-32 h-32 overflow-clip rounded-full">
            <img
            loading="lazy"
              src={
                userInfo.avatar
                  ? `https://olx-backend-ebon.vercel.app/uploads/users/${
                      userInfo.avatar ? userInfo.avatar : user.avatar
                    }`
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
              {userInfo.user_name ? userInfo.user_name : user.user_name}
            </p>
          </div>
          <div className="flex items-start flex-col gap-4 my-4">
            <div className="flex items-center gap-2 text-[1vw] roboto font-regular text-[#002f34]">
              <div>
                <FaRegCalendarAlt />
              </div>
              <p>
                Member since{" "}
                {moment(
                  userInfo.created_at ? userInfo.created_at : user.created_at
                ).format("Do MMM YYYY")}
              </p>
            </div>
            <div className="flex items-center gap-2 text-[1vw] roboto font-regular text-[#002f34]">
              <div>
                <GiShadowFollower />
              </div>
              <div>
                <span>
                  <span className="font-medium">0 </span>Followers
                </span>{" "}
                <span className="text-gray-300">|</span>{" "}
                <span>
                  <span className="font-medium">0 </span> Following
                </span>
              </div>
            </div>
            {user._id === userInfo._id && (
              <button
                onClick={() => navigate("/editprofile")}
                className="text-white mt-3 bg-[#002f34] py-2 px-4 rounded-md flex gap-2 items-center justify-center roboto font-medium w-full capitalize"
              >
                <div className="text-white">
                  <FaPenToSquare />
                </div>{" "}
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="w-[75%]">
        <div className="mx-auto my-0 max-w-[1340px] px-8 py-6">
          <h1 className="text-2xl font-bold roboto">Posts</h1>
          {posts.lenght!==0 ? (
            <div className="flex justify-start gap-4 flex-wrap mt-4">
              {posts &&
                posts.map((post, i) => {
                  return (
                    <div className="relative" key={i}>
                      {/* <div
                  onClick={() => deleteFav(fav._id)}
                  className="p-2  absolute right-[10%] top-[8%] cursor-pointer bg-white z-[9] rounded-full"
                >
                  <div className="text-2xl">
                    <MdDelete />
                  </div>
                </div> */}
                      <div
                        onClick={() =>
                          navigate(`/single_page/${post._id}`)
                        }
                      >
                        <ProductCard
                          title={post.title}
                          location={post.location}
                          price={post.price}
                          day={moment(post.created_at).format("Do MMM YYYY")}
                          thumbnail={
                            "https://olx-backend-pexw.onrender.com/uploads/product/" +
                            post.thumbnail
                          }
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <>
              <div className="flex justify-center items-center p-4">
                <div className="flex flex-col justify-center items-center gap-4">
                  <div className="w-full">
                    <img src={Listed} alt="" className="h-full w-full cover" />
                  </div>
                  <div className="flex items-center gap-2 flex-col">
                    <h1 className="text-[1.2vw] font-bold roboto text-[#002f34]">
                      You haven't listed anything yet
                    </h1>
                    <p className="text-[1.1vw] font-normal text-[#002f34]">
                      Let go of what you don't use anymore
                    </p>
                    <button
                      onClick={() => navigate("/post")}
                      className="text-white mt-3 bg-[#002f34] py-3 px-4 rounded-md flex gap-2 items-center justify-center roboto font-medium  capitalize"
                    >
                      Start Selling
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
