import StudentInfoPage from "@/components/dashboard/student";
import GetHead from "@/components/shared/HeadTag";
import { useState } from "react";

const StudentInfo = () => {
  const [studentInfo, setStudentInfo] = useState({ name: "", studentId: "" });
  return (
    <div className="bg-gray-50">
      <GetHead
        title={`Dashboard -  ${studentInfo.name} - ${studentInfo.studentId}`}
        description="This class tracker dashboard"
        keywords="ADC, Class Tracker"
      />
      <StudentInfoPage setStudentInfo={setStudentInfo} />
    </div>
  );
};

export default StudentInfo;
