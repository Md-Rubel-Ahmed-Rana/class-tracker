import ClassContainer from "@/components/classes/ClassContainer";
import GetHead from "@/components/shared/HeadTag";
import { AppContext } from "@/context/AppProvider";
import React, { useContext, useEffect } from "react";
import MyInfoCard from "./MyInfoCard";
import MyBatchCard from "./MyBatchCard";
import MyBatchMates from "./MyBatchMates";

const StudentInfoPage = ({ setStudentInfo }: any) => {
  const { user, userLoading }: any = useContext(AppContext);
  const { student, batch, classes } = user || {};
  const { id, name, studentId, batchNo, createdAt, updatedAt } = student || {};
  const {
    batchNo: batchNum,
    id: batchId,
    name: batchName,
    startingDate,
    endingDate,
    students,
  } = batch || {};

  useEffect(() => {
    setStudentInfo({ name, studentId });
  }, [name, setStudentInfo, studentId]);

  return (
    <>
      <GetHead
        title={`Dashboard -  ${name} - ${studentId}`}
        description="This class tracker dashboard"
        keywords="ADC, Class Tracker"
      />
      <div className="min-h-screen p-5 lg:p-10">
        <div>
          <div className="flex flex-col md:flex-row justify-start lg:justify-between gap-5 lg:gap-10">
            <MyInfoCard
              batchNo={batchNo}
              createdAt={createdAt}
              id={id}
              name={name}
              studentId={studentId}
              updatedAt={updatedAt}
            />
            <MyBatchCard
              batchId={batchId}
              batchName={batchName}
              batchNo={batchNum}
              endingDate={endingDate}
              startingDate={startingDate}
              totalStudents={students.length}
            />
          </div>
          <MyBatchMates students={students} />
        </div>
        <hr className="my-5" />
        <div>
          <ClassContainer classes={classes || []} loading={userLoading} />
        </div>
      </div>
    </>
  );
};

export default StudentInfoPage;
