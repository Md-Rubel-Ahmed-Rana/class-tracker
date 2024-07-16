import { IClass } from "@/types/class.type";
import { FilterStudentType } from ".";
import ShowStudentListForAClassModal from "@/components/shared/ShowStudentListForAClassModal";
import { IStudent } from "@/types/student.type";
import ClassActions from "@/components/reusables/ClassActions";

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

const ClassCard = ({
  classItem,
  classes,
  students,
  seeStudentList,
  setSeeStudentList,
  setStudentList,
  setSearchTerm,
  setRefetchApi,
  studentList,
}: Props) => {
  return (
    <div key={classItem.id} className="p-4 border rounded-lg shadow-md">
      <div className="flex justify-between flex-col-reverse lg:flex-row gap-3 items-start lg:items-center">
        <h2 className="text-xl font-semibold mb-2">
          Class {classItem.classNo}: {classItem.title}
        </h2>
        <div className="relative lg:mb-4">
          <ClassActions
            classItem={classItem}
            classes={classes}
            students={students}
            seeStudentList={seeStudentList}
            setRefetchApi={setRefetchApi}
            setSearchTerm={setSearchTerm}
            setSeeStudentList={setSeeStudentList}
            setStudentList={setStudentList}
            studentList={studentList}
          />
          {seeStudentList === classItem.id && (
            <ShowStudentListForAClassModal
              studentList={studentList}
              setStudentList={setStudentList}
              setRefetchApi={setRefetchApi}
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
