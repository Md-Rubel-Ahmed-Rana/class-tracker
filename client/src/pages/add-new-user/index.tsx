import AddNewUserPage from "@/components/add-new-user";
import GetHead from "@/components/shared/HeadTag";
import DashboardLayout from "@/layouts/dashboardLayout";
import React, { ReactElement } from "react";

const AddNewUser = () => {
  return (
    <div className="min-h-screen">
      <GetHead
        title="Add New User - Class Tracker"
        description="This class tracker users page"
        keywords="ADC, Class Tracker"
      />
      <AddNewUserPage />
    </div>
  );
};

export default AddNewUser;

AddNewUser.getLayout = function (page: ReactElement) {
  return <DashboardLayout> {page}</DashboardLayout>;
};
