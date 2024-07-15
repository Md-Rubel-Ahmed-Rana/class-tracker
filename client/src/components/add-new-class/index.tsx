import { postApi } from "@/apis";
import { AppContext } from "@/context/AppProvider";
import { IBatch } from "@/types/batch.type";
import { INewClass } from "@/types/newClass.type";
import { IStudent } from "@/types/student.type";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";

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
  } = useFieldArray<any>({
    control,
    name: "presentStudents",
  });

  const {
    fields: absentFields,
    append: appendAbsent,
    remove: removeAbsent,
  } = useFieldArray<any>({
    control,
    name: "absenceStudents",
  });

  const { batches }: { batches: IBatch[] | [] } = useContext(AppContext);
  const [students, setStudents] = useState<IStudent[] | []>([]);
  const [selectedBatch, setSelectedBatch] = useState<IBatch | null>(null);
  const router = useRouter();

  const handleAddNewClass: SubmitHandler<INewClass> = async (data) => {
    try {
      if (students.length !== presentFields.length + absentFields.length) {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Invalid student list",
          text: `You didn't select all students. ${
            students.length - (presentFields.length + absentFields.length)
          } students unselected. Add those either to the present or absence list.`,
        });
        return false;
      }

      // Filter students between students and presentFields array as an array of students (only filtered)
      const presentStudents = students.filter((std) => {
        return presentFields.some(
          (present: any) => std.studentId === present.studentId
        );
      });
      data.presentStudents = presentStudents?.map((student: any) => {
        delete student?._id;
        return student;
      });

      // Filter students between students and absentFields array as an array of students (only filtered)
      const absenceStudents = students.filter((std) => {
        return absentFields.some(
          (absent: any) => std.studentId === absent.studentId
        );
      });
      data.absenceStudents = absenceStudents?.map((student: any) => {
        delete student?._id;
        return student;
      });

      // Your API call or further processing with the `data` object
      const result = await postApi("class/create-class", data);
      if (result?.success === true) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Class added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        router.push(
          `batches/details/${selectedBatch?.id}?name=${selectedBatch?.name}&batchNo=${selectedBatch?.batchNo}`
        );
      }
    } catch (error) {
      console.error("Error creating class:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error",
        text: "An error occurred while creating the class.",
      });
    }
  };

  const handleSelectBatch = (batchNo: string) => {
    for (let i = presentFields.length - 1; i >= 0; i--) {
      removePresent(i);
    }
    for (let i = absentFields.length - 1; i >= 0; i--) {
      removeAbsent(i);
    }

    const findBatch = batches?.find((btch) => btch?.batchNo === batchNo);
    if (findBatch) {
      setStudents(findBatch.students);
      setSelectedBatch(findBatch);
    }
  };

  const remainingStudentsFiltered = students.filter(
    (student: any) =>
      !presentFields.some(
        (present: any) => present.studentId === student.studentId
      ) &&
      !absentFields.some(
        (absent: any) => absent.studentId === student.studentId
      )
  );

  return (
    <div className="p-2 lg:p-10 flex items-center justify-center pb-20">
      <div className="bg-gray-50 p-2 lg:p-8 rounded shadow-md w-full max-w-2xl">
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
              htmlFor="classNo"
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
              onChange={(e) => handleSelectBatch(e.target.value)}
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
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Present Students
            </label>
            {presentFields.map((item: any, index) => (
              <div key={item.id} className="flex mb-2">
                <input
                  readOnly
                  type="text"
                  value={
                    students.find(
                      (student) => student.studentId === item.studentId
                    )?.name
                  }
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
                  appendPresent({ studentId: e.target.value });
                  e.target.value = "";
                }
              }}
              className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select student to add</option>
              {remainingStudentsFiltered.map((student) => (
                <option key={student.id} value={student.studentId}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Absent Students
            </label>
            {absentFields.map((item: any, index) => (
              <div key={item.id} className="flex mb-2">
                <input
                  readOnly
                  type="text"
                  value={
                    students.find(
                      (student) => student.studentId === item.studentId
                    )?.name
                  }
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
                  appendAbsent({ studentId: e.target.value });
                  e.target.value = "";
                }
              }}
              className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select student to add</option>
              {remainingStudentsFiltered.map((student) => (
                <option key={student.id} value={student.studentId}>
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
