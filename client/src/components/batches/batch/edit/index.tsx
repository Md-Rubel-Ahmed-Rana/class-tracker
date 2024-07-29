/* eslint-disable react-hooks/exhaustive-deps */
import { getApi, patchApi } from "@/apis";
import { AppContext } from "@/context/AppProvider";
import { IBatch } from "@/types/batch.type";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const UpdateClassContent = () => {
  const { setRefetchBatch } = useContext(AppContext);
  const router = useRouter();
  const { query } = router;
  const [currentBatch, setCurrentBatch] = useState<IBatch | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [initialName, setInitialName] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<IBatch>();

  const handleUpdateClass: SubmitHandler<IBatch> = async (data) => {
    setIsLoading(true);
    try {
      const result: any = await patchApi(`batch/update/${query?.id}`, data);
      if (result?.success == true) {
        toast.success(result?.message);
        setIsLoading(false);
        setRefetchBatch((prev: any) => !prev);
        router.push("/batches");
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Failed to update",
          text: `Something went wrong to update: ${
            result?.error?.message || ""
          }`,
        });
        setIsLoading(false);
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Oops",
        text: "Something went wrong to update",
      });
      setIsLoading(false);
    }
  };

  const fetchBatch = async () => {
    try {
      const result = await getApi(`batch/single/${query?.id}`);
      setCurrentBatch(result?.data);
      setInitialName(result?.data?.name || "");
      setValue("name", result?.data?.name || "");
    } catch (error: any) {
      setError(error?.message);
    }
  };

  useEffect(() => {
    if (query.id) {
      fetchBatch();
    }
  }, [query.id]);

  const isNameUpdated = watch("name") !== initialName;

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="bg-gray-200 w-full  lg:w-1/3  mx-auto p-5 rounded-md">
        {error ? (
          <div>
            <h3>There was an error</h3>
            <p>Error: {error}</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(handleUpdateClass)}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Batch name:
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
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="batchNo"
                className="block text-sm font-medium text-gray-700"
              >
                Batch no:
              </label>
              <input
                id="batchNo"
                readOnly
                disabled
                type="text"
                defaultValue={currentBatch?.batchNo}
                {...register("batchNo")}
                className="w-full px-3 py-2 mt-1 cursor-not-allowed border rounded-md shadow-sm bg-gray-400 border-gray-300"
              />
            </div>

            <button
              disabled={!isNameUpdated || isLoading}
              type="submit"
              className={`w-full px-4 py-2 font-medium text-white ${
                !isNameUpdated || isLoading
                  ? "bg-gray-500 hover:bg-gray-600 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
              } rounded-md `}
            >
              {isLoading ? "Submitting changes" : "Save changes"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateClassContent;
