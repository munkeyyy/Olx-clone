import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { baseUrl } from "../../utils";
import ProductCard from "./ProductCard";
import Loader from "../Loader";
import { SearchContext } from "../../contexts/Search/SearchContext";
import { useNavigate } from "react-router-dom";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { UserContext } from "../../contexts/User/UserContext";
import { notification } from "antd";

const ProductList = () => {
  const { search, loading } = useContext(SearchContext);
  const { user } = useContext(UserContext);
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
        notification.success({ message:res.data.message,duration:1 });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="mx-auto my-0 max-w-[1280px] px-8 py-6">
      <h1 className="text-black font-normal text-[1.4vw] roboto">
        Fresh Recommendations
      </h1>
      <>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="flex justify-start gap-4 flex-wrap mt-4">
              {search &&
                search.map((product, i) => {
                  return (
                    <div key={i} className="relative">
                      <div
                        onClick={() => addFav(user._id, product._id)}
                        className="p-2  absolute right-[10%] top-[8%] cursor-pointer bg-white z-[9] rounded-full"
                      >
                        <div className="text-2xl">
                          <IoMdHeartEmpty />
                        </div>
                      </div>
                      <div onClick={() => singleHand(product._id)} >
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
                    </div>
                  );
                })}
            </div>
            {/* <button onClick={handlePage} className="py-2 transition-[all.8s] px-6 mx-auto border-2 border-black rounded-md bg-white text-black roboto font-medium text-[1.2vw] mt-4 active:scale-[.98]">Load More</button> */}
          </>
        )}
      </>
    </div>
  );
};

export default ProductList;
