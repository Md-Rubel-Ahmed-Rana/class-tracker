import GetHead from "@/components/shared/HeadTag";
import DashboardLayout from "@/layouts/dashboardLayout";
import { ReactElement } from "react";

const Classes = () => {
  return (
    <section className="min-h-screen">
      <GetHead
        title="Classes - Class Tracker"
        description="This class tracker Classes page"
        keywords="ADC, Class Tracker"
      />

      <h3 className="text-center text-3xl font-semibold py-5">
        Show all Classes here
      </h3>
    </section>
  );
};

export default Classes;

Classes.getLayout = function (page: ReactElement) {
  return <DashboardLayout> {page}</DashboardLayout>;
};
