/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getApi } from "@/apis";
import Link from "next/link";
import DeleteBatchButton from "@/components/reusables/DeleteBatchButton";
import DeleteStudentButton from "@/components/reusables/DeleteStudentButton";
import DeleteClassButton from "@/components/reusables/DeleteClassButton";
import { IClass } from "@/types/class.type";

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
    <div className="p-5 lg:p-10">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
        <h2 className="text-lg lg:text-2xl font-bold mb-4">
          Batch No: {batchDetails?.batch?.batchNo}
        </h2>
        <div className="flex flex-wrap gap-2 text-xs lg:text-sm">
          <Link
            className="bg-blue-600 px-2 lg:px-4 py-2 rounded-md text-white"
            href={"/add-new-student"}
          >
            Add New Student
          </Link>
          <Link
            className="bg-blue-600 px-2 lg:px-4  py-2 rounded-md text-white"
            href={"/add-new-class"}
          >
            Add New Class
          </Link>
          <DeleteBatchButton batchId={id as string} />
        </div>
      </div>
      <div className="mt-4 lg:mt-0">
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
        <ul className="list-disc lg:pl-5">
          {batchDetails?.students.length > 0 ? (
            <>
              {batchDetails?.students?.map((student: any) => (
                <li className="flex items-center gap-2 mt-2" key={student?.id}>
                  {student?.name} (ID: {student?.studentId})
                  <DeleteStudentButton studentObjectId={student.id} />
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
            {batchDetails?.classes?.map((classItem: IClass) => (
              <div key={classItem._id} className="mb-4 p-4 border rounded-lg">
                <div className="flex flex-col-reverse lg:flex-row justify-between lg:items-center">
                  <h4 className="text-lg font-semibold">{classItem.title}</h4>
                  <div className="flex   items-center gap-2 my-3">
                    <Link
                      className="bg-blue-600 text-md px-4 py-1 lg:py-2 rounded-md text-white"
                      href={`/classes/class/edit/${classItem.id}?name=${classItem.title}`}
                    >
                      Edit Class
                    </Link>
                    <DeleteClassButton classId={classItem.id} />
                  </div>
                </div>
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
