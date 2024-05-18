import axios from "axios";
import { Formik } from "formik";
import React, { useContext } from "react";
import { baseUrl } from "../../utils";
import { notification } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../../contexts/Login/LoginContext";
import { UserContext } from "../../contexts/User/UserContext";
const LogIn = ({ setIsModalOpen, setIsSignedUp }) => {
  const navigate = useNavigate();

  const { setIsLoggedIn } = useContext(LoginContext);

  const { setUser } = useContext(UserContext);

  return (
    <div className="p-4">
      <Formik
        initialValues={{ user_name: "", email: "", password: "", phone: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          if (!values.password) {
            errors.password = "password is required";
          } else if (values.password.length < 5) {
            errors.password = "Password Must Contain Atleast 5 characters";
          }
          return errors;
        }}
        onSubmit={(values) => {
          // console.log(values);
          axios
            .post(`${baseUrl}users/sign-in`, {
              email: values.email,
              password: values.password,
            })
            .then((res) => {
              setUser(res.data.data);
              console.log(res.data.data);
              notification.success({
                message: res.data.message,
                duration:1,
              });
              const logout=()=>{
                localStorage.clear()
                setIsLoggedIn(false)
                navigate("/")
                notification.error({message:"Please Log in, session expired."})
              }
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("user", JSON.stringify(res.data.data))
              setIsModalOpen(false);
              setIsLoggedIn(true);
              setTimeout(logout, 3600000)
              navigate("/");
            })
            .catch((err) => {
              notification.error({message:err.response.data.message});
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
              <div className="flex flex-col my-2">
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="border-black border px-2 py-3 rounded-md focus-visible:outline-none focus-visible:border-2 focus-visible:border-black"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <span className="text-red-600 text-[.8vw] text-center">
                  {errors.email && touched.email && errors.email}
                </span>
              </div>
              <div className="flex flex-col my-2">
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="border-black border px-2 py-3 rounded-md focus-visible:outline-none focus-visible:border-2 focus-visible:border-black"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <span className="text-red-600 text-[.8vw] text-center">
                  {errors.password && touched.password && errors.password}
                </span>
              </div>

              <button
                type="submit"
                className="py-2 mx-auto px-4 rounded-md text-center bg-black text-white font-medium"
              >
                Log In
              </button>
            </div>
          </form>
        )}
      </Formik>
      <div  className="text-black mt-4 font-semibold underline cursor-pointer  text-[1vw]">
        Don't Have An Account? <span onClick={()=>setIsSignedUp(false)} className="underline-offset-1 text-[#00a49f]">Signup</span>
      </div>
    </div>
  );
};

export default LogIn;
