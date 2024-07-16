import Link from "next/link";

const NavbarForSmallDevices = () => {
  return (
    <div className="block  lg:hidden w-full overflow-x-auto mt-3 px-5 py-2">
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

export default NavbarForSmallDevices;
