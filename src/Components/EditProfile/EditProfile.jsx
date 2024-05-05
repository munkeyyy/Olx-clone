import React, { useContext, useState,useRef } from "react";
import { UserContext } from "../../contexts/User/UserContext";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import axios from "axios";
import { notification } from "antd";
import { baseUrl } from "../../utils";
import Avatar from "../../images/default_avatar.webp";
import { FaPencil } from "react-icons/fa6";

const EditProfile = () => {
  const { user ,setUser} = useContext(UserContext);
  console.log(user);
  // if(user == undefined){
  //   const userdata = JSON.parse(localStorage.getItem("user"))
  //   console.log(userdata)
  //   setUser(userdata)
  // }
  const [img, setImg] = useState(null);
  const imgRef = useRef();
  const navigate = useNavigate();
  const fileChange = (e, handleChange) => {
    console.log(e.target.files);
    setImg(URL.createObjectURL(e.target.files[0]));
    handleChange(e);
  };

  // const updateImage = (e)=>{
  //   const url = URL.createObjectURL(e.target.files[0])
  //   setImg(url)
  // }
  return (
    <div className="flex items-start gap-6 realtive p-0 md:p-10 mx-auto my-0 max-w-[1280px]">
      <div className="hidden md:block w-[20%] sticky top-[120px]  ">
        <div
          className={`roboto cursor-pointer my-2 text-[1.1vw] font-semibold text-black`}
        >
          Edit Profile{" "}
        </div>

        <button
          onClick={() => {
            navigate(`/profile/${user._id}`);
          }}
          className="text-black mt-3 bg-white border-[3px] border-black py-2 px-4 rounded-md roboto font-medium w-full capitalize"
        >
          view Profile
        </button>
      </div>
      <div className="w-full md:w-[80%] rounded-md md:border-2 border-[rgba(0,0,0,0.15)]">
        <div className="hidden md:block p-4">
          <h1 className="roboto text-[1.5vw] font-bold">Edit Profile</h1>
        </div>
        <div className="p-4 border-t-2 border-[rgba(0,0,0,0.15)]">
          <Formik
            initialValues={{
              user_name: user.user_name,
              email: user.email,
              avatar: `https://olx-backend-pexw.onrender.com/uploads/users/${user.avatar}`,
              phone: user.phone,
            }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }

              if (!values.user_name) {
                errors.user_name = "Please enter a User Name";
              }

              if (!values.phone) {
                errors.phone = "required";
              } else if (values.phone < 10) {
                errors.phone =
                  "Phone number should contain atleast 10 characters";
              }
              return errors;
            }}
            onSubmit={(values) => {
              // console.log(values);
              // console.log(user._id);
              const formData = new FormData();
              formData.append("user_name", values.user_name);
              formData.append("email", values.email);
              formData.append("phone", values.phone);
              // Append image file
              if (img) {
                formData.append("avatar", imgRef.current.files[0]);
              }
              console.log(formData);
              axios
                .put(`${baseUrl}users/update-user/${user._id}`,formData,{
                  headers:{
                    "Content-Type":"multipart/form-data"
                  }
                
                })
                .then((res) => {
                  console.log(formData)
                  console.log(res.data);
                  notification.success({
                    message: "Profile updated successfully",
                  });
                })
                .catch((err) => {
                  console.log(err);
                  notification.error({
                    message: "Failed to update profile",
                  });
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
                <div className="flex flex-col gap-3">
                  <h2 className="text-[5vw] md:text-[1.2vw] font-semibold">
                    Basic Information
                  </h2>
                  <div className="flex justify-start flex-row-reverse md:flex-row mb-1 md:mb-4 items-center md:items-start gap-2 md:gap-6">
                    <div className="flex flex-col w-full md:w-1/2 my-2">
                      <input
                        type="text"
                        name="user_name"
                        className="border-black border px-2 py-3 rounded-md focus-visible:outline-none focus-visible:border-2 focus-visible:border-black"
                        placeholder="user name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.user_name}
                      />
                      <span className="text-red-600 text-[.8vw] text-center">
                        {errors.user_name &&
                          touched.user_name &&
                          errors.user_name}
                      </span>
                    </div>
                    <div className="w-full  md:w-1/2 md:border-l-2 flex items-center gap-4">
                      <div className="img-upload md:h-[10vw]">
                        <label className="flex   p-2 justify-start">
                          <>
                            <div className="flex grow md:grow-0 flex-col  items-start justify-center">
                              <div className="md:w-[10vw] w-[25vw] grow md:grow-0 relative h-[25vw] md:h-[10vw] rounded-full  overflow-clip">
                                <img
                                loading="lazy"
                                  src={img?img:values.avatar?values.avatar:Avatar}
                                  className="rounded-full h-full w-full object-center object-cover"
                                  alt="avatar"
                                />
                                <div className="absolute bottom-0 flex justify-center  left-0 bg-[rgba(0,0,0,0.75)] p-2 md:p-4 text-white w-full text-[4vw] md:text-[1.5vw]">
                                  <FaPencil />
                                </div>
                              </div>
                            </div>
                            <input
                              type="file"
                              ref={imgRef}
                              name="avatar"
                              onChange={(e)=>fileChange(e,handleChange)}
                              // onChange={updateImage}
                              className="w-0 h-0"
                            />
                          </>

                          <p className="text-red-600 text-xs">
                            {errors.avatar && touched.avatar && errors.avatar}
                          </p>
                        </label>
                      </div>
                      <div className="hidden  md:block">
                        <p className="text-gray-400 text-[.8vw]">
                          Clear photos are an important way for buyers and
                          sellers to learn about each other. Be sure doesn’t
                          include any personal or sensitive info you’d rather
                          not have others see.
                        </p>
                        <h1 className="mt-2 roboto font-semibold">
                          It’s not much fun to chat with a landscape!
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="py-4 border-t-2">
                    <h2 className="text-[5vw] md:text-[1.2vw] font-semibold">
                      Contact Information
                    </h2>
                    <div className="mt-4">
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-6">
                        <div className="flex flex-col my-2 w-full md:w-[25vw]">
                          <input
                            type="number"
                            placeholder="phone number"
                            name="phone"
                            className="border-black border px-2 py-3 w-full rounded-md focus-visible:outline-none focus-visible:border-2 focus-visible:border-black"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phone}
                          />
                          <span className="text-red-600 text-[.8vw] text-center">
                            {errors.phone && touched.phone && errors.phone}
                          </span>
                        </div>
                        <p className="text-[4vw] md:text-[.9vw] font-medium text-gray-400">
                          Your number is verified!
                        </p>
                      </div>
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-6">
                        <div className="flex flex-col my-2 w-full md:w-[28vw]">
                          <input
                            type="email"
                            name="email"
                            placeholder="email"
                            className="border-black border px-2 py-3 w-full rounded-md focus-visible:outline-none focus-visible:border-2 focus-visible:border-black"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                          />
                          <span className="text-red-600 text-[.8vw] text-center">
                            {errors.email && touched.email && errors.email}
                          </span>
                        </div>
                        <p className="text-[4vw] md:text-[.9vw] font-medium text-gray-400">
                          Your Email is never shared with external parties nor
                          do we use it to spam you in any way
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="py-2 mx-auto rounded-md px-4 text-center bg-black text-white font-medium"
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
  );
};

export default EditProfile;
