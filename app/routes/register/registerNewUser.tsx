import { db } from "~/auth/db.server";
import bcrypt from "bcryptjs";
import { createUserSession } from "../login/loginUser.server";

export const registerNewUser = async (email: string, password: string) => {
  const userExists = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (userExists) {
    return null;
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = await db.user.create({
    data: { email, passwordHash, dob: "1995-06-19T00:00:00.000Z" },
  });
  return await createUserSession(newUser.id);
};
