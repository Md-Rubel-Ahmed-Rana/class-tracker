import AddNewClassPage from "@/components/add-new-class";
import GetHead from "@/components/shared/HeadTag";
import DashboardLayout from "@/layouts/dashboardLayout";
import { ReactElement } from "react";

const AddNewClass = () => {
  return (
    <div className="min-h-screen">
      <GetHead
        title="Add New Class - Class Tracker"
        description="This class tracker Classes page"
        keywords="ADC, Class Tracker"
      />
      <AddNewClassPage />
    </div>
  );
};

export default AddNewClass;

AddNewClass.getLayout = function (page: ReactElement) {
  return <DashboardLayout> {page}</DashboardLayout>;
};
