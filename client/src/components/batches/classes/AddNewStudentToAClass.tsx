import { patchApi } from "@/apis";
import { IClass } from "@/types/class.type";
import { IStudent } from "@/types/student.type";
import { useEffect, useState } from "react";
import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";
import Swal from "sweetalert2";

type Props = {
  onClose: any;
  classItem: IClass;
  setRefetchApi: (value: any) => void;
  classes: IClass[];
  students: IStudent[];
};

const AddNewStudentToAClass = ({
  onClose,
  classItem,
  classes,
  students,
  setRefetchApi,
}: Props) => {
  const [updatedStudents, setUpdatedStudents] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const handleUpdateStudentList = (student: any) => {
    const updatedStatus = student?.status === "present" ? "absence" : "present";
    const updatedStudent = { ...student, status: updatedStatus };

    setUpdatedStudents((prevStudents: any) =>
      prevStudents.map((std: any) =>
        std.studentId === student.studentId ? updatedStudent : std
      )
    );
  };

  const handleStudentUpdateApi = async () => {
    const presentStudents = updatedStudents.filter(
      (std: any) => std.status === "present"
    );
    const absenceStudents = updatedStudents.filter(
      (std: any) => std.status === "absence"
    );

    const currentClass = classes.find((cls) => cls.id === classItem.id);

    const payload = {
      presentStudents: presentStudents
        .map((std: any) => ({
          id: std.id,
          name: std.name,
          studentId: std.studentId,
        }))
        .concat(
          currentClass?.presentStudents.map((std: any) => ({
            id: std.id,
            name: std.name,
            studentId: std.studentId,
          }))
        ),
      absenceStudents: absenceStudents
        .map((std: any) => ({
          id: std.id,
          name: std.name,
          studentId: std.studentId,
        }))
        .concat(
          currentClass?.absenceStudents.map((std: any) => ({
            id: std.id,
            name: std.name,
            studentId: std.studentId,
          }))
        ),
    };
    handleApiRequest(payload);
  };

  const handleApiRequest = async (payload: any) => {
    setLoading(true);
    try {
      const result = await patchApi(
        `class/students/update/attendance/${classItem.id}`,
        payload
      );
      if (result?.success === true) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Student attendance updated",
          timer: 2000,
        });
        setRefetchApi((prev: any) => !prev);
        setLoading(false);
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Failed to update attendance",
          text: "Something went wrong to update students attendance. Please try later.",
          timer: 2000,
        });
        setLoading(false);
      }
    } catch (error: any) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "OOps",
        text: error.message,
        timer: 2000,
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const currentClass = classes.find((cls) => cls.id === classItem.id);
    const currentStudents = currentClass?.absenceStudents.concat(
      currentClass.presentStudents
    );
    const remainingStudents = students.filter((std) => {
      return !currentStudents?.some((std2) => std.studentId === std2.studentId);
    });
    const modifiedStudents = remainingStudents.map((std) => ({
      ...std,
      status: "absence",
    }));
    setUpdatedStudents(modifiedStudents);
  }, [classes, classItem.id, students]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-2 lg:p-6 w-[96%] lg:w-3/4 max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Remaining Students</h2>
          <button
            className="bg-red-400 px-3 py-1 text-white rounded-md"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {updatedStudents.length > 0 ? (
            <ul className="mr-3">
              {updatedStudents.map((student: any) => (
                <li
                  key={student.id}
                  className="mb-2 shadow-md p-2 border-2 rounded-md"
                >
                  <p className="text-lg font-semibold">{student.name}</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleUpdateStudentList(student)}
                      className="flex items-center gap-1"
                    >
                      {student.status === "present" ? (
                        <FaRegCheckCircle className="text-blue-500" />
                      ) : (
                        <FaRegCircle className="text-blue-500" />
                      )}
                      <span className="text-lg font-serif">Present</span>
                    </button>
                    <button
                      onClick={() => handleUpdateStudentList(student)}
                      className="flex items-center gap-1"
                    >
                      {student.status === "absence" ? (
                        <FaRegCheckCircle className="text-blue-500" />
                      ) : (
                        <FaRegCircle className="text-blue-500" />
                      )}
                      <span className="text-lg font-serif">Absence</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className=" flex justify-center items-center h-32">
              <p className="text-lg lg:text-2xl font-semibold">
                No remaining students
              </p>
            </div>
          )}
        </div>
        <button
          disabled={updatedStudents.length < 1 || loading}
          onClick={handleStudentUpdateApi}
          className={`${
            updatedStudents.length < 1 || loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600"
          } w-full py-2 rounded-md text-white font-semibold font-sans mt-3`}
        >
          {loading ? "Submitting changes" : "Save changes"}
        </button>
      </div>
    </div>
  );
};

export default AddNewStudentToAClass;
