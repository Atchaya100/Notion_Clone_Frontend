import React, { useState } from "react";
import { RegisterApi } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    passwordMatch: "",
  });

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (field, value) => {
    const updated = { ...data, [field]: value };
    setData(updated);

    let newErrors = { ...errors };

    // Email validation
    if (field === "email") {
      newErrors.email = validateEmail(value) ? "" : "Invalid email format";
    }

    // Password match validation
    if (field === "password" || field === "confirmPassword") {
      newErrors.passwordMatch =
        updated.password && updated.confirmPassword &&
        updated.password !== updated.confirmPassword
          ? "Passwords do not match"
          : "";
    }

    setErrors(newErrors);
  };

  const isFormValid =
    data.name.trim() !== "" &&
    validateEmail(data.email) &&
    data.password.length >= 6 &&
    data.confirmPassword.length >= 6 &&
    errors.email === "" &&
    errors.passwordMatch === "";

  const registerUser = async () => {
    try {
      const res = await RegisterApi(data.email, data.name, data.password);
      if (res.status === 200) navigate("/");
    } catch (err) {
      Swal.fire({
        title: "Warning",
        text: err.error,
        icon: "warning",
        background: "#1e1e1e",
        color: "#fff",
      });
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-neutral-900 p-8 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-semibold text-white mb-6 text-center">
          Register Your Account
        </h1>

        <div className="flex flex-col gap-4">

          {/* Name */}
          <div className="flex flex-col">
            <label className="text-white mb-1">Name</label>
            <input
              type="text"
              placeholder="Name"
              value={data.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="p-2 rounded-lg bg-neutral-800 text-white focus:ring-2 focus:ring-white"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-white mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={data.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="p-2 rounded-lg bg-neutral-800 text-white focus:ring-2 focus:ring-white"
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-1">{errors.email}</span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-white mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={data.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="p-2 rounded-lg bg-neutral-800 text-white focus:ring-2 focus:ring-white"
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label className="text-white mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="Re-enter password"
              value={data.confirmPassword}
              onChange={(e) =>
                handleChange("confirmPassword", e.target.value)
              }
              className="p-2 rounded-lg bg-neutral-800 text-white focus:ring-2 focus:ring-white"
            />
            {errors.passwordMatch && (
              <span className="text-red-500 text-sm mt-1">
                {errors.passwordMatch}
              </span>
            )}
          </div>

          {/* Submit */}
          <button
            disabled={!isFormValid}
            onClick={registerUser}
            className={`mt-4 w-full p-2 rounded-lg font-semibold transition 
            ${isFormValid ? "bg-white text-black hover:bg-neutral-300" : "bg-gray-600 text-gray-300 cursor-not-allowed"}
          `}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};
