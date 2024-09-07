import { ErrorMessage, Field } from "formik";
import React from "react";

const InputField = ({ label, name, type = "text", component = "input" }) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="mb-2 font-semibold capitalize">
      {label}
    </label>
    <Field
      name={name}
      type={type}
      as={component}
      className="p-2 border rounded"
    />
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-sm mt-1"
    />
  </div>
);

export default InputField;
