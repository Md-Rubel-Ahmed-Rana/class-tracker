import Link from "next/link";
import React, { useContext, useState } from "react";
import StudentModal from "../shared/StudentModal";
import { IBatch } from "@/types/batch.type";
import { AppContext } from "@/context/AppProvider";

const BatchesPage = () => {
  const { batches }: any = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [currentBatch, setCurrentBatch] = useState<IBatch | undefined>();

  const handleSeeStudents = (batch: IBatch) => {
    setCurrentBatch(batch);
    setShowModal(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold ">Batches</h1>
        <Link
          className="bg-blue-600 px-4 py-2 rounded-md text-white"
          href={"/add-new-batch"}
        >
          Add New Batch
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {batches?.map((batch: IBatch) => (
          <div key={batch.id} className="p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{batch.name}</h2>
            <p>Batch No: {batch.batchNo}</p>
            <p>
              Starting Date: {new Date(batch.startingDate).toLocaleDateString()}
            </p>
            <p>Students: {batch.students.length} </p>
            <div className="flex justify-between mt-3 items-center gap-3">
              <button
                onClick={() => handleSeeStudents(batch)}
                className="bg-gray-200 py-1 px-5 w-full rounded-md font-semibold"
              >
                Students
              </button>
              <Link
                className="bg-gray-200 text-center py-1 px-5 w-full rounded-md font-semibold"
                href={`/batches/classes/${batch.id}`}
              >
                <button>Classes</button>
              </Link>
              <Link
                className="bg-gray-200 text-center py-1 px-5 w-full rounded-md font-semibold"
                href={`/batches/details/${batch.id}?name=${batch.name}&batchNo=${batch.batchNo}`}
              >
                <button>Details</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <StudentModal
        show={showModal}
        onClose={() => setShowModal(false)}
        batchName={currentBatch?.name || ""}
        students={currentBatch?.students || []}
      />
    </div>
  );
};

export default BatchesPage;
