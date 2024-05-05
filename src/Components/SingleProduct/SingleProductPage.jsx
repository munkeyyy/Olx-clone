import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../utils";
import axios from "axios";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { UserContext } from "../../contexts/User/UserContext";
import { IoMdHeartEmpty } from "react-icons/io";
import { notification } from "antd";
import moment from "moment";
import Avatar from "../../images/default_avatar.webp";
import { LoginContext } from "../../contexts/Login/LoginContext";
import { FaPhoneAlt } from "react-icons/fa";

const SingleProductPage = () => {
  const navigate = useNavigate();
  const location = JSON.parse(localStorage.getItem("location"));

  const [products, setProducts] = useState({});

  const { isLoggedIn } = useContext(LoginContext);

  const { _id } = useParams();
  const { user } = useContext(UserContext);
  // console.log(location)

  useEffect(() => {
    axios
      .get(`${baseUrl}products/get-products/${_id}`)
      .then((res) => {
        // console.log("data",res.data)
        setProducts(res.data.data);
        // setPath(res.data.filepath)
      })
      .catch((err) => console.log(err));
  }, []);

  // console.log(products)

  // console.log("first", user);

  const addFav = (user, product) => {
    axios
      .post(`${baseUrl}favourites/add-fav`, {
        userId: user,
        productId: product,
      })
      .then((res) => {
        // const message = res.data.message;
        notification.success({ message: res.data.message, duration: 1 });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-[rgba(242,244,245,1)]">
      <div className="max-w-[1280px] mx-auto p-4 relative flex flex-col md:flex-row items-start justify-start gap-4">
        <div className="overflow-x-clip w-full md:w-[70%]  ">
          <div className="bg-black overflow-clip md:overflow-none  rounded-lg">
            <div className="flex items-center justify-center">
              <Swiper
                // install Swiper modules

                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={200}
                slidesPerView={2.6}
                loop="true"
                navigation
                //   autoplay
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 150,
                  },
                  768: {
                    slidesPerView: 1,
                    spaceBetween: 50,
                  },
                  1024: {
                    slidesPerView: 1,
                    spaceBetween: 200,
                  },
                }}
                // onSwiper={(swiper) => console.log(swiper)}
                // onSlideChange={() => console.log("slide change")}
                //   className="flex justify-between gap-8"
              >
                {products?.images &&
                  products.images.map((elem, i) => {
                    // console.log(elem);

                    return (
                      <SwiperSlide key={i}>
                        <div className="w-full h-[80vw] md:w-[26vw] md:h-[26vw] bg-white mx-auto">
                          <img
                          loading="lazy"
                           onError={(e) => {
                            e.currentTarget.src =
                              "https://olx-backend-pexw.onrender.com/uploads/product/image%20(9)-1714453287058.jpg";
                          }}
                            src={`https://olx-backend-pexw.onrender.com/uploads/product/${elem}`}
                            className="h-full self-center object-center w-full object-cover"
                            alt="img"
                          />
                        </div>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
          </div>
          <div className="p-3 mt-4 shadow-md bg-white rounded-md border-2">
            {products.brand !== null && (
              <div className="pb-2 border-b-2">
                <h1 className="text-black font-bold text-[4vw] md:text-[1.2vw]">Details</h1>

                <div className="flex items-center justify-between">
                  <h3 className="text-[3.8vw]  md:text-[1vw] font-normal roboto text-gray-400">
                    Brand
                  </h3>
                  <h3 className="text-[3.8vw] md:text-[1vw] font-medium roboto text-gray-400">
                    {products.brand}
                  </h3>
                </div>
              </div>
            )}
            <div className="desc mt-4">
              <h1 className="text-black font-bold text-[4vw] md:text-[1.2vw]">Description</h1>
              <div className="">{products.description}</div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[30%] sticky top-[0%]">
          <div className="border-2 p-3  bg-white rounded-md">
            <div className="flex items-center justify-between">
              <h1 className="text-[5.5vw] md:text-[2.2vw] font-bold roboto">
                ₹{products.price}
              </h1>
              <div
                onClick={() => {
                  isLoggedIn
                    ? addFav(user._id, _id)
                    : notification.error({
                        message: "Please login to add to favourites",
                      });
                }}
                className="p-2   cursor-pointer bg-white z-[9] rounded-full"
              >
                <div className="text-2xl">
                  <IoMdHeartEmpty />
                </div>
              </div>
            </div>
            <div className="mt-3 capitalize">{products.title}</div>
            <div className="flex justify-between items-center text-[3vw] md:text-[.8vw] text-gray-400 font-medium mt-4">
              <p>{products.location}</p>
              <p>{moment(products.day).format("Do,MMM,YYYY")}</p>
            </div>
          </div>
          <div className="border-2 mt-2 p-3  bg-white rounded-md">
            <div
              onClick={() => navigate(`/profile/${products?.userId?._id}`)}
              className="flex cursor-pointer items-center justify-start gap-3"
            >
              <div className="profile-image w-16 h-16 overflow-clip rounded-full">
                <img
                  src= {
                    products?.userId?.avatar
                      ? `https://olx-backend-pexw.onrender.com/uploads/users/${products?.userId?.avatar}`
                      : Avatar
                  }
                 
                  className="object-cover h-full w-full"
                  alt=""
                />
              </div>
              <h1 className="text-xl roboto font-bold uppercase">
                {products?.userId?.user_name}
              </h1>
            </div>
            <div className="mt-3 capitalize flex items-center justify-center p-3 border-2 transition-[all.8s] active:scale-[.9] cursor-pointer border-black rounded-md gap-3">
              <div>
                <FaPhoneAlt />
              </div>
              <a
                className="black font-semibold"
                href={`tel:${products?.userId?.phone} `}
              >
                Take A call
              </a>
            </div>
          </div>
          <div className="border-2 mt-2 p-3  bg-white rounded-md">
            <h1 className="text-[4.8vw] md:text-[1.2vw] font-bold roboto text-balck">
              Posted In
            </h1>
            <p className="text-gray-500 mt-6 font-medium">
              {products?.location}
            </p>
          </div>
          <div className="border-2 mt-2 p-3 h-[350px]  bg-white rounded-md">
            <iframe
              className="w-full h-full"
              src={`https://maps.google.com/maps?q=${location?.lat},${location?.lon}&hl=es;z=14&amp&output=embed`}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
