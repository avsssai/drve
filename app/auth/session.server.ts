import { createCookieSessionStorage, redirect } from "@remix-run/node";

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("Missing session secret.");
}

export const storage = createCookieSessionStorage({
  cookie: {
    secrets: [sessionSecret],
    name: "drve_session",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
  },
});

export const getUserSession = async (request: Request) => {
  return storage.getSession(request.headers.get("Cookie"));
};

export const requireUserSession = async (
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) => {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    throw redirect(`/login?${redirectTo}`);
  }
  return userId;
};
