import Link from "next/link";
import React from "react";
import DeleteClassButton from "./DeleteClassButton";
import { IClass } from "@/types/class.type";
import { FilterStudentType } from "../batches/classes";

type Props = {
  classItem: IClass;
  classes: IClass[];
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
  setSeeStudentList,
  setStudentList,
  setSearchTerm,
}: Props) => {
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
    </div>
  );
};

export default ClassActions;
