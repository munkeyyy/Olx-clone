import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../utils";
import { Formik } from "formik";
import { notification } from "antd";
import { FaPencil } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { UserContext } from "../../contexts/User/UserContext";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedCat, setSelectedCat] = useState({});
  const [selectedSubCat, setSelectedSubCat] = useState("");
  const [brandsData, setBrandsData] = useState([]);
  const { user } = useContext(UserContext);
  const imgRef = useRef();
  // const [subcat, setSubcat]=useState(null)
  const [pictures, setPictures] = useState([]);
  const userLocation = JSON.parse(localStorage.getItem("location"));
  useEffect(() => {
    axios
      .get(`${baseUrl}categories/get-categories/${id}`)
      .then((res) => {
        // console.log(res.data.data);
        // setSubcat(selectedCat.subcategory)
        setSelectedCat(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  // console.log(subcat)
  // console.log("sub ", selectedCat.subcategory);

  const fileChange = (e, handleChange) => {
    const files = e.target.files;
    const newPictures = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const url = URL.createObjectURL(file);

      newPictures.push(url);
    }

    setPictures(newPictures);

    handleChange(e);
  };

  const handleDeleteImage = (index) => {
    const updatedPictures = [...pictures];
    updatedPictures.splice(index, 1);
    setPictures(updatedPictures);
  };
  const handleSubChange = (e, handleChange) => {
    // console.log("HEHJK", e.target);
    setSelectedSubCat(e.target.value);
    const filteredBrand = selectedCat?.subcategory.filter(
      (sub) => sub.title === e.target.value
    )[0]?.brand;
    // console.log("filtered", filteredBrand);
    setBrandsData(filteredBrand);
    handleChange(e);
  };
  console.log(brandsData)
  // console.log(selectedSubCat);
  const location = `${userLocation.neighbourhood}, ${userLocation.city}, ${userLocation.state}`;

  return (
    <div className="max-w-[1280px] mx-auto md:p-4  flex items-start md:justify-center gap-4">
      <div className="grow md:grow-0 md:mt-8">
        <h1 className="text-center text-black roboto text-lg md:text-3xl my-4 font-bold">
          Add Your Product Details
        </h1>
        <div className="overflow-hidden w-full rounded-md md:border py-4 border-gray-400">
          <div className="p-4 border-y md:border-b border-gray-400">
            <h2 className="text-sm font-bold text-black uppercase">
              Selected category
            </h2>
            <div className="mt-6 flex items-center gap-4">
              <p className="text-xs text-gray-400 font-medium">{`${selectedCat.title} / ${selectedSubCat}`}</p>
              <p
                onClick={() => navigate("/post")}
                className="text-black underline font-semibold cursor-pointer underline-offset-4 capitalize text-sm"
              >
                change
              </p>
            </div>
          </div>
          <div>
            <Formik
              initialValues={{
                title: "",
                description: "",
                price: "",
                location: location,
                category: id,
                subcategory: "",
                brand: brandsData.length!==0?"" :null,
                images: [],
                userId: user._id,
              }}
              validate={(values) => {
                const errors = {};
                if (!values.title) {
                  errors.title = "Title is Required";
                } else if (values.title.length > 70) {
                  errors.title = "Title cannot exceed more than  70 characters";
                }

                if (!values.description) {
                  errors.description = "description is required";
                } else if (values.description > 4096) {
                  errors.description =
                    "description cannot exceed more than  4096 characters";
                }

                if (!values.price) {
                  errors.price = "price is required";
                }

                if (!values.location) {
                  errors.location = "Please select a location";
                }
                if (!values.subcategory) {
                  errors.subcategory = "Please select a subcategory";
                }
                if(brandsData.length!==0){

                  if (!values.brand) {
                    errors.brand = "Please select a brand";
                  }
                }
                if (!values.images) {
                  errors.images = "this field is mandatory";
                }

                return errors;
              }}
              onSubmit={(values) => {
                
                try {
                  console.log(values);
                  const formData = new FormData();
                  formData.append("title", values.title);
                  formData.append("description", values.description);
                  formData.append("price", values.price);
                  formData.append("category", id);
                  formData.append("brand", values.brand);
                  formData.append("userId", user._id);
                  // console.log( "location",
                  // `${location?.neighbourhood}, ${location?.city}, ${location?.state}`)
                  formData.append(
                    "location",location
                  );
                  formData.append("subcategory", selectedSubCat);
                  const filesdata = imgRef.current.files;
                  for (let i = 0; i < filesdata.length; i++) {
                    const element = filesdata[i];

                    formData.append("images", element);
                  }

                  axios
                    .post(`${baseUrl}products/add-product`, formData, {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    })
                    .then((res) => {
                      // console.log(res.data.data);
                      notification.success({
                        message: res.data.message,
                      });
                      navigate("/")
                    })
                    .catch((err) => {
                      notification.error({
                        message: err,
                      });
                    });
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="border-b border-gray-400">
                    <div className="w-full md:w-[600px] p-6">
                      <h2 className="text-lg font-bold text-black uppercase">
                        Include some deatils
                      </h2>
                      <div className="flex flex-col mt-3 gap-3">
                        <div className="flex flex-col gap-2 my-2">
                          <label className="text-black text-xs  font-medium">
                            subcategory*
                          </label>
                          <select
                            name="subcategory"
                            className="border-gray-500 border px-2 py-3 rounded-md focus-visible:outline-none focus-visible:border-2 focus-visible:border-black"
                            onChange={(e) => handleSubChange(e, handleChange)}
                            onBlur={handleBlur}
                            value={values.subcategory}
                            id="sel1"
                          >
                            <option value="select subcategory">
                              select subcategory
                            </option>
                            {selectedCat?.subcategory &&
                              selectedCat.subcategory.map((sub, i) => (
                                <option key={i} value={sub.title}>
                                  {sub.title}
                                </option>
                              ))}
                          </select>
                          <span className="text-red-600 text-[.8vw] text-center">
                            {errors.subcategory &&
                              touched.subcategory &&
                              errors.subcategory}
                          </span>
                        </div>
                        {brandsData.length!==0 && (
                          <div className="flex flex-col gap-2 my-2">
                            {/* {console.log(selectedCat.subcategory)} */}
                            <label className="text-black txext-xs  font-medium">
                              Brand*
                            </label>
                            <select
                              name="brand"
                              className="border-gray-500 border px-2 py-3 rounded-md focus-visible:outline-none focus-visible:border-2 focus-visible:border-black"
                              onChange={(e) => {
                                handleChange(e);
                                values.brand = e.target.value; // Update the value manually
                              }}
                              onBlur={handleBlur}
                              value={values.brand}
                            >
                              <option value="">Select Brand</option>
                              {brandsData &&
                                brandsData?.map((elem, j) => {
                                  // console.log("barnd", elem?.brand);
                                  return (
                                    <option key={j} value={elem?.title}>
                                      {elem?.title}
                                    </option>
                                  );
                                })}
                            </select>
                            <span className="text-red-600 text-[.8vw] text-center">
                              {errors.brand && touched.brand && errors.brand}
                            </span>
                          </div>
                        )}
                        <div className="flex flex-col gap-2 my-2">
                          <label className="text-black text-xs  font-medium">
                            Add Title*
                          </label>
                          <input
                            type="text"
                            name="title"
                            placeholder="Add Title Here...."
                            autoComplete="off"
                            className="border-gray-500 border px-2 py-3 rounded-md focus-visible:outline-none focus-visible:border-2 focus-visible:border-black"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.title}
                          />
                          <span className="text-red-600 text-[.8vw] text-center">
                            {errors.title && touched.title && errors.title}
                          </span>
                        </div>
                        <div className="flex flex-col gap-2 my-2">
                          <label className="text-black text-xs  font-medium">
                            Description*
                          </label>
                          <input
                            type="text"
                            name="description"
                            placeholder="Enter a description"
                            className="border-gray-500 border px-2 py-3 rounded-md focus-visible:outline-none focus-visible:border-2 focus-visible:border-black"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.description}
                          />
                          <span className="text-red-600 text-[.8vw] text-center">
                            {errors.description &&
                              touched.description &&
                              errors.description}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-b border-gray-400">
                    <div className="w-full md:w-[600px] p-6">
                      <h2 className="text-lg font-bold text-black uppercase">
                        Set a price
                      </h2>
                      <div className="flex flex-col mt-3 gap-3">
                        <div className="flex flex-col gap-2 my-2">
                          <label className="text-black text-xs  font-medium">
                            price*
                          </label>
                          <div className="flex items-center border border-gray-400 rounded py-3">
                            <div className="px-3 text-sm border-r border-gray-400 text-gray-400">
                              ₹
                            </div>
                            <input
                              type="number"
                              name="price"
                              placeholder="Add price"
                              autoComplete="off"
                              className=" border-none px-2 w-full rounded-md focus-visible:outline-none focus-visible:border-2 focus-visible:border-black"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.price}
                            />
                          </div>
                          <span className="text-red-600 text-[.8vw] text-center">
                            {errors.price && touched.price && errors.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-b border-gray-400">
                    <div className="w-full md:w-[600px] p-6">
                      <h2 className="text-lg font-bold text-black uppercase">
                        Upload up to 12 photos
                      </h2>
                      <div className="flex flex-wrap gap-4 mt-3">
                        {pictures.map((picture, index) => (
                          <div key={index} className="relative">
                            <div className="w-20 h-20 bg-white border border-gray-400 flex justify-center items-center relative">
                              <img
                                src={picture}
                                alt={`Image ${index + 1}`}
                                className="h-full object-cover w-full"
                              />
                              <button
                                type="button"
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex justify-center items-center -mt-1 -mr-1"
                                onClick={() => handleDeleteImage(index)}
                              >
                                <MdDeleteOutline />
                              </button>
                            </div>
                          </div>
                        ))}
                        {pictures.length < 12 && (
                          <label
                            htmlFor="image-upload"
                            className="relative cursor-pointer"
                          >
                            <div className="w-20 h-20 bg-white border border-gray-400 flex justify-center items-center">
                              <FaPlus className="text-gray-900 text-xl" />
                            </div>
                            <input
                              id="image-upload"
                              type="file"
                              name="images"
                              accept="image/*"
                              multiple
                              ref={imgRef}
                              className="hidden"
                              onChange={(e) => fileChange(e, handleChange)}
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="border-b border-gray-400">
                    <div className="w-full md:w-[600px] p-6">
                      <h2 className="text-lg font-bold text-black uppercase">
                        Your Location
                      </h2>
                      <div className="mt-4">
                        <div className="flex items-center  my-6 border-t pt-4 justify-between">
                          <span className="text-gray-500">State</span>
                          <span>{userLocation.state}</span>
                        </div>
                        <div className="flex items-center  my-6 border-t pt-4 justify-between">
                          <span className="text-gray-500">City</span>
                          <span>{userLocation.city}</span>
                        </div>
                        <div className="flex items-center  my-6 border-t pt-4 justify-between">
                          <span className="text-gray-500">Neighbourhood</span>
                          <span>{userLocation.neighbourhood}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="my-4 px-6">
                    <button
                      type="submit"
                      className="px-6 rounded py-2 bg-black text-white"
                    >
                      Post
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
