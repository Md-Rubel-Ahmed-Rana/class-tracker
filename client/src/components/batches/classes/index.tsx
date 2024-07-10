/* eslint-disable react-hooks/exhaustive-deps */
import { getApi } from "@/apis";
import { IClass } from "@/types/class.type";
import { IStudent } from "@/types/student.type";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ClassesForABatchPage = ({ setBatchNo }: { setBatchNo: any }) => {
  const { query } = useRouter();
  const [batch, setBatch] = useState<any>({});
  const [classes, setClasses] = useState<IClass[] | undefined>([]);
  const [loading, setLoading] = useState(false);

  const fetchClassByBatch = async (batchNo: string) => {
    setLoading(true);
    try {
      const data = await getApi(`class/by-batch/${batchNo}`);
      setClasses(data?.data || []);
      setLoading(false);
    } catch (error) {
      console.log("Error to fetch class", error);
      setLoading(false);
    }
  };

  const fetchSingleBatch = async () => {
    try {
      const data: any = await getApi(`batch/single/${query?.id}`);
      setBatch(data?.data || []);
      setBatchNo(data?.data?.batchNo);
      fetchClassByBatch(data?.data?.batchNo);
    } catch (error) {
      console.log("Error to fetch batche", error);
    }
  };

  useEffect(() => {
    fetchSingleBatch();
  }, [query?.id]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Classes for Batch {batch.batchNo}
      </h1>
      {!loading && (
        <div className="grid grid-cols-1 gap-10">
          {classes && classes?.length > 0 ? (
            classes?.map((classItem: IClass) => (
              <div
                key={classItem.id}
                className="p-4 border rounded-lg shadow-md"
              >
                <h2 className="text-xl font-semibold mb-2">
                  Class {classItem.classNo}: {classItem.title}
                </h2>
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
            ))
          ) : (
            <div className="flex justify-center items-center">
              <h4 className="text-3xl font-semibold text-center">
                No classes found for this batch
              </h4>
            </div>
          )}
        </div>
      )}
      {loading && (
        <div className="flex justify-center items-center">
          <h4 className="text-3xl font-semibold text-center">
            Loading classes...
          </h4>
        </div>
      )}
    </div>
  );
};

export default ClassesForABatchPage;
