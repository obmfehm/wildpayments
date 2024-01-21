import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export interface ISessionUser {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  role?: string | null | undefined;
}

export default async function isUserAdmin() {
  const session = await getServerSession(authOptions);

  if ((session?.user as ISessionUser).role === "admin") {
    return true;
  }
  return false;
}
