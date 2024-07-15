import { deleteApi } from "@/apis";
import { AppContext } from "@/context/AppProvider";
import { useRouter } from "next/router";
import { useContext } from "react";
import Swal from "sweetalert2";

type Props = {
  batchId: string;
};

const DeleteBatchButton = ({ batchId }: Props) => {
  const router = useRouter();
  const { setRefetchBatch } = useContext(AppContext);
  const handleDeleteBatch = async () => {
    try {
      const result: any = await deleteApi(`batch/delete/${batchId}`);
      if (result?.success === true) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Deletion successful",
          text: result?.message,
          timer: 2000,
        });
        setRefetchBatch((prev: any) => !prev);
        router.push("/batches");
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Deletion failed",
          text: result?.message || "Batch was not deleted",
        });
      }
    } catch (error: any) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something went wrong",
        text: error?.message || "Batch was not deleted",
      });
    }
  };
  return (
    <button
      onClick={handleDeleteBatch}
      className="bg-red-600 px-4 py-2 rounded-md text-white"
    >
      Delete batch
    </button>
  );
};

export default DeleteBatchButton;
