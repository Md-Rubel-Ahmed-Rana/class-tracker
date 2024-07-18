import { patchApi, postApi } from "@/apis";
import GetHead from "@/components/shared/HeadTag";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

type FormData = {
  studentId: string;
  password: string;
};

const ChangeStudentPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChangePassword: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    try {
      const result: any = await patchApi("student/change-password", data);
      if (result?.success == true) {
        router.push("/");
        toast.success(result?.message);
        setLoading(false);
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Failed to change password",
          text: `Something went wrong: ${result?.error?.message || ""}`,
        });
        setLoading(false);
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Oops",
        text: "Something went wrong",
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const password = watch("password");
  const studentId = watch("studentId");
  const isEqual = password === studentId;

  return (
    <>
      <GetHead
        title="Change Password - Class Tracker"
        description="This class tracker Classes page"
        keywords="ADC, Class Tracker"
      />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-3">
        <div className="w-full max-w-md p-3 lg:p-8 space-y-6 bg-white rounded shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-700">
            Change your password
          </h2>
          <form
            onSubmit={handleSubmit(handleChangePassword)}
            className="space-y-6"
          >
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
                  minLength: 6,
                })}
                className={`w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
              {password && studentId && isEqual && (
                <p className="mt-1 text-sm text-red-600">
                  Student ID and password should not be same
                </p>
              )}
            </div>
            <button
              disabled={loading || isEqual}
              type="submit"
              className={`w-full px-4 py-2  text-sm lg:text-lg font-medium rounded-md  text-white ${
                loading || isEqual
                  ? "bg-gray-600 cursor-not-allowed"
                  : " bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
              } `}
            >
              {loading ? "One moment please..." : "Save changes"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangeStudentPassword;
