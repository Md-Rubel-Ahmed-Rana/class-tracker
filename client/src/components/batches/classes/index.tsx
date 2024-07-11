/* eslint-disable react-hooks/exhaustive-deps */
import { getApi } from "@/apis";
import { IClass } from "@/types/class.type";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ChangeBatch from "./ChangeBatch";
import SearchClass from "./SearchClass";
import ClassCard from "./ClassCard";

export type FilterStudentType = {
  name: string;
  studentId: string;
  status: string;
};

const ClassesForABatchPage = ({ setBatchNo }: { setBatchNo: any }) => {
  const router = useRouter();
  const [batch, setBatch] = useState<any>({});
  const [classes, setClasses] = useState<IClass[] | undefined>([]);
  const [loading, setLoading] = useState(false);
  const [seeStudentList, setSeeStudentList] = useState<null | string>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [studentList, setStudentList] = useState<FilterStudentType[]>([]);

  const fetchClassByBatch = async (batchNo: string) => {
    setLoading(true);
    try {
      const data = await getApi(`class/by-batch/${batchNo}`);
      setClasses(data?.data || []);
    } catch (error) {
      console.log("Error to fetch class", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSingleBatch = async (id: string) => {
    try {
      const data: any = await getApi(`batch/single/${id}`);
      setBatch(data?.data || {});
      setBatchNo(data?.data?.batchNo);
      fetchClassByBatch(data?.data?.batchNo);
    } catch (error) {
      console.log("Error to fetch batch", error);
    }
  };

  useEffect(() => {
    if (router.query?.id) {
      fetchSingleBatch(router.query.id as string);
    }
  }, [router?.query?.id]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between flex-col lg:flex-row font-semibold gap-4">
        <h1 className="text-lg lg:text-2xl">Web Design & Development Course</h1>
        {/* update batch and classes by batchNo component */}
        <ChangeBatch batch={batch} fetchClassByBatch={fetchClassByBatch} />
      </div>
      <h1 className="text-2xl mb-4">Classes for Batch {batch.batchNo}</h1>
      {/* search class component */}
      <SearchClass
        batch={batch}
        classes={classes || []}
        setClasses={setClasses}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        fetchClassByBatch={fetchClassByBatch}
      />
      {!loading ? (
        <div className="grid grid-cols-1 gap-10">
          {classes && classes.length > 0 ? (
            classes.map((classItem: IClass) => (
              <ClassCard
                key={classItem.id}
                classItem={classItem}
                classes={classes}
                seeStudentList={seeStudentList}
                setSearchTerm={setSearchTerm}
                setSeeStudentList={setSeeStudentList}
                setStudentList={setStudentList}
                studentList={studentList}
              />
            ))
          ) : (
            <div className="flex justify-center items-center">
              <h4 className="text-3xl font-semibold text-center">
                No classes found for this batch
              </h4>
            </div>
          )}
        </div>
      ) : (
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
