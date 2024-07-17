import GetHead from "@/components/shared/HeadTag";
import UpdateStudentContent from "@/components/students/student/update-student";
import DashboardLayout from "@/layouts/dashboardLayout";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const EditStudent = () => {
  const { query } = useRouter();
  return (
    <div className="min-h-screen p-5 lg:p-10">
      <GetHead
        title={`Edit - ${query.name} ${query.batchNo}`}
        description="This class tracker Students page"
        keywords="ADC, Class Tracker"
      />
      <UpdateStudentContent />
    </div>
  );
};

export default EditStudent;

EditStudent.getLayout = function (page: ReactElement) {
  return <DashboardLayout> {page}</DashboardLayout>;
};
