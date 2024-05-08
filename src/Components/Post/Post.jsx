import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../utils";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);

  useEffect(() => {
    axios
      .get(`${baseUrl}categories/get-categories`)
      .then((res) => {
        setCategories(res.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCategoryClick = (index,id) => {
    setSelectedCategoryIndex(index);
    navigate(`/attributes/${id}`)
  };
  const navigate=useNavigate()
  return (
    <div className="max-w-[1280px] mx-auto p-4  flex items-start md:justify-center gap-4">
      <div className="mt-12 grow md:grow-0">
        <h1 className="text-center text-black roboto text-3xl my-4 font-bold">
          Add Your Product
        </h1>
        <div className="overflow-hidden w-full rounded-md border mt-8 border-gray-400">
          <div className="p-4 border-b border-gray-400">
            <h2 className="text-sm font-semibold text-black uppercase">
              choose a category
            </h2>
          </div>

          <div>
            {categories.map((cat, i) => (
              <div className="flex items-start w-full justify-start" key={i}>
                <div
                  className={`p-3 border-r border-b text-gray-400 border-gray-400 flex justify-between w-full md:w-[800px] hover:bg-gray-200  items-center cursor-pointer ${
                    selectedCategoryIndex === i ? "bg-gray-200" : ""
                  }`}
                  onClick={() => handleCategoryClick(i,cat._id)}
                >
                  <span className="text-[4vw] md:text-[1.06vw]">{cat.title}</span>{" "}
                  <div>
                    <FaAngleRight />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
