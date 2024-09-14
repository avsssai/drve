import { User, UserCircle } from "lucide-react";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { getUserId } from "~/auth/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request);
  return json({ userId });
};

export default function Profile() {
  const { userId } = useLoaderData<typeof loader>();
  console.log(userId);
  return (
    <div className="flex flex-col justify-center items-center">
      <UserCircle size={72} className="mb-8" />
      <h1>John Doe</h1>
      <p>johndoe@email.com</p>
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
