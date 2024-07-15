import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";
import { FilterStudentType } from "../batches/classes";
import { useState } from "react";
import Swal from "sweetalert2";
import { patchApi } from "@/apis";
import { useRouter } from "next/router";

type Props = {
  studentList: FilterStudentType[];
  classId: string;
  setStudentList: (value: FilterStudentType[]) => void;
  setSeeStudentList: (value: null | string) => void;
  setRefetchApi: (value: any) => void;
};

const ShowStudentListForAClassModal = ({
  studentList,
  setStudentList,
  setSeeStudentList,
  setRefetchApi,
  classId,
}: Props) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchedStudents, setSearchedStudents] = useState<FilterStudentType[]>(
    []
  );

  const handleChangeStudentStatus = (student: FilterStudentType) => {
    if (searchedStudents.length > 0) {
      const restStudent = studentList.filter(
        (std) => std.studentId !== student.studentId
      );
      setStudentList([
        ...restStudent,
        {
          ...student,
          status: student.status === "present" ? "absence" : "present",
        },
      ]);
      setSearchValue("");
      setSearchedStudents([]);
    } else {
      const restStudent = studentList.filter(
        (std) => std.studentId !== student.studentId
      );
      setStudentList([
        ...restStudent,
        {
          ...student,
          status: student.status === "present" ? "absence" : "present",
        },
      ]);
      setSearchValue("");
    }
  };

  const handleUpdateStudentStatus = async () => {
    const presentStudents = studentList.filter(
      (std) => std.status === "present"
    );
    const absenceStudents = studentList.filter(
      (std) => std.status === "absence"
    );

    const payload = {
      presentStudents: presentStudents.map((std) => ({
        id: std.id,
        name: std.name,
        studentId: std.studentId,
      })),
      absenceStudents: absenceStudents.map((std) => ({
        id: std.id,
        name: std.name,
        studentId: std.studentId,
      })),
    };

    try {
      const result = await patchApi(
        `class/students/update/attendance/${classId}`,
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
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Failed to update attendance",
          text: "Something went wrong to update students attendance. Please try later.",
          timer: 2000,
        });
      }
    } catch (error: any) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "OOps",
        text: error.message,
        timer: 2000,
      });
    }

    setSeeStudentList(null);
  };

  const handleSearchStudent = (searchValue: string) => {
    if (searchValue) {
      const filteredStudents = studentList?.filter((std: FilterStudentType) =>
        std?.name?.toLowerCase()?.includes(searchValue?.toLowerCase())
      );
      setSearchedStudents(filteredStudents);
    } else {
      setSearchedStudents([]);
      setStudentList(studentList);
    }
  };

  return (
    <div className="flex flex-col gap-2 bg-gray-100 shadow-md border-2 p-2 rounded-md  absolute left-0  lg:left-auto right-auto lg:right-0 top-12 z-50">
      <input
        className="border focus:border-blue-600 focus:outline-blue-700 p-2 rounded-md"
        type="text"
        name="search"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          handleSearchStudent(e.target.value);
        }}
        placeholder="Search student"
      />
      <hr />
      <div>
        <div
          className={`${
            studentList?.length > 3
              ? "hover:overflow-y-auto overflow-hidden w-60 h-60 flex flex-col gap-3"
              : "flex flex-col gap-3"
          }`}
        >
          {searchedStudents.length <= 0 ? (
            studentList?.map((student: FilterStudentType) => (
              <div
                onClick={() => handleChangeStudentStatus(student)}
                className="bg-white p-2 mr-2 rounded-md cursor-pointer"
                key={student.studentId}
              >
                <div>
                  <div className="flex items-center gap-2">
                    {student.status === "present" ? (
                      <FaRegCheckCircle className="text-blue-500" />
                    ) : (
                      <FaRegCircle className="text-blue-500" />
                    )}

                    <span>{student.name}</span>
                  </div>
                  <span className="text-xs ml-2">{student.studentId}</span>
                </div>
              </div>
            ))
          ) : (
            <>
              {searchedStudents?.map((student: FilterStudentType) => (
                <div
                  onClick={() => handleChangeStudentStatus(student)}
                  className="bg-white p-2 mr-2 rounded-md cursor-pointer"
                  key={student.studentId}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      {student.status === "present" ? (
                        <FaRegCheckCircle className="text-blue-500" />
                      ) : (
                        <FaRegCircle className="text-blue-500" />
                      )}

                      <span>{student.name}</span>
                    </div>
                    <span className="text-xs ml-2">{student.studentId}</span>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="flex justify-between mt-4 items-center gap-3 text-white">
          <button
            onClick={() => setSeeStudentList(null)}
            className="bg-yellow-500 w-full rounded-md  py-1 text-center"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateStudentStatus}
            className="bg-blue-500  w-full rounded-md py-1 text-center"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowStudentListForAClassModal;
