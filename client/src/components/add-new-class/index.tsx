"use client";
import { INewClass } from "@/types/newClass.type";
import React from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";

const students = [
  {
    id: "5464895",
    name: "Habibur Rahman",
  },
  {
    id: "5464895396345634",
    name: "Salman Ahmed Khan",
  },
  {
    id: "546445345895",
    name: "Rahman",
  },
  {
    id: "546489dfh dfgh5396345634",
    name: "Ahmed Khan",
  },
];

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

const AddNewClassPage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<INewClass>({
    defaultValues: {
      presentStudents: [],
      absenceStudents: [],
    },
  });

  const {
    fields: presentFields,
    append: appendPresent,
    remove: removePresent,
  } = useFieldArray({
    control,
    name: "presentStudents",
  });

  const {
    fields: absentFields,
    append: appendAbsent,
    remove: removeAbsent,
  } = useFieldArray({
    control,
    name: "absenceStudents",
  });

  const handleAddNewClass: SubmitHandler<INewClass> = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.error("Error creating class:", error);
    }
  };

  const remainingStudents = students.filter(
    (student) =>
      !presentFields.some((present) => present.name === student.name) &&
      !absentFields.some((absent) => absent.name === student.name)
  );

  return (
    <div className="p-20 flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Class</h2>
        <form onSubmit={handleSubmit(handleAddNewClass)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Class Title
            </label>
            <input
              autoFocus
              id="title"
              type="text"
              {...register("title", { required: "Class title is required" })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.title ? "border-red-500" : ""
              }`}
              placeholder="Enter class title"
            />
            {errors.title && (
              <p className="text-red-500 text-xs italic mt-2">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.description ? "border-red-500" : ""
              }`}
              placeholder="Enter class description"
            />
            {errors.description && (
              <p className="text-red-500 text-xs italic mt-2">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="date"
            >
              Date
            </label>
            <input
              id="date"
              type="date"
              {...register("date", { required: "Date is required" })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.date ? "border-red-500" : ""
              }`}
            />
            {errors.date && (
              <p className="text-red-500 text-xs italic mt-2">
                {errors.date.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="date"
            >
              Class No.
            </label>
            <input
              id="classNo"
              type="number"
              {...register("classNo", { required: "Class no is required" })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.classNo ? "border-red-500" : ""
              }`}
            />
            {errors.classNo && (
              <p className="text-red-500 text-xs italic mt-2">
                {errors.classNo.message}
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
              {...register("batchNo", { required: "Batch is required" })}
              className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select a batch</option>
              {batches.map((batch) => (
                <option key={batch.id} value={batch.id}>
                  <span>{batch.batchNo}</span> | <span>{batch.name}</span>
                </option>
              ))}
            </select>
            {errors.batchNo && (
              <p className="text-red-500 text-xs italic mt-2">
                {errors.batchNo.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Present Students
            </label>
            {presentFields.map((item, index) => (
              <div key={item.id} className="flex mb-2">
                <input
                  readOnly
                  type="text"
                  {...register(`presentStudents.${index}.name`, {
                    required: "Student name is required",
                  })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button
                  type="button"
                  onClick={() => removePresent(index)}
                  className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Remove
                </button>
              </div>
            ))}
            <select
              onChange={(e) => {
                if (e.target.value) {
                  appendPresent({ name: e.target.value });
                  e.target.value = "";
                }
              }}
              className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select student to add</option>
              {remainingStudents.map((student) => (
                <option key={student.id} value={student.name}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Absent Students
            </label>
            {absentFields.map((item, index) => (
              <div key={item.id} className="flex mb-2">
                <input
                  readOnly
                  type="text"
                  {...register(`absenceStudents.${index}.name`, {
                    required: "Student name is required",
                  })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button
                  type="button"
                  onClick={() => removeAbsent(index)}
                  className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Remove
                </button>
              </div>
            ))}
            <select
              onChange={(e) => {
                if (e.target.value) {
                  appendAbsent({ name: e.target.value });
                  e.target.value = "";
                }
              }}
              className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select student to add</option>
              {remainingStudents.map((student) => (
                <option key={student.id} value={student.name}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Class
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewClassPage;
