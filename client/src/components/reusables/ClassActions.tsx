import Link from "next/link";
import React, { useState } from "react";
import DeleteClassButton from "./DeleteClassButton";
import { IClass } from "@/types/class.type";
import { FilterStudentType } from "../batches/classes";
import { IStudent } from "@/types/student.type";
import AddNewStudentToAClass from "../batches/classes/AddNewStudentToAClass";

type Props = {
  classItem: IClass;
  classes: IClass[];
  students: IStudent[];
  seeStudentList: string | null;
  studentList: FilterStudentType[];
  setStudentList: (values: FilterStudentType[]) => void;
  setSeeStudentList: (value: string | null) => void;
  setSearchTerm: (value: string) => void;
  setRefetchApi: (value: any) => void;
};

const ClassActions = ({
  classItem,
  classes,
  seeStudentList,
  students,
  setSeeStudentList,
  setStudentList,
  setSearchTerm,
  setRefetchApi,
}: Props) => {
  const [isShowStudents, setIsShowStudents] = useState(false);

  const handleSeeStudentList = (classId: string) => {
    if (seeStudentList === classId) {
      setSeeStudentList(null);
      setSearchTerm("");
    } else {
      setSeeStudentList(classId);
      setSearchTerm("");
    }

    const currentClass = classes?.find((cls) => cls._id === classId);
    const absenceStudents = currentClass?.absenceStudents?.map((student) => ({
      id: student.id,
      name: student.name,
      studentId: student.studentId,
      status: "absence",
    }));
    const presentStudents = currentClass?.presentStudents?.map((student) => ({
      id: student.id,
      name: student.name,
      studentId: student.studentId,
      status: "present",
    }));
    if (absenceStudents && absenceStudents?.length > 0) {
      setStudentList(absenceStudents.concat(presentStudents || []));
    } else if (presentStudents && presentStudents?.length > 0) {
      setStudentList(presentStudents.concat(absenceStudents || []));
    } else {
      setStudentList([]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => setIsShowStudents(true)}
        className="bg-blue-600 px-4 py-2 rounded-md text-white"
      >
        Add student
      </button>
      <button
        onClick={() => handleSeeStudentList(classItem.id)}
        className="bg-blue-600 px-4 py-2 rounded-md text-white"
      >
        Attendance
      </button>
      <Link
        className="bg-blue-600 px-4 py-2 rounded-md text-white"
        href={`/classes/class/edit/${classItem.id}?name=${classItem.title}`}
      >
        Edit
      </Link>
      <DeleteClassButton classId={classItem.id} />
      {isShowStudents && (
        <AddNewStudentToAClass
          setRefetchApi={setRefetchApi}
          classItem={classItem}
          classes={classes}
          onClose={() => setIsShowStudents(false)}
          students={students}
        />
      )}
    </div>
  );
};

export default ClassActions;
