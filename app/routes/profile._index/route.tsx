import { User, UserCircle } from "lucide-react";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { getUserId, requireUserSession } from "~/auth/session.server";
import { getUser } from "./userActions";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // change functionality to work even when user isnt signed in
  // const userId = await getUserId(request);
  const userId = await requireUserSession(request);
  //

  const user = await getUser(userId);

  return json({ userId, user });
};

export default function Profile() {
  const { userId, user } = useLoaderData<typeof loader>();
  console.log(userId);
  return (
    <div className="flex flex-col justify-center items-center">
      <UserCircle size={72} className="mb-8" />
      <h1>{user.email}</h1>
      <Form method="post" action="/logout">
        <button
          type="submit"
          className="bg-black w-full text-white text-sm font-bold px-2 py-3 my-2 rounded-md focus:outline-none focus:ring focus:ring-black"
        >
          Logout
        </button>
      </Form>
    </div>
  );
}
