import useHandlePropagation from "@/hooks/useHandlePropagation";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

type Props = {
  name: string;
  studentId: string;
  id: string;
  batchNo: string;
  createdAt: string;
  updatedAt: string;
};

const MyInfoCard = ({
  batchNo,
  createdAt,
  id,
  name,
  studentId,
  updatedAt,
}: Props) => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const modalRef = useRef(null);
  const closeModal = useHandlePropagation();

  const handleLogout = () => {
    router.push("/");
  };

  useEffect(() => {
    closeModal(modalRef, setShow);
  }, [closeModal]);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg w-full lg:my-4">
      <div className="flex items-center justify-between  mb-4 relative">
        <h3 className="text-xl font-bold">My Info</h3>
        <BsThreeDotsVertical
          onClick={() => setShow(true)}
          className="text-2xl cursor-pointer"
        />
        {show && (
          <div
            ref={modalRef}
            className="absolute right-0 top-10 bg-gray-300 p-2 rounded-md"
          >
            <div className="flex flex-col gap-2 font-serif">
              <Link
                className="bg-gray-200 text-center px-2 py-1 rounded-md w-full"
                href={"/change-password"}
              >
                Change password
              </Link>
              <Link
                className="bg-gray-200  text-center  px-2 py-1 rounded-md w-full"
                href={`/student/edit-info/${id}?studentId=${studentId}&name=${name}`}
              >
                Edit name
              </Link>
              <button
                onClick={handleLogout}
                className="bg-gray-200  text-center  px-2 py-1 rounded-md w-full"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="text-gray-700">
        <h2 className="text-lg font-semibold">Name: {name}</h2>
        <p>Student ID: {studentId}</p>
        <p>User ID: {id}</p>
        <p>Batch No: {batchNo}</p>
        <p>Enrollment date: {new Date(createdAt).toLocaleDateString()}</p>
        <p>Last updated: {new Date(updatedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default MyInfoCard;
