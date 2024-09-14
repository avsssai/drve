import { db } from "~/auth/db.server";

export async function getCurrentLoggedInUser(userId: string) {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return null;
  }
  return user;
}
