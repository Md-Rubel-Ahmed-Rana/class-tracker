import GetHead from "@/components/shared/HeadTag";
import DashboardLayout from "@/layouts/dashboardLayout";
import { ReactElement } from "react";

const Dashboard = () => {
  return (
    <section className="min-h-screen flex justify-center items-center">
      <GetHead
        title="Dashboard - Class Tracker"
        description="This class tracker dashboard"
        keywords="ADC, Class Tracker"
      />

      <h3 className="text-lg lg:text-3xl text-center font-bold">
        Show chart, calculation for attendance etc.
      </h3>
    </section>
  );
};

export default Dashboard;

Dashboard.getLayout = function (page: ReactElement) {
  return <DashboardLayout> {page}</DashboardLayout>;
};
