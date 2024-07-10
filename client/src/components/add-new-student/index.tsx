"use client";
import { INewStudent } from "@/types/newStudent.type";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

const batches = [
  {
    id: "3467896",
    name: "Cohod",
    batchNo: "ADC0001",
  },
  {
    id: "34678987t8g6",
    name: "Cohod",
    batchNo: "ADC0002",
  },
  {
    id: "3467896fghedrt",
    name: "Cohod",
    batchNo: "ADC0003",
  },
  {
    id: "3467896rutheio5uth",
    name: "Cohod",
    batchNo: "ADC0004",
  },
];

const AddNewStudentPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewStudent>();

  const handleAddNewStudent: SubmitHandler<INewStudent> = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
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
                  <span>{batch.name}</span>|<span>{batch.batchNo}</span>
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
            type="submit"
            className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewStudentPage;
