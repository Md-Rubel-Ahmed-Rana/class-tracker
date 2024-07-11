import { postApi } from "@/apis";
import { AppContext } from "@/context/AppProvider";
import { IBatch } from "@/types/batch.type";
import { INewStudent } from "@/types/newStudent.type";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

const AddNewStudentPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewStudent>();
  const { batches }: { batches: IBatch[] | [] } = useContext(AppContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddNewStudent: SubmitHandler<INewStudent> = async (data) => {
    setIsLoading(true);
    try {
      const result = await postApi("student/create-student", data);
      if (result?.success === true) {
        toast.success(result?.message);
        const selectedBatch = batches.find(
          (batch) => batch.batchNo === data.batchNo
        );
        router.push(
          `/batches/details/${selectedBatch?.id}?name=${selectedBatch?.name}&batchNo=${selectedBatch?.name}`
        );
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error adding student:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-50 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Student</h2>
        <form onSubmit={handleSubmit(handleAddNewStudent)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Student Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Student name is required" })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.name ? "border-red-500" : ""
              }`}
              placeholder="Enter student name"
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
              htmlFor="batchNo"
            >
              Batch Number
            </label>
            <select
              {...register("batchNo", { required: "Batch number is required" })}
              className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select a batch</option>
              {batches.map((batch) => (
                <option key={batch.id} value={batch.batchNo}>
                  {batch.batchNo}
                </option>
              ))}
            </select>
            {errors.batchNo && (
              <p className="text-red-500 text-xs italic mt-2">
                {errors.batchNo.message}
              </p>
            )}
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className={`${
              isLoading ? "bg-gray-500" : "bg-blue-500 w-full hover:bg-blue-700"
            } text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline`}
          >
            {isLoading ? "Submitting student info..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewStudentPage;
