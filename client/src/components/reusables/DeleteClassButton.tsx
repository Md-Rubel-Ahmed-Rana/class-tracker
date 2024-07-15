import { deleteApi } from "@/apis";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

type Props = {
  classId: string;
};

const DeleteClassButton = ({ classId }: Props) => {
  const router = useRouter();
  const handleDeleteClass = () => {
    Swal.fire({
      position: "center",
      title: "Do you want to delete the class?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const result = await deleteApi(`class/delete/${classId}`);
          if (result?.success === true) {
            Swal.fire({
              position: "center",
              title: "Deletion done",
              icon: "success",
              text: "Your class has been deleted successfully",
            });
            router.reload();
          } else {
            Swal.fire({
              position: "center",
              title: "Failed to delete",
              icon: "error",
              text: "Your class was not deleted",
            });
          }
        } catch (error: any) {
          Swal.fire({
            position: "center",
            title: "Something went wrong",
            icon: "error",
            text: error?.message || "Class was not deleted",
          });
        }
      }
    });
  };
  return (
    <button
      onClick={handleDeleteClass}
      className="bg-red-600 px-4 py-1 lg:py-2 rounded-md text-white"
    >
      Delete class
    </button>
  );
};

export default DeleteClassButton;
