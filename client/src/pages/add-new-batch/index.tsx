import DashboardLayout from "@/layouts/dashboardLayout";
import { ReactElement } from "react";

const AddNewBatch = () => {
  return <div className="min-h-screen">This is for add new batch</div>;
};

export default AddNewBatch;

AddNewBatch.getLayout = function (page: ReactElement) {
  return <DashboardLayout> {page}</DashboardLayout>;
};
