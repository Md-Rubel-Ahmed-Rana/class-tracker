import DashboardLayout from "@/layouts/dashboardLayout";
import React, { ReactElement } from "react";

const AddNewUser = () => {
  return <div className="min-h-screen">This is for new user</div>;
};

export default AddNewUser;

AddNewUser.getLayout = function (page: ReactElement) {
  return <DashboardLayout> {page}</DashboardLayout>;
};
