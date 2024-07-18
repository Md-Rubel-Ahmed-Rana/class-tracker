import { getApi } from "@/apis";
import { userRoles } from "@/constants/roles";
import { IUser } from "@/types/user.type";
import { handleSearchUsers } from "@/utils/searchUsers";
import Link from "next/link";
import { useEffect, useState } from "react";

const UsersPage = () => {
  const [users, setUsers] = useState<IUser[] | []>([]);
  const [search, setSearch] = useState("");
  const [isChangeRole, setIsChangeRole] = useState("");

  const handleFetchUsers = async () => {
    try {
      const result = await getApi("user");
      setUsers(result?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchUsers();
  }, []);

  const handleRemoveUser = (id: string) => {
    // Implement user removal logic here
    console.log("Remove user with id:", id);
  };

  const handleRoleChange = (id: string, role: string) => {
    // Implement user role change logic here
    console.log("Change role for user with id:", id, role);
  };

  const filteredUsers = handleSearchUsers(users, search);

  return (
    <div className="p-5 lg:px-10 lg:py-5">
      <div className="flex justify-end">
        <Link
          className="bg-blue-500 px-4 py-2 rounded-md mb-3 text-white"
          href={"/add-new-user"}
        >
          Add New User
        </Link>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border focus:outline-sky-500 rounded-md w-full"
        />
      </div>
      <ul className="space-y-4">
        {filteredUsers.map((user) => (
          <li key={user._id} className="bg-white p-4 rounded-md shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg lg:text-xl font-semibold">
                  {" "}
                  <b>Name: </b> {user.name}
                </h2>
                <p className="text-gray-600">
                  {" "}
                  <b>Email: </b> {user.email}
                </p>
                <p className="text-gray-600">
                  {" "}
                  <b>Role: </b> {user.role}
                </p>
              </div>
              <div className="flex space-x-2">
                <Link
                  href={`/users/user/edit/${user._id}?name=${user.name}&email=${user.email}`}
                >
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleRemoveUser(user._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Remove
                </button>
                <div className="relative">
                  <button
                    onClick={() =>
                      setIsChangeRole((prev) => (prev ? "" : user._id))
                    }
                    className="px-4 py-2 bg-green-500 text-white rounded-md"
                  >
                    Change Role
                  </button>
                  {isChangeRole === user._id && (
                    <div className="absolute bg-gray-500 p-3 flex flex-col gap-2 w-40 z-50 right-0 top-11 rounded-md">
                      {userRoles.map((role, index) => (
                        <button
                          onClick={() => handleRoleChange(user._id, role)}
                          disabled={role === user.role}
                          key={index}
                          className={`${
                            role === user.role
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-gray-300 hover:bg-gray-200"
                          } rounded-md w-full py-1 font-semibold`}
                        >
                          {role.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
