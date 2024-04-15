import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../utils";
import ProductCard from "./ProductCard";
import Loader from "../Loader";

const ProductList = () => {
  const [proData, setProData] = useState([]);
  const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get(`${baseUrl}products/get-products`)
      .then((res) => {
        setProData(res.data.data);
        setLoading(false);
        console.log(res.data.data)
      })
      .catch((err) => console.log(err));
  }, []);
//   const handlePage=()=>{
//     setPage((prev)=>prev+1)
//     console.log("page",page)
//     console.log(page, proData)
//   }
  return (
    <div className="mx-auto my-0 max-w-[1280px] py-6">
      <h1 className="text-black font-medium text-[1.4vw] roboto">
        Fresh Recommendations
      </h1>
      <>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="flex justify-start gap-4 flex-wrap mt-4">
              {proData &&
                proData.map((product, i) => (
                  <div key={i}>
                    <ProductCard
                      title={product.title}
                      price={product.price}
                      location={product.location}
                      day={product.day}
                      thumbnail={
                        "http://localhost:8001/uploads/product/" +
                        product.thumbnail
                      }
                    />
                  </div>
                ))}
            </div>
            {/* <button onClick={handlePage} className="py-2 transition-[all.8s] px-6 mx-auto border-2 border-black rounded-md bg-white text-black roboto font-medium text-[1.2vw] mt-4 active:scale-[.98]">Load More</button> */}
          </>
        )}
      </>
    </div>
  );
};

export default ProductList;
