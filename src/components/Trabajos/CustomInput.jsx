// CustomInput.jsx
import React from "react";
import { FaSearch } from "react-icons/fa";

const CustomInput = ({ label, name, formik, ...props }) => {
  return (
    <div className="flex-1">
      <label htmlFor={name} className="block mb-1 text-white font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
          className="w-full pr-8 pl-2 py-1 border rounded"
          {...props}
        />
        <FaSearch className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" />
      </div>
      {formik.touched[name] && formik.errors[name] && (
        <div className="text-custom-red text-sm">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default CustomInput;
