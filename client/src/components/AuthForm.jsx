import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const AuthForm = ({ isLogin }) => {
  // Validation schemas
  const loginValidationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const registerValidationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  return (
    <section className="max-w-5xl mx-auto">
      <div className="w-[450px] mx-auto rounded-md shadow-lg bg-red-300 p-4">
        <h2 className="text-center text-2xl mb-4">
          {isLogin ? "Login Page" : "Register Page"}
        </h2>

        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
          }}
          validationSchema={
            isLogin ? loginValidationSchema : registerValidationSchema
          }
          onSubmit={(values, { setSubmitting }) => {
            if (isLogin) {
              // Handle login submission
              console.log("Login data:", values);
            } else {
              // Handle registration submission
              console.log("Register data:", values);
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              {!isLogin && (
                <div className="flex flex-col">
                  <label htmlFor="username" className="mb-2 font-semibold">
                    Username
                  </label>
                  <Field
                    name="username"
                    type="text"
                    className="p-2 border rounded"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              )}

              <div className="flex flex-col">
                <label htmlFor="email" className="mb-2 font-semibold">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className="p-2 border rounded"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="password" className="mb-2 font-semibold">
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  className="p-2 border rounded"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 bg-blue-500 text-white p-2 rounded"
              >
                {isLogin ? "Login" : "Register"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <Link
            to={isLogin ? "/register" : "/login"}
            className="text-blue-500 underline"
          >
            {isLogin ? "Register" : "Login"}
          </Link>
        </p>
      </div>
    </section>
  );
};

export default AuthForm;
