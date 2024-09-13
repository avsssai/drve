import { redirect } from "@remix-run/node";
import { storage } from "~/auth/session.server";

export async function logOutUser(request: Request) {
  const session = await storage.getSession();
  return redirect("/", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}
