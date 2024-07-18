import { postApi } from "@/apis";
import { userRoles } from "@/constants/roles";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

type FormData = {
  name: string;
  email: string;
  role: string;
  password: string;
};

const AddNewUserPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    try {
      const result: any = await postApi("auth/register", data);
      if (result?.success == true) {
        router.push("/users");
        toast.success(result?.message);
        setLoading(false);
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Failed to register",
          text: `Something went wrong to register: ${
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
        text: "Something went wrong to register",
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-3">
      <div className="w-full max-w-md p-3 lg:p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Register new user
        </h2>
        <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
          <div>
            <label
              htmlFor="studentId"
              className="block text-sm font-medium text-gray-700"
            >
              Name:
            </label>
            <input
              id="name"
              type="text"
              {...register("name", {
                required: "Name is required",
              })}
              className={`w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
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
              })}
              className={`w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role:
            </label>
            <select
              {...register("role", {
                required: "Role is required",
              })}
              className={`w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 ${
                errors.role ? "border-red-500" : "border-gray-300"
              }`}
              name="role"
              id="role"
            >
              <option value="">Select role</option>
              {userRoles.map((role) => (
                <option value={role} key={Math.random()}>
                  {role.toUpperCase()}
                </option>
              ))}
            </select>
            {errors.role && (
              <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
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
            {loading ? "Registering..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewUserPage;
