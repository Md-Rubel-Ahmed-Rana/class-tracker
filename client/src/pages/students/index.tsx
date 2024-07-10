import GetHead from "@/components/shared/HeadTag";
import DashboardLayout from "@/layouts/dashboardLayout";
import { ReactElement } from "react";

const Students = () => {
  return (
    <section className="min-h-screen">
      <GetHead
        title="Students - Class Tracker"
        description="This class tracker Students page"
        keywords="ADC, Class Tracker"
      />

      <h3 className="text-center text-3xl font-semibold py-5">
        Show all Students here
      </h3>
    </section>
  );
};

export default Students;

Students.getLayout = function (page: ReactElement) {
  return <DashboardLayout> {page}</DashboardLayout>;
};
