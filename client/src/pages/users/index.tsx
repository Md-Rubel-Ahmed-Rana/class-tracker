import GetHead from "@/components/shared/HeadTag";
import DashboardLayout from "@/layouts/dashboardLayout";
import { ReactElement } from "react";

const Users = () => {
  return (
    <section className="min-h-screen">
      <GetHead
        title="Users - Class Tracker"
        description="This class tracker users page"
        keywords="ADC, Class Tracker"
      />

      <h3 className="text-center text-3xl font-semibold py-5">
        Show all users here
      </h3>
    </section>
  );
};

export default Users;

Users.getLayout = function (page: ReactElement) {
  return <DashboardLayout> {page}</DashboardLayout>;
};
