import { postApi } from "@/apis";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

type FormData = {
  studentId: string;
};

const StudentLogin = () => {
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
      const result: any = await postApi("auth/student/login", data);
      if (result?.success == true) {
        router.push("/dashboard/student/my-info");
        toast.success(result?.message);
        setLoading(false);
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Failed to login",
          text: `Something went wrong to login: ${
            result?.error?.message || ""
          }`,
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
          htmlFor="studentId"
          className="block text-sm font-medium text-gray-700"
        >
          Student ID:
        </label>
        <input
          id="studentId"
          type="text"
          {...register("studentId", {
            required: "Student ID is required",
          })}
          className={`w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 ${
            errors.studentId ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter your student id"
        />
        {errors.studentId && (
          <p className="mt-1 text-sm text-red-600">
            {errors.studentId.message}
          </p>
        )}
      </div>

      <button
        disabled={loading}
        type="submit"
        className={`w-full px-4 py-2  text-sm lg:text-lg font-medium rounded-md  text-white ${
          loading
            ? "bg-gray-600 cursor-not-allowed"
            : " bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
        } `}
      >
        {loading
          ? "Hang tight, we're getting things ready..."
          : "Login as student"}
      </button>
    </form>
  );
};

export default StudentLogin;
