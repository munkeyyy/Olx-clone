import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../utils";
import { Formik } from "formik";
import { notification } from "antd";
import { FaPencil } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedCat, setSelectedCat] = useState({});
  const [pictures, setPictures] = useState([]);
  useEffect(() => {
    axios
      .get(`${baseUrl}categories/get-categories/${id}`)
      .then((res) => {
        console.log(res.data.data);
        setSelectedCat(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

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
  return (
    <div className="max-w-[1280px] mx-auto p-4  flex items-start justify-center gap-4">
      <div className="mt-8">
        <h1 className="text-center text-black roboto text-3xl my-4 font-bold">
          Add Your Product Details
        </h1>
        <div className="overflow-hidden w-full rounded-md border py-4 border-gray-400">
          <div className="p-4 border-b border-gray-400">
            <h2 className="text-sm font-bold text-black uppercase">
              Selected category
            </h2>
            <div className="mt-6 flex items-center gap-4">
              <p className="text-xs text-gray-400 font-medium">{`${selectedCat.title} /`}</p>
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
                location: "",
                category: "",
                subcategory: "",
                images: [],
                userId: "",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.title) {
                  errors.title = "Title is Required";
                } else if (values.title.length < 70) {
                  errors.title = "Title cannot exceed more than  70 characters";
                }

                if (!values.description) {
                  errors.description = "description is required";
                } else if (values.description < 4096) {
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
                if (!values.brand) {
                  errors.brand = "Please select a brand";
                }
                if (!values.images) {
                  errors.images = "this field is mandatory";
                }

                return errors;
              }}
              onSubmit={(values) => {
                console.log(values);
                axios
                  .post(`${baseUrl}products/add-products`, {
                    email: values.email,
                    password: values.password,
                  })
                  .then((res) => {
                    console.log(res.data.data);
                    notification.success({
                      message: res.data.message,
                    });
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("user", JSON.stringify(res.data.data));

                    navigate("/");
                  })
                  .catch((err) => {
                    notification.error({ message: err.response.data.message });
                  });
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
                    <div className="w-[600px] p-6">
                      <h2 className="text-lg font-bold text-black uppercase">
                        Include some deatils
                      </h2>
                      <div className="flex flex-col mt-3 gap-3">
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
                    <div className="w-[600px] p-6">
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
                    <div className="w-[600px] p-6">
                      <h2 className="text-lg font-bold text-black uppercase">
                        Upload up to 12 photos
                      </h2>
                      <div className="flex flex-wrap gap-4 mt-3">
                        {Array.from(Array(12).keys()).map((index) => (
                          <label
                            key={index}
                            htmlFor={`image-upload-${index}`}
                            className="relative cursor-pointer"
                          >
                            <div className="w-20 h-20 bg-white border  border-gray-400 flex justify-center items-center">
                              {pictures[index] ? (
                                <div className="relative h-full w-full">
                                  <img
                                    src={pictures[index]}
                                    alt={`Image ${index + 1}`}
                                    className="object-cover h-full w-full"
                                  />
                                  <div onClick={()=>handleDeleteImage(index)} className=" absolute top-1 right-1 p-0.5 flex items-center justify-center rounded-full bg-red-500 text-white">
                                    <MdDeleteOutline />
                                  </div>
                                </div>
                              ) : (
                                <FaPlus className="text-gray-500 text-xl" />
                              )}
                            </div>
                            <input
                              id={`image-upload-${index}`}
                              type="file"
                              name="images"
                              accept="image/*"
                              multiple
                              className="hidden"
                              onChange={(e) => fileChange(e, handleChange)}
                            />
                          </label>
                        ))}
                      </div>
                    </div>
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
