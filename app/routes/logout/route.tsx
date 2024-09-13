import { ActionFunctionArgs } from "@remix-run/node";
import { logOutUser } from "./logoutUser.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  return await logOutUser(request);
};
