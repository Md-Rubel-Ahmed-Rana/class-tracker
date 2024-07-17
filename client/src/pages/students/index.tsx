import GetHead from "@/components/shared/HeadTag";
import StudentsPage from "@/components/students";
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

      <StudentsPage />
    </section>
  );
};

export default Students;

Students.getLayout = function (page: ReactElement) {
  return <DashboardLayout> {page}</DashboardLayout>;
};
