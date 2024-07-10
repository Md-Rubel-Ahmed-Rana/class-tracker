"use client";
import { INewBatch } from "@/types/newBatch.type";
import { SubmitHandler, useForm } from "react-hook-form";

const AddNewBatchPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewBatch>({ mode: "onChange" });

  const handleAddNewBatch: SubmitHandler<INewBatch> = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.error("Error creating batch:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
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
              htmlFor="batch-no"
            >
              Batch Number
            </label>
            <input
              id="batch-no"
              type="text"
              placeholder="Enter batch no"
              {...register("batchNo", { required: "Batch no is required" })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.batchNo ? "border-red-500" : ""
              }`}
            />
            {errors.batchNo && (
              <p className="text-red-500 text-xs italic mt-2">
                {errors.batchNo.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Batch
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewBatchPage;
