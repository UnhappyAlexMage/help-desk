import { users } from "../../mock/data/users.ts";

export const getUserNameById = ( userId?: string ) => {
  
  if (!userId) { return "Неизвестный User" };

  const user = users.find((user) => user.id === userId);

  console.log("FOUND USER:", user);

  return user?.fullName ?? "Неизвестный User";
};