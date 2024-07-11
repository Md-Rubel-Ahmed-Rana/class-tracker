import { IClass } from "@/types/class.type";
import { FilterStudentType } from ".";
import ShowStudentListForAClassModal from "@/components/shared/ShowStudentListForAClassModal";
import { IStudent } from "@/types/student.type";

type Props = {
  classItem: IClass;
  classes: IClass[];
  seeStudentList: string | null;
  studentList: FilterStudentType[];
  setStudentList: (values: FilterStudentType[]) => void;
  setSeeStudentList: (value: string | null) => void;
  setSearchTerm: (value: string) => void;
};

const ClassCard = ({
  classItem,
  classes,
  seeStudentList,
  setSeeStudentList,
  setStudentList,
  setSearchTerm,
  studentList,
}: Props) => {
  const handleSeeStudentList = (classId: string) => {
    const currentClass = classes?.find((cls) => cls._id === classId);
    const absenceStudents = currentClass?.absenceStudents?.map((student) => ({
      name: student.name,
      studentId: student.studentId,
      status: "absence",
    }));
    const presentStudents = currentClass?.presentStudents?.map((student) => ({
      name: student.name,
      studentId: student.studentId,
      status: "present",
    }));
    if (absenceStudents && absenceStudents?.length > 0) {
      setStudentList(absenceStudents.concat(presentStudents || []));
    }
    if (seeStudentList === classId) {
      setSeeStudentList(null);
      setSearchTerm("");
    } else {
      setSeeStudentList(classId);
      setSearchTerm("");
    }
  };
  return (
    <div key={classItem.id} className="p-4 border rounded-lg shadow-md">
      <div className="flex justify-between flex-col lg:flex-row gap-3 items-start lg:items-center">
        <h2 className="text-xl font-semibold mb-2">
          Class {classItem.classNo}: {classItem.title}
        </h2>
        <div className="relative mb-4">
          <div className="text-end">
            <button
              onClick={() => handleSeeStudentList(classItem.id)}
              className="bg-blue-600 px-4 py-2 rounded-md text-white"
            >
              See student list
            </button>
          </div>
          {seeStudentList === classItem.id && (
            <ShowStudentListForAClassModal
              studentList={studentList}
              setStudentList={setStudentList}
              setSeeStudentList={setSeeStudentList}
              classId={classItem.id}
            />
          )}
        </div>
      </div>

      <p className="mb-4">{classItem.description}</p>
      <p className="font-bold">Present Students:</p>
      {classItem.presentStudents.length > 0 ? (
        <ul className="list-disc list-inside mb-4">
          {classItem.presentStudents.map((student) => (
            <li key={student.id}>
              {student.name} ({student.studentId})
            </li>
          ))}
        </ul>
      ) : (
        <p>No students present</p>
      )}
      <p className="font-bold">Absent Students:</p>
      {classItem.absenceStudents.length > 0 ? (
        <ul className="list-disc list-inside">
          {classItem.absenceStudents.map((student: IStudent) => (
            <li key={student.id}>
              {student.name} ({student.studentId})
            </li>
          ))}
        </ul>
      ) : (
        <p>No students absent</p>
      )}
    </div>
  );
};

export default ClassCard;
