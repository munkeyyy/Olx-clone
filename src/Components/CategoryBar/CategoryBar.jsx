import React, { useContext, useEffect, useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import axios from "axios"
import SubCatData from "./SubCatData";
import { baseUrl } from "../../utils";
import { SearchContext } from "../../contexts/Search/SearchContext";

const CategoryBar = () => {
    const[isRotating, setIsRotating]=useState(false)
    const [categories, setCategories]= useState([])
    const {getData}= useContext(SearchContext)
    useEffect(()=>{
        axios.get(baseUrl+"categories/get-categories")
        .then((res)=>setCategories(res.data.data))
        .catch((err)=>console.log(err))
    },[])
  return (
    <div className=" relative flex gap-8 justify-start py-1 px-32 shadow">
      <button onClick={()=>{setIsRotating(!isRotating)}} className="flex roboto items-center  gap-2 text-[1vw] font-bold uppercase">
        All Categories
        <span className={`transition-[all.5s] ${isRotating?"rotate-180":"rotate-0"}`}>
          <IoChevronDownOutline size={"1.5rem"} />
        </span>
      </button>
      <div className={`bg-white z-[11] py-10 px-4 absolute left-[20%] shadow top-[20%] translate-x-[-12%] translate-y-[4%] ${isRotating?"block":"hidden"}`}>
            <SubCatData/>
      </div>

      <ul className="flex items-center gap-10 list-none">
            {categories.map((category,i)=>(
                <li onClick={()=>getData(category.title)} className="text-[.9vw] roboto cursor-pointer  text-black font-normal transition-[all.8s] hover:text-[#00a49f]" key={i}>{category.title}</li>
            ))}
      </ul>
    </div>
  );
};

export default CategoryBar;
