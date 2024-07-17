import { deleteApi } from "@/apis";
import { AppContext } from "@/context/AppProvider";
import { useRouter } from "next/router";
import { useContext } from "react";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";

type Props = {
  studentObjectId: string;
};

const DeleteStudentButton = ({ studentObjectId }: Props) => {
  const router = useRouter();
  const { setRefetchBatch } = useContext(AppContext);
  const handleDeleteBatch = async () => {
    Swal.fire({
      position: "center",
      title: "Do you want to delete the student?",
      text: "Note: This student will be removed permanently from batch and database",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const result: any = await deleteApi(
            `student/delete/${studentObjectId}`
          );
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
              text: result?.message || "Student was not deleted",
            });
          }
        } catch (error: any) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Something went wrong",
            text: error?.message || "Student was not deleted",
          });
        }
      }
    });
  };
  return (
    <button title="Delete the student" onClick={handleDeleteBatch}>
      <FaTrashAlt className="text-xl text-red-500" />
    </button>
  );
};

export default DeleteStudentButton;
