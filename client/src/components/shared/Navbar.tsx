/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="bg-gray-100 px-5 lg:px-10 py-2 lg:py-5 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img
          className="h-10 w-10 rounded-full"
          src="./favicon.ico"
          alt="logo"
        />
        <h2 className="text-2xl font-semibold">ADC Institute</h2>
      </div>
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
