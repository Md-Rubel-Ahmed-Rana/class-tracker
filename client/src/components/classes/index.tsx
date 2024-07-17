import React, { useEffect, useState } from "react";
import { IClass } from "@/types/class.type";
import { getApi } from "@/apis";
import ClassContainer from "./ClassContainer";

const ClassesPage = () => {
  const [classData, setClassData] = useState<IClass[] | []>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getApi("class");
      setClassData(data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-5 lg:p-10">
      <ClassContainer classes={classData} loading={loading} />
    </div>
  );
};

export default ClassesPage;
