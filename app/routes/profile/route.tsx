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
    <div className="mt-16 h-full w-full">
      <div className="flex gap-4 justify-start border-2 mx-auto max-w-[720px] p-4">
        <div className="border-r-2 border-r-gray-700">
          <ul className="mr-2 text-sm">
            <li>
              <NavLink
                to={"/profile"}
                className={({ isActive }) =>
                  isActive ? "underline" : "no-underline"
                }
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/profile/${userId}/orders`}
                className={({ isActive }) =>
                  isActive ? "underline" : "no-underline"
                }
              >
                Orders
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="flex-1">
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
        </div>
      </div>
    </div>
  );
}
