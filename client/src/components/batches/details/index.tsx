/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getApi } from "@/apis";
import Link from "next/link";

const BatchDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [batchDetails, setBatchDetails] = useState<any>(null);

  useEffect(() => {
    if (id) {
      fetchBatchDetails();
    }
  }, [id]);

  const fetchBatchDetails = async () => {
    const data = await getApi(`batch/details/${id}`);
    setBatchDetails(data?.data);
  };

  if (!batchDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h4 className="text-3xl text-center font-semibold"> Loading...</h4>
      </div>
    );
  }

  return (
    <div className="p-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mb-4">
          Batch No: {batchDetails?.batch?.batchNo}
        </h2>
        <div className="flex gap-2">
          <Link
            className="bg-blue-600 px-4 py-2 rounded-md text-white"
            href={"/add-new-student"}
          >
            Add New Student
          </Link>
          <Link
            className="bg-blue-600 px-4 py-2 rounded-md text-white"
            href={"/add-new-class"}
          >
            Add New Class
          </Link>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold">Batch Details</h3>
        <p>Name: {batchDetails?.batch?.name}</p>
        <p>Total students: {batchDetails?.students?.length}</p>
        <p>Total classes: {batchDetails?.classes?.length}</p>
        <p>
          Starting Date:
          {new Date(batchDetails?.batch?.startingDate)?.toLocaleDateString()}
        </p>
        <p>
          Ending Date:
          {batchDetails?.batch?.endingDate
            ? new Date(batchDetails?.batch?.endingDate)?.toLocaleDateString()
            : " Not provided"}
        </p>
      </div>
      <hr className="my-5" />
      <div>
        <h3 className="text-xl font-semibold">Students</h3>
        <ul className="list-disc pl-5">
          {batchDetails?.students.length > 0 ? (
            <>
              {batchDetails?.students?.map((student: any) => (
                <li key={student?.id}>
                  {student?.name} (ID: {student?.studentId})
                </li>
              ))}
            </>
          ) : (
            <div className="flex justify-center items-center">
              <h4 className="text-2xl font-semibold">
                No students enrolled yet.
              </h4>
            </div>
          )}
        </ul>
      </div>
      <hr className="my-5" />
      <div className="mb-8">
        <h3 className="text-xl font-semibold">Classes</h3>
        {batchDetails?.classes?.length > 0 ? (
          <>
            {batchDetails?.classes?.map((classItem: any) => (
              <div key={classItem._id} className="mb-4 p-4 border rounded-lg">
                <h4 className="text-lg font-semibold">{classItem.title}</h4>
                <p>Description: {classItem.description}</p>
                <p>Class No: {classItem.classNo}</p>
                <div className="mt-2">
                  <h5 className="text-md font-semibold">Present Students:</h5>
                  <ul className="list-disc pl-5">
                    {classItem.presentStudents.map((student: any) => (
                      <li key={student.id}>
                        {student.name} (ID: {student.studentId})
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-2">
                  <h5 className="text-md font-semibold">Absent Students:</h5>
                  <ul className="list-disc pl-5">
                    {classItem.absenceStudents.map((student: any) => (
                      <li key={student.id}>
                        {student.name} (ID: {student.studentId})
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="flex justify-center items-center">
            <h4 className="text-2xl font-semibold">No classes taken yet.</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default BatchDetailsPage;
