type Props = {
  batchName: string;
  batchId: string;
  startingDate: string;
  batchNo: string;
  endingDate: string;
  totalStudents: number;
};

const MyBatchCard = ({
  batchId,
  batchName,
  batchNo,
  endingDate,
  startingDate,
  totalStudents,
}: Props) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg w-full  lg:my-4">
      <h3 className="text-xl font-bold mb-4">My Batch</h3>
      <div className="text-gray-700">
        <h4 className="text-lg font-semibold">Batch name: {batchName}</h4>
        <p>Batch ID: {batchId}</p>
        <p>Batch No: {batchNo}</p>
        <p>Total students: {totalStudents}</p>
        <p>
          Start date:{" "}
          {startingDate ? new Date(startingDate).toLocaleDateString() : null}
        </p>
        <p>
          End date:{" "}
          {endingDate
            ? new Date(endingDate).toLocaleDateString()
            : "Not assigned yet."}
        </p>
      </div>
    </div>
  );
};

export default MyBatchCard;
