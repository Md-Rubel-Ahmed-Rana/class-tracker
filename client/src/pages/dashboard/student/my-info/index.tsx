import { getApi } from "@/apis";
import React, { useEffect } from "react";

const StudentInfoPage = () => {
  useEffect(() => {
    fetchStudentInfo();
  }, []);

  const fetchStudentInfo = async () => {
    try {
      const data = await getApi("student/my-info");
      console.log({ StudentInfo: data });
    } catch (error) {
      console.log("failed to fetch student info");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-10 bg-gray-100">
      <h1 className="text-3xl font-bold font-serif">
        Show all the info of a student
      </h1>
    </div>
  );
};

export default StudentInfoPage;
