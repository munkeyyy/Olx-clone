import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

const SingleProductPage = () => {
  const [products, setProducts] = useState({});
  //   const[path,setPath]=useState("")
  const { _id } = useParams();
  const { user } = useContext(UserContext);
  console.log("rohit ki single id", _id);
  useEffect(() => {
    axios
      .get(`${baseUrl}products/get-products/${_id}`)
      .then((res) => {
        console.log("rohittt", res.data.data);
        const data = res.data.data;
        setProducts(res.data.data);
        // setPath(res.data.filepath)
      })
      .catch((err) => console.log(err));
  }, []);
  console.log("first", products);
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

    <div className="max-w-[1280px] mx-auto p-4  flex items-start justify-start gap-4">
      <div className="overflow-x-clip w-[70%]  ">
        <div className="bg-black p-2 rounded-lg">
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
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log("slide change")}
              //   className="flex justify-between gap-8"
            >
              {products?.images &&
                products.images.map((elem, i) => {
                  console.log(elem);

                  return (
                    <SwiperSlide key={i}>
                      <div className="w-[26vw] bg-white mx-auto">
                        <img
                          src={`http://localhost:8001/uploads/product/${elem}`}
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
          {products.brand && (
            <div className="pb-2 border-b-2">
              <h1 className="text-black font-bold text-[1.2vw]">Details</h1>

              <div className="flex items-center justify-between">
                <h3 className="text-[1vw] font-normal roboto text-gray-400">
                  Brand
                </h3>
                <h3 className="text-[1vw] font-normal roboto text-gray-400">
                  {products.brand}
                </h3>
              </div>
            </div>
          )}
          <div className="desc mt-4">
            <h1 className="text-black font-bold text-[1.2vw]">Description</h1>
            <div className="">{products.description}</div>
          </div>
        </div>
      </div>

      <div className="w-[30%]">
        <div className="border-2 p-3  bg-white rounded-md">
          <div className="flex items-center justify-between">
            <h1 className="text-[2.2vw] font-bold roboto">₹{products.price}</h1>
            <div
              onClick={() => addFav(user._id, _id)}
              className="p-2   cursor-pointer bg-white z-[9] rounded-full"
            >
              <div className="text-2xl">
                <IoMdHeartEmpty />
              </div>
            </div>
          </div>
          <div className="mt-3 capitalize">
            {products.title}
          </div>
          <div className="flex justify-between items-center text-[.8vw] text-gray-400 font-medium mt-4">
            <p>{products.location}</p>
            <p>{moment(products.day).format('Do,MMM,YYYY')}</p>
          </div>
        </div>
        <div className="border-2 mt-2 p-3  bg-white rounded-md">
          <div className="flex items-center justify-start gap-3">
          <div className="profile-image w-20 h-20 overflow-clip rounded-full">
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
            <h1 className="text-2xl roboto font-bold uppercase">{user.user_name}</h1>


          </div>
          <div className="mt-3 capitalize">
            {products.title}
          </div>
         
        </div>
      </div>
    </div>
    </div>
  );
};

export default SingleProductPage;