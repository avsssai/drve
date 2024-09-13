import { redirect } from "@remix-run/react";
import bcrypt from "bcryptjs";
import { db } from "~/auth/db.server";
import { storage } from "~/auth/session.server";

export const validateUserCredentials = async (
  email: string,
  password: string
) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return null;
  }
  const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordMatch) {
    return null;
  }
  return { userId: user.id, email: user.email };
};

export const createUserSession = async (
  userId: string,
  redirectTo: string = "/"
) => {
  const session = await storage.getSession();
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
};
