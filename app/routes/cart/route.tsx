import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { getUserId, requireUserSession } from "~/auth/session.server";
import { getCurrentLoggedInUser } from "~/user/userInfo.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request);
  if (!userId) {
    throw new Response("Unauthorized", {
      status: 403,
      statusText: "Unauthorized",
    });
  }
  const user = await getCurrentLoggedInUser(userId);
  if (!user) {
    throw new Response("Unauthorized", {
      status: 403,
      statusText: "Unauthorized",
    });
  }
  return json({ userId, role: user.role });
};

export default function Profile() {
  const { userId } = useLoaderData<typeof loader>();
  console.log(userId);
  return (
    <div className="mt-20 h-full w-full">
      <div className="flex gap-4 justify-start border-2 mx-auto max-w-[720px] p-4">
        <div className="border-r-2 border-r-gray-700">
          <ul className="mr-2 text-sm">
            <li>
              <NavLink
                to={"/cart"}
                end
                className={({ isActive }) =>
                  isActive ? "underline" : "no-underline"
                }
              >
                Cart
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
