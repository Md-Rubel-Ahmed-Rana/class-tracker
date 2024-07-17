type Props = {
  name: string;
  studentId: string;
  id: string;
  batchNo: string;
  createdAt: string;
  updatedAt: string;
};

const MyInfoCard = ({
  batchNo,
  createdAt,
  id,
  name,
  studentId,
  updatedAt,
}: Props) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg w-full lg:my-4">
      <h3 className="text-xl font-bold mb-4">My Info</h3>
      <div className="text-gray-700">
        <h2 className="text-lg font-semibold">Name: {name}</h2>
        <p>Student ID: {studentId}</p>
        <p>User ID: {id}</p>
        <p>Batch No: {batchNo}</p>
        <p>Enrollment date: {new Date(createdAt).toLocaleDateString()}</p>
        <p>Last updated: {new Date(updatedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default MyInfoCard;
