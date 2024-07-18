import { IUser } from "@/types/user.type";

export const handleSearchUsers = (users: IUser[], searchQuery: string) => {
  const filteredUser = users?.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toString().includes(searchQuery) ||
      user.createdAt
        .toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  });

  return filteredUser;
};
