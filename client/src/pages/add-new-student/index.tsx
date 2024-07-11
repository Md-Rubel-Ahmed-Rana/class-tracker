import AddNewStudentPage from "@/components/add-new-student";
import GetHead from "@/components/shared/HeadTag";
import DashboardLayout from "@/layouts/dashboardLayout";
import { ReactElement } from "react";

const AddNewStudent = () => {
  return (
    <div className="min-h-screen">
      <GetHead
        title="Add New Student - Class Tracker"
        description="This class tracker Classes page"
        keywords="ADC, Class Tracker"
      />
      <AddNewStudentPage />
    </div>
  );
};

export default AddNewStudent;

AddNewStudent.getLayout = function (page: ReactElement) {
  return <DashboardLayout> {page}</DashboardLayout>;
};
