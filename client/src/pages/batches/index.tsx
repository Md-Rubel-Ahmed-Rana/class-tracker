import BatchesPage from "@/components/batches";
import GetHead from "@/components/shared/HeadTag";
import DashboardLayout from "@/layouts/dashboardLayout";
import { ReactElement } from "react";

const Batches = () => {
  return (
    <section className="min-h-screen">
      <GetHead
        title="Batches - Class Tracker"
        description="This class tracker Batches page"
        keywords="ADC, Class Tracker"
      />

      <BatchesPage />
    </section>
  );
};

export default Batches;

Batches.getLayout = function (page: ReactElement) {
  return <DashboardLayout> {page}</DashboardLayout>;
};
