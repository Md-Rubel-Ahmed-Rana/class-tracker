import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="bg-gray-100 px-5 lg:px-20 py-2 lg:py-5 flex justify-between items-center">
      <h2 className="text-2xl font-semibold">ADC Institute</h2>
      <ul className="flex gap-2">
        <li>
          <Link className="border px-3 py-1 rounded-md bg-gray-200" href={"/"}>
            Home
          </Link>
        </li>
        <li>
          <Link
            className="border px-3 py-1 rounded-md bg-gray-200"
            href={"/all-batches"}
          >
            All Batch
          </Link>
        </li>
        <li>
          <Link
            className="border px-3 py-1 rounded-md bg-gray-200"
            href={"/add-new-batch"}
          >
            Add New Batch
          </Link>
        </li>
        <li>
          <Link
            className="border px-3 py-1 rounded-md bg-gray-200"
            href={"/add-new-class"}
          >
            Add New Class
          </Link>
        </li>
        <li>
          <Link
            className="border px-3 py-1 rounded-md bg-gray-200"
            href={"/add-new-student"}
          >
            Add New Student
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
