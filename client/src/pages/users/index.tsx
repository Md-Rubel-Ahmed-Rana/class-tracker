import GetHead from "@/components/shared/HeadTag";
import UsersPage from "@/components/users";
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
      <UsersPage />
    </section>
  );
};

export default Users;

Users.getLayout = function (page: ReactElement) {
  return <DashboardLayout> {page}</DashboardLayout>;
};
