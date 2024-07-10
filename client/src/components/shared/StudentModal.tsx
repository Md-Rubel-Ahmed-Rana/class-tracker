import { IStudent } from "@/types/student.type";

type Props = {
  show: boolean;
  onClose: any;
  students: IStudent[];
  batchName: string;
};

const StudentModal = ({ show, onClose, batchName, students }: Props) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-3/4 max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Students in {batchName}</h2>
          <button
            className="bg-red-400 px-3 py-1 text-white rounded-md"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {students.length > 0 ? (
            <ul className="mr-3">
              {students.map((student) => (
                <li
                  key={student.id}
                  className="mb-2 shadow-md p-2 border-2 rounded-md"
                >
                  <p>Name: {student.name}</p>
                  <p>Student ID: {student.studentId}</p>
                  <p>ID: {student.id}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No students enrolled</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentModal;
