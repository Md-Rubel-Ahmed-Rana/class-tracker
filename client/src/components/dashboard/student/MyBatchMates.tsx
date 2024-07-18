import { IStudent } from "@/types/student.type";

type Props = {
  students: IStudent[];
};

const MyBatchMates = ({ students }: Props) => {
  return (
    <div className="bg-white shadow-md border rounded-md p-2 mt-5 lg:mt-0">
      <h1 className="text-lg mb-3 lg:text-2xl font-serif font-semibold text-center">
        My Batch Mates
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5">
        {students?.length > 0 &&
          students?.map((student) => (
            <div className="shadow-md p-3 rounded-md" key={student.id}>
              <h3>
                <b>Name:</b>{" "}
                <span className="block lg:inline">{student.name}</span>
              </h3>
              <p>
                <b>Student ID:</b>
                <span className="block lg:inline">{student.studentId}</span>
              </p>
              <p>
                <b>User ID: </b>
                <span className="block lg:inline">{student.id}</span>
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyBatchMates;
