import AddNewBatchPage from "@/components/add-new-batch";
import DashboardLayout from "@/layouts/dashboardLayout";
import { ReactElement } from "react";

const AddNewBatch = () => {
  return (
    <div className="min-h-screen">
      <AddNewBatchPage />
    </div>
  );
};

export default AddNewBatch;

AddNewBatch.getLayout = function (page: ReactElement) {
  return <DashboardLayout> {page}</DashboardLayout>;
};
