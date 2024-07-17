/* eslint-disable react-hooks/exhaustive-deps */
import { getApi, patchApi } from "@/apis";
import { IStudent } from "@/types/student.type";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

type FormData = {
  id: string;
  studentId: string;
  name: string;
  batchNo: string;
  createdAt: string;
  updatedAt: string;
};

const UpdateStudentContent = () => {
  const router = useRouter();
  const { query } = router;
  const [currentStudent, setCurrentStudent] = useState<IStudent | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const studentName = watch("name");
  const isEqualName = studentName === currentStudent?.name;

  const handleUpdateClass: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    try {
      const result: any = await patchApi(`student/update/${query?.id}`, {
        name: data.name,
      });
      if (result?.success == true) {
        toast.success(result?.message);
        router.push("/students");
        setLoading(false);
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Failed to update",
          text: `Something went wrong to update: ${
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
        text: "Something went wrong to update",
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudent = async () => {
    try {
      const result = await getApi(`student/single/${query?.id}`);
      setCurrentStudent(result?.data);
    } catch (error: any) {
      setError(error?.message);
    }
  };

  useEffect(() => {
    if (query.id) {
      fetchStudent();
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
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name:
            </label>
            <input
              id="name"
              type="text"
              defaultValue={currentStudent?.name}
              {...register("name", {
                required: "Student name is required",
              })}
              className={`w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="studentId"
              className="block text-sm font-medium text-gray-700"
            >
              Student ID:
            </label>
            <input
              readOnly
              id="studentId"
              type="text"
              value={currentStudent?.studentId}
              {...register("studentId")}
              className="w-full px-3 py-2 mt-1 border rounded-md cursor-not-allowed focus:outline-none shadow-sm border-gray-300"
            />
          </div>
          <div>
            <label
              htmlFor="batchNo"
              className="block text-sm font-medium text-gray-700"
            >
              Batch no:
            </label>
            <input
              readOnly
              id="batchNo"
              type="text"
              value={currentStudent?.batchNo}
              {...register("batchNo")}
              className="w-full px-3 py-2 mt-1 border rounded-md cursor-not-allowed focus:outline-none shadow-sm border-gray-300"
            />
          </div>
          <button
            title={
              isEqualName
                ? "You have to change name to enable this action button"
                : "You can save changes now"
            }
            disabled={isEqualName || loading}
            type="submit"
            className={`w-full px-4 py-2 font-medium text-white rounded-md ${
              isEqualName || loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-indigo-600  hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
            } `}
          >
            {isEqualName
              ? "Change name first"
              : loading
              ? "Submitting changes"
              : "Save changes"}
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateStudentContent;
