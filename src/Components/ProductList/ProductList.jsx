import axios from "axios";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { baseUrl } from "../../utils";
import ProductCard from "./ProductCard";
import Loader from "../Loader";
import { SearchContext } from "../../contexts/Search/SearchContext";
import { useNavigate } from "react-router-dom";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { UserContext } from "../../contexts/User/UserContext";
import { notification } from "antd";
import { FaPlus } from "react-icons/fa";
import { LoginContext } from "../../contexts/Login/LoginContext";
import CardSkeleton from "./CardSkeleton";

const ProductList = () => {
  const { search, loading } = useContext(SearchContext);
  const { user } = useContext(UserContext);
  const { isLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();

  const singleHand = (id) => {
    // console.log("hjvvcdv", id);
    navigate(`/single_page/${id}`);
  };

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
      // .catch((err) => console.log(err));
  };
  return (
    <div className="mx-auto relative my-0 max-w-[1280px] px-4 md:px-8 py-6">
      <h1 className="text-black font-semibold md:font-normal text-[6vw] md:text-[1.4vw] roboto">
        Fresh Recommendations
      </h1>
      <>
        <>
          <div className="flex justify-start mb-4 gap-4 flex-wrap mt-4">
            {loading ? (
              <>
                
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </>
            ) : (
              search &&
              search.map((product, i) => {
                return (
                  <>
                    <div key={i} className="grow md:grow-0 relative">
                      <div
                        onClick={() => {isLoggedIn?addFav(user._id, product._id):notification.error({message:"Login to add to favourites"})}}
                        className="p-2  absolute right-[10%] top-[8%] cursor-pointer bg-white z-[9] rounded-full"
                      >
                        <div className="text-2xl text-black">
                          <IoMdHeartEmpty />
                        </div>
                      </div>
                      {loading ? (
                        <CardSkeleton />
                      ) : (
                        <div onClick={() => singleHand(product._id)}>
                          <ProductCard
                            title={product.title}
                            price={product.price}
                            location={product.location}
                            day={product.day}
                            thumbnail={
                              "https://olx-backend-pexw.onrender.com/uploads/product/" +
                              product.thumbnail
                            }
                          />
                        </div>
                      )}
                    </div>
                  </>
                );
              })
            )}
          </div>
          {/* <button onClick={handlePage} className="py-2 transition-[all.8s] px-6 mx-auto border-2 border-black rounded-md bg-white text-black roboto font-medium text-[1.2vw] mt-4 active:scale-[.98]">Load More</button> */}
        </>
      </>
      <div className="sell  sticky bottom-8 flex justify-center z-[999] ">
        <button
          onClick={() => {
            isLoggedIn
              ? navigate("/post")
              : notification.error({ message: "Please log in first" });
          }}
          className="block md:hidden  relative roboto font-medium uppercase"
        >
          <svg
            width="104"
            height="48"
            viewBox="0 0 1603 768"
            className="_20oLV"
          >
            <g>
              <path
                fill="#fff"
                className="_32cGm _3Vwmt"
                d="M434.442 16.944h718.82c202.72 0 367.057 164.337 367.057 367.058s-164.337 367.057-367.057 367.057h-718.82c-202.721 0-367.058-164.337-367.058-367.058s164.337-367.058 367.058-367.058z"
              ></path>
              <path
                className="_32cGm _3XfCS"
                fill="#ffce32"
                d="M427.241 669.489c-80.917 0-158.59-25.926-218.705-73.004l-0.016-0.014c-69.113-54.119-108.754-131.557-108.754-212.474 0-41.070 9.776-80.712 29.081-117.797 25.058-48.139 64.933-89.278 115.333-118.966l-52.379-67.581c-64.73 38.122-115.955 90.98-148.159 152.845-24.842 47.745-37.441 98.726-37.441 151.499 0 104.027 50.962 203.61 139.799 273.175h0.016c77.312 60.535 177.193 93.887 281.22 93.887h299.699l25.138-40.783-25.138-40.783h-299.698z"
              ></path>
              <path
                fill="#23e5db"
                className="_32cGm _1DrSr"
                d="M1318.522 38.596v0c-45.72-14.369-93.752-21.658-142.762-21.658h-748.511c-84.346 0-165.764 21.683-235.441 62.713l3.118 51.726 49.245 15.865c54.16-31.895 117.452-48.739 183.073-48.739h748.511c38.159 0 75.52 5.657 111.029 16.829v0c44.91 14.111 86.594 37.205 120.526 66.792l66.163-57.68c-43.616-38.010-97.197-67.703-154.957-85.852z"
              ></path>
              <path
                fill="#3a77ff"
                className="_32cGm HKswn"
                d="M1473.479 124.453l-55.855 9.91-10.307 47.76c61.844 53.929 95.92 125.617 95.92 201.88 0 25.235-3.772 50.26-11.214 74.363-38.348 124.311-168.398 211.129-316.262 211.129h-448.812l25.121 40.783-25.121 40.783h448.812c190.107 0 357.303-111.638 406.613-271.498 9.572-31.009 14.423-63.162 14.423-95.559 0-98.044-43.805-190.216-123.317-259.551z"
              ></path>
            </g>
          </svg>
          <div className="flex absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  items-center gap-2">
            <span>
              <FaPlus />
            </span>
            <span>Sell</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ProductList;
