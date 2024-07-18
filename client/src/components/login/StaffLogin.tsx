import { postApi } from "@/apis";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

type FormData = {
  email: string;
  password: string;
};

const StaffLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    try {
      const result: any = await postApi("auth/login", data);
      console.log(result?.response?.status === 401);
      if (result?.success == true) {
        router.push("/dashboard");
        toast.success(result?.message);
        setLoading(false);
      } else if (result?.response?.status === 401) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: result?.response?.data?.message,
          text: "Incorrect email or password",
        });
        setLoading(false);
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Failed to login",
          text: `Something went wrong to login: ${result?.data?.message || ""}`,
        });
        setLoading(false);
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Oops",
        text: "Something went wrong to login",
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email:
        </label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "Entered value does not match email format",
            },
          })}
          className={`w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password:
        </label>
        <input
          id="password"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must have at least 6 characters",
            },
          })}
          className={`w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter your password"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <button
        disabled={loading}
        type="submit"
        className={`w-full px-4  text-sm lg:text-lg py-2 font-medium rounded-md  text-white ${
          loading
            ? "bg-gray-600 cursor-not-allowed"
            : " bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
        } `}
      >
        {loading ? "Preparing your dashboard..." : "Login as staff"}
      </button>
    </form>
  );
};

export default StaffLogin;
