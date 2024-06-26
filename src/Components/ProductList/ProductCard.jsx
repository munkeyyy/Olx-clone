import { Skeleton } from "antd";
import SkeletonImage from "antd/es/skeleton/Image";
import React, { Suspense } from "react";
import thumb from "../../images/wheelchair.jpg"

const ProductCard = ({ title, price, location, day, thumbnail }) => {
  return (
    <>
    {<div className="p-2 cursor-pointer  border w-full md:w-[29vw] lg:w-[21vw] xl:w-[18vw] bg-white overflow-clip border-gray-300 rounded-lg">
      <div className="image h-[10rem] bg-gray-300 w-full">
       
          <img
          loading="lazy"
          onError={(e)=>{
            e.currentTarget.src="https://olx-backend-pexw.onrender.com/uploads/product/image%20(9)-1714453287058.jpg"
          }}
            src={thumbnail}
            alt="thumb"
            className="h-full w-full mix-blend-multiply object-cover"
          />
      </div>
    
        <div className="mt-2">
          <h1 className="text-black roboto font-medium text-[4.5vw] md:text-[1.2vw]">
            ₹ {price}
          </h1>
          <p className="text-gray-500 roboto text-[4.8vw] md:text-[1.06vw]  capitalize">
            {title.length > 33 ? `${title.slice(0, 33)}...` : title}
          </p>
          <div className="text-gray-500 roboto uppercase flex items-center font-medium mt-4 justify-between">
            <span className="text-[3vw] md:text-[.7vw]">{location}</span>
            <span className="text-[3vw] md:text-[.7vw]">{day}</span>
          </div>
        </div>
    </div>}
    </>
  );
};

export default ProductCard;
