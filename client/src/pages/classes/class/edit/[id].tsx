import UpdateClassContent from "@/components/classes/update-class";
import GetHead from "@/components/shared/HeadTag";
import DashboardLayout from "@/layouts/dashboardLayout";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const EditClassContent = () => {
  const { query } = useRouter();
  return (
    <div className="min-h-screen p-5 lg:p-10">
      <GetHead
        title={`Update class - ${query.name}`}
        description="This class tracker Classes page"
        keywords="ADC, Class Tracker"
      />
      <UpdateClassContent />
    </div>
  );
};

export default EditClassContent;

EditClassContent.getLayout = function (page: ReactElement) {
  return <DashboardLayout> {page}</DashboardLayout>;
};
