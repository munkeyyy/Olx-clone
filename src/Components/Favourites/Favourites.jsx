import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/User/UserContext";
import axios from "axios";
import { baseUrl } from "../../utils";
import ProductCard from "../ProductList/ProductCard";
import moment from "moment";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import Listed from "../../images/no-favorites.webp";
const Favourites = () => {
  const { user } = useContext(UserContext);
  const [favData, setFavData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${baseUrl}favourites/get-fav/${user._id}`)
      .then((res) => {
        // console.log(res.data.data);
        setFavData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const deleteFav = (id) => {
    axios
      .delete(`${baseUrl}favourites/remove-fav/${id}`)
      .then((res) => {
        setFavData(favData.filter((fav) => fav._id !== id));

        notification.success({ message: res.data.message });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="mx-auto my-0 max-w-[1280px] px-8 py-6">
      <h1>My Favorites</h1>
      <div className="flex justify-start gap-4 flex-wrap mt-4">
        {favData && (
          favData.map((fav, i) => {
            return (
              <div className="relative" key={i}>
                <div
                  onClick={() => deleteFav(fav._id)}
                  className="p-2  absolute right-[10%] top-[8%] cursor-pointer bg-white z-[9] rounded-full"
                >
                  <div className="text-2xl">
                    <MdDelete />
                  </div>
                </div>
                <div
                  onClick={() => navigate(`/single_page/${fav.productId}`)}
                >
                  <ProductCard
                    title={fav.title}
                    location={""}
                    price={fav.price}
                    day={moment(fav.created_at).format("Do MMM YYYY")}
                    thumbnail={
                      "http://localhost:8001/uploads/product/" + fav.image
                    }
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Favourites;
