/* eslint-disable react-hooks/exhaustive-deps */
import { getApi } from "@/apis";
import { AppContext } from "@/context/AppProvider";
import { IBatch } from "@/types/batch.type";
import { IClass } from "@/types/class.type";
import { IStudent } from "@/types/student.type";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";

const ClassesForABatchPage = ({ setBatchNo }: { setBatchNo: any }) => {
  const router = useRouter();
  const { batches }: any = useContext(AppContext);
  const [batch, setBatch] = useState<any>({});
  const [classes, setClasses] = useState<IClass[] | undefined>([]);
  const [loading, setLoading] = useState(false);
  const [seeStudentList, setSeeStudentList] = useState<null | number>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(
    batch?.students || []
  );

  const handleSearchClass = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm) {
      setSearchTerm(searchTerm);
      const filtered = classes?.filter((cls) =>
        cls.title.toLowerCase().includes(searchTerm)
      );
      setClasses(filtered);
    } else {
      setSearchTerm("");
      fetchClassByBatch(batch.batchNo);
    }
  };

  const handleSeeStudentList = (index: number) => {
    if (seeStudentList === index) {
      setSeeStudentList(null);
      setSearchTerm("");
    } else {
      setSeeStudentList(index);
      setSearchTerm("");
    }
  };

  const handleSelectClass = (cls: any) => {
    setClasses([cls]);
  };

  const handleChangeStudentStatus = (
    classId: string,
    studentId: string,
    studentStatus: string
  ) => {
    console.log(classId, studentId, studentStatus);
  };

  const handleUpdateStudentStatus = (currentClass: any) => {
    console.log(currentClass);
  };

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
      const data: any = await getApi(`batch/single/${router.query?.id}`);
      setBatch(data?.data || []);
      setBatchNo(data?.data?.batchNo);
      fetchClassByBatch(data?.data?.batchNo);
      setFilteredStudents(data?.data?.students);
    } catch (error) {
      console.log("Error to fetch batch", error);
    }
  };

  const handleChangeBatch = (data: string) => {
    const values = data.split(",");
    const batchId = values[0];
    const batchNo = values[1];
    fetchClassByBatch(batchNo);
    router.push({
      pathname: `/batches/classes/${batchId}`,
    });
  };

  const handleSearchStudent = (searchValue: string) => {
    if (searchValue) {
      const filteredStudents = batch?.students?.filter((std: IStudent) =>
        std?.name?.toLowerCase()?.includes(searchValue?.toLowerCase())
      );
      setFilteredStudents(filteredStudents);
    } else {
      setFilteredStudents(batch?.students);
    }

    console.log(filteredStudents);
  };

  useEffect(() => {
    fetchSingleBatch();
  }, [router?.query?.id]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between flex-col lg:flex-row  font-semibold gap-4">
        <h1 className="text-lg lg:text-2xl">Web Design & Development Course</h1>
        <div className="flex gap-2 items-center">
          <select
            onChange={(e) => handleChangeBatch(e.target.value)}
            className="border-2 focus:outline-blue-400 bg-gray-300 px-3 rounded-md py-1"
            name="batch"
            id="batch"
            defaultValue={`${batch.id},${batch.batchNo}`}
          >
            <option value="">Select a batch</option>
            {batches.map((batch: IBatch) => (
              <option key={batch.id} value={`${batch.id},${batch.batchNo}`}>
                <span>{batch.batchNo}</span> | <span>{batch.name}</span>
              </option>
            ))}
          </select>
        </div>
      </div>
      <h1 className="text-2xl  mb-4">Classes for Batch {batch.batchNo}</h1>
      <div className="my-5">
        <input
          className="w-full border-2 border-blue-200 p-2 focus:outline-blue-600 rounded-md"
          type="text"
          name="class"
          id="class"
          defaultValue={searchTerm}
          onChange={handleSearchClass}
          placeholder="Search class"
        />
        {searchTerm && (
          <ul className="border border-blue-200 mt-2 rounded-md shadow-lg bg-white">
            {classes?.map((cls) => (
              <li
                key={cls.id}
                className="p-2 cursor-pointer hover:bg-blue-100"
                onClick={() => handleSelectClass(cls)}
              >
                {cls.title}
              </li>
            ))}
          </ul>
        )}
      </div>
      {!loading && (
        <div className="grid grid-cols-1 gap-10">
          {classes && classes?.length > 0 ? (
            classes?.map((classItem: IClass, index) => (
              <div
                key={classItem.id}
                className="p-4 border rounded-lg shadow-md"
              >
                <div className="flex justify-between flex-col lg:flex-row gap-3 items-start lg:items-center">
                  <h2 className="text-xl font-semibold mb-2">
                    Class {classItem.classNo}: {classItem.title}
                  </h2>
                  <div className="relative mb-4">
                    <div className="text-end">
                      <button
                        onClick={() => handleSeeStudentList(index + 1)}
                        className="bg-blue-600 px-4 py-2 rounded-md text-white"
                      >
                        See student list
                      </button>
                    </div>
                    {seeStudentList === index + 1 && (
                      <div className="flex flex-col gap-2 bg-gray-100 shadow-md border-2 p-2 rounded-md  absolute left-0  lg:left-auto right-auto lg:right-0 top-12 z-50">
                        <input
                          className="border focus:border-blue-600 focus:outline-blue-700 p-2 rounded-md"
                          type="text"
                          name="search"
                          onChange={(e) => handleSearchStudent(e.target.value)}
                          placeholder="Search student"
                        />
                        <hr />
                        <div>
                          <div
                            className={`${
                              filteredStudents?.length > 3
                                ? "hover:overflow-y-auto overflow-hidden w-60 h-60 flex flex-col gap-3"
                                : "flex flex-col gap-3"
                            }`}
                          >
                            {filteredStudents?.map((student: IStudent) => (
                              <div
                                onClick={() =>
                                  handleChangeStudentStatus(
                                    classItem.id,
                                    student.id,
                                    "absence"
                                  )
                                }
                                className="bg-white p-2 mr-2 rounded-md cursor-pointer"
                                key={student.id}
                              >
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span>
                                      {classItem?.absenceStudents?.map(
                                        (std) => {
                                          return (
                                            std?.studentId ===
                                              student?.studentId && (
                                              <FaRegCircle
                                                key={student?.studentId}
                                                className="text-blue-500"
                                              />
                                            )
                                          );
                                        }
                                      )}
                                      {classItem?.presentStudents?.map(
                                        (std) => {
                                          return (
                                            std?.studentId ===
                                              student?.studentId && (
                                              <FaRegCheckCircle
                                                key={student?.studentId}
                                                className="text-blue-500"
                                              />
                                            )
                                          );
                                        }
                                      )}
                                    </span>
                                    <span>{student.name}</span>
                                  </div>
                                  <span className="text-xs ml-2">
                                    {student.studentId}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-between mt-4 items-center gap-3 text-white">
                            <button
                              onClick={() => handleSeeStudentList(index + 1)}
                              className="bg-yellow-500 w-full rounded-md  py-1 text-center"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() =>
                                handleUpdateStudentStatus(classItem)
                              }
                              className="bg-blue-500  w-full rounded-md py-1 text-center"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
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
