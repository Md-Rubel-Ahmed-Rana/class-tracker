import EditBatchPage from "@/components/batches/batch/edit";
import GetHead from "@/components/shared/HeadTag";
import DashboardLayout from "@/layouts/dashboardLayout";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";

const EditBatch = () => {
  const { query } = useRouter();
  return (
    <div>
      <GetHead
        title={`Edit batch - ${query.name} - ${query.batchNo}`}
        description="This class tracker Students page"
        keywords="ADC, Class Tracker"
      />
      <EditBatchPage />
    </div>
  );
};

export default EditBatch;

EditBatch.getLayout = function (page: ReactElement) {
  return <DashboardLayout> {page}</DashboardLayout>;
};
