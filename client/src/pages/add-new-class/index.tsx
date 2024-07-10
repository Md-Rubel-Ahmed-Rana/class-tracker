import DashboardLayout from "@/layouts/dashboardLayout";
import { ReactElement } from "react";

const AddNewClass = () => {
  return <div className="min-h-screen">This is for add new class</div>;
};

export default AddNewClass;

AddNewClass.getLayout = function (page: ReactElement) {
  return <DashboardLayout> {page}</DashboardLayout>;
};
