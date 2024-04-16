import React from "react";
import { Formik } from "formik";
import axios from "axios";
import { baseUrl } from "../../utils";
import { notification } from "antd";
const SingnUp = () => {
  return (
    <div>
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

          if (!values.user_name) {
            errors.user_name = "Please enter a User Name";
          }

          if (!values.phone) {
            errors.phone = "required";
          } else if (values.phone < 10) {
            errors.phone = "Phone number should contain atleast 10 characters";
          }
          return errors;
        }}
        onSubmit={(values) => {
          console.log(values);
          axios
            .post(`${baseUrl}users/sign-up`, {
              user_name: values.user_name,
              email: values.email,
              password: values.password,
              phone: values.phone,
            })
            .then((res) => {
              console.log(res.data);
              notification.success({
                message: "signed up successfully",
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
            <div className="flex flex-col my-2">
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
                {errors.user_name && touched.user_name && errors.user_name}
              </span>
            </div>
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
              <span className="text-red-600 text-[.8vw] text-center">{errors.email && touched.email && errors.email}</span>
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
            <div className="flex flex-col my-2">
              <input
                type="number"
                placeholder="phone number"
                name="phone"
                className="border-black border px-2 py-3 rounded-md focus-visible:outline-none focus-visible:border-2 focus-visible:border-black"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
              />
              <span className="text-red-600 text-[.8vw] text-center">{errors.phone && touched.phone && errors.phone}</span>
            </div>

            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SingnUp;
