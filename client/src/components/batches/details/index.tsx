import { useRouter } from "next/router";

const BatchDetailsPage = () => {
  const router = useRouter();
  return (
    <div>
      <h2>Batch no: {router?.query?.batchNo}</h2>
    </div>
  );
};

export default BatchDetailsPage;
