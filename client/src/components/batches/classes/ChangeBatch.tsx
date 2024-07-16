import { AppContext } from "@/context/AppProvider";
import { IBatch } from "@/types/batch.type";
import { useRouter } from "next/router";
import React, { useContext } from "react";

type Props = {
  fetchClassByBatch: (batchNo: string) => void;
  batch: IBatch;
};

const ChangeBatch = ({ fetchClassByBatch, batch }: Props) => {
  const { batches }: any = useContext(AppContext);
  const router = useRouter();
  const handleChangeBatch = (filterValues: string) => {
    if (filterValues) {
      const values = filterValues.split(",");
      const batchId = values[0];
      const batchNo = values[1];
      fetchClassByBatch(batchNo);
      router.push({
        pathname: `/batches/classes/${batchId}`,
      });
    }
  };
  return (
    <div className="flex gap-2 items-center">
      <h5 className="text-2xl">Filter: </h5>
      <select
        onChange={(e) => handleChangeBatch(e.target.value)}
        className="border-2 focus:outline-blue-400 cursor-pointer bg-gray-300 px-3 rounded-md py-1"
        name="batch"
        id="batch"
        defaultValue={`${batch.id},${batch.batchNo}`}
      >
        <option value="">Select a batch</option>
        {batches?.map((batch: IBatch) => (
          <option key={batch.id} value={`${batch.id},${batch.batchNo}`}>
            <span>{batch.batchNo}</span>
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChangeBatch;
