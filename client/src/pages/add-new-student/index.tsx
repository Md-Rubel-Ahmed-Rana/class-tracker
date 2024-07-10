import DashboardLayout from "@/layouts/dashboardLayout";
import { ReactElement } from "react";

const AddNewStudent = () => {
  return <div className="min-h-screen">This is for add new student</div>;
};

export default AddNewStudent;

AddNewStudent.getLayout = function (page: ReactElement) {
  return <DashboardLayout> {page}</DashboardLayout>;
};
