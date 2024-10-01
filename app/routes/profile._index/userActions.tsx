import { db } from "~/auth/db.server";

export const getUser = async (userId: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new Response("User not found", {
        statusText: "Not found",
        status: 404,
      });
    }
    return user;
  } catch (error) {
    throw new Error("Error while fetching user.");
  }
};
