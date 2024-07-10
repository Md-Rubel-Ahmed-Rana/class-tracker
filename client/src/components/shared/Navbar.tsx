import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="bg-gray-100 px-5 lg:px-20 py-2 lg:py-5 flex justify-between items-center">
      <h2 className="text-2xl font-semibold">ADC Institute</h2>
      <ul className="flex gap-2">
        <li>
          <Link
            className="border px-3 py-1 rounded-md bg-gray-200"
            href={"/dashboard"}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            className="border px-3 py-1 rounded-md bg-gray-200"
            href={"/batches"}
          >
            Batches
          </Link>
        </li>
        <li>
          <Link
            className="border px-3 py-1 rounded-md bg-gray-200"
            href={"/classes"}
          >
            Classes
          </Link>
        </li>
        <li>
          <Link
            className="border px-3 py-1 rounded-md bg-gray-200"
            href={"/students"}
          >
            Students
          </Link>
        </li>
        <li>
          <Link
            className="border px-3 py-1 rounded-md bg-gray-200"
            href={"/users"}
          >
            Users
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
