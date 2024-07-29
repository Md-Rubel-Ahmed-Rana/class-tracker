import { deleteApi } from "@/apis";
import { AppContext } from "@/context/AppProvider";
import { useRouter } from "next/router";
import { useContext } from "react";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";

type Props = {
  batchObjectId: string;
};

const DeleteBatchIcon = ({ batchObjectId }: Props) => {
  const router = useRouter();
  const { setRefetchBatch } = useContext(AppContext);
  const handleDeleteBatch = async () => {
    Swal.fire({
      position: "center",
      title: "Do you want to delete the batch?",
      text: "Note: This batch will be removed permanently from database",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const result: any = await deleteApi(`batch/delete/${batchObjectId}`);
          if (result?.success === true) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Deletion successful",
              text: result?.message,
              timer: 2000,
            });
            setRefetchBatch((prev: any) => !prev);
            router.reload();
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
      }
    });
  };
  return (
    <button title="Delete the batch" onClick={handleDeleteBatch}>
      <FaTrashAlt className="text-xl text-red-500" />
    </button>
  );
};

export default DeleteBatchIcon;
