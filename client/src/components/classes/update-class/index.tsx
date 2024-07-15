/* eslint-disable react-hooks/exhaustive-deps */
import { getApi, patchApi } from "@/apis";
import { IClass } from "@/types/class.type";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

type FormData = {
  title: string;
  description: string;
  classNo: number;
};

const UpdateClassContent = () => {
  const router = useRouter();
  const { query } = router;
  const [currentClass, setCurrentClass] = useState<IClass | null>(null);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleUpdateClass: SubmitHandler<FormData> = async (data) => {
    try {
      const result: any = await patchApi(`class/update/${query?.id}`, data);
      if (result?.success == true) {
        toast.success(result?.message);
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Failed to update",
          text: `Something went wrong to update: ${
            result?.error?.message || ""
          }`,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Oops",
        text: "Something went wrong to update",
      });
    }
  };

  const fetchClass = async () => {
    try {
      const result = await getApi(`class/single/${query?.id}`);
      setCurrentClass(result?.data);
    } catch (error: any) {
      setError(error?.message);
    }
  };

  useEffect(() => {
    if (query.id) {
      fetchClass();
    }
  }, [query.id]);

  return (
    <div className="max-w-md mx-auto bg-gray-200 p-5 rounded-md">
      {error ? (
        <div>
          <h3>There was an error</h3>
          <p>Error: {error}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(handleUpdateClass)} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Class title:
            </label>
            <input
              id="title"
              type="text"
              defaultValue={currentClass?.title}
              {...register("title", {
                required: "Title is required",
              })}
              className={`w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="classNo"
              className="block text-sm font-medium text-gray-700"
            >
              Class no:
            </label>
            <input
              id="classNo"
              type="number"
              defaultValue={currentClass?.classNo}
              {...register("classNo", {
                required: "Class no is required",
              })}
              className={`w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 ${
                errors.classNo ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.classNo && (
              <p className="mt-1 text-sm text-red-600">
                {errors.classNo.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Class description:
            </label>
            <textarea
              id="description"
              defaultValue={currentClass?.description}
              {...register("description", {
                required: "Description is required",
              })}
              className={`w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          >
            Save changes
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateClassContent;
