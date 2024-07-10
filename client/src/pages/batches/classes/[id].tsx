import ClassesForABatchPage from "@/components/batches/classes";
import GetHead from "@/components/shared/HeadTag";
import DashboardLayout from "@/layouts/dashboardLayout";
import React, { ReactElement, useState } from "react";

const ClassesForABatch = () => {
  const [batchNo, setBatchNo] = useState("");
  return (
    <div className="min-h-screen">
      <GetHead
        title={`Classes - ${batchNo}`}
        description="This class tracker Batches page"
        keywords="ADC, Class Tracker"
      />
      <ClassesForABatchPage setBatchNo={setBatchNo} />
    </div>
  );
};

export default ClassesForABatch;

ClassesForABatch.getLayout = function (page: ReactElement) {
  return <DashboardLayout> {page}</DashboardLayout>;
};
