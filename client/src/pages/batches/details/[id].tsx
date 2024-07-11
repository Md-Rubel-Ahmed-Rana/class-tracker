import BatchesPage from "@/components/batches";
import BatchDetailsPage from "@/components/batches/details";
import GetHead from "@/components/shared/HeadTag";
import DashboardLayout from "@/layouts/dashboardLayout";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const BatchDetails = () => {
  const router = useRouter();
  return (
    <section className="min-h-screen pb-20">
      <GetHead
        title={`${router?.query?.batchNo} - Class Tracker`}
        description="This class tracker Batches page"
        keywords="ADC, Class Tracker"
      />
      <BatchDetailsPage />
    </section>
  );
};

export default BatchDetails;

BatchDetails.getLayout = function (page: ReactElement) {
  return <DashboardLayout> {page}</DashboardLayout>;
};
