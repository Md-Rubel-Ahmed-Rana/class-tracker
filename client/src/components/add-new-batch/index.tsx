import { postApi } from "@/apis";
import { AppContext } from "@/context/AppProvider";
import { INewBatch } from "@/types/newBatch.type";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddNewBatchPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<INewBatch>({ mode: "onChange" });
  const { setRefetchBatch }: any = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAddNewBatch: SubmitHandler<INewBatch> = async (data) => {
    setLoading(true);
    try {
      const result = await postApi("batch/create-batch", data);
      if (result?.success === true) {
        setLoading(false);
        reset();
        toast.success(result?.message);
        setRefetchBatch((prev: any) => !prev);
        router.push("/batches");
      }
    } catch (error: any) {
      setLoading(false);
      console.error("Error creating batch:", error);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-50 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create New Batch
        </h2>
        <form onSubmit={handleSubmit(handleAddNewBatch)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Batch Name
            </label>
            <input
              autoFocus
              id="name"
              type="text"
              placeholder="Enter an unique name"
              {...register("name", { required: "Batch name is required" })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic mt-2">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Starting-Date"
            >
              Start Date
            </label>
            <input
              id="Starting-Date"
              type="date"
              {...register("startingDate", {
                required: "Starting date is required",
              })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.startingDate ? "border-red-500" : ""
              }`}
            />
            {errors.startingDate && (
              <p className="text-red-500 text-xs italic mt-2">
                {errors.startingDate.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Ending-Date"
            >
              End Date (Optional)
            </label>
            <input
              id="Ending-Date"
              type="date"
              {...register("endingDate")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline `}
            />
          </div>
          <button
            disabled={loading}
            type="submit"
            className={`${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"
            } text-white font-bold py-2 px-4 rounded  w-full focus:outline-none focus:shadow-outline`}
          >
            {loading ? "Please wait. Creating Batch..." : " Create Batch"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewBatchPage;
