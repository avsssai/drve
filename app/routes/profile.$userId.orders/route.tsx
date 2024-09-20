import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/auth/db.server";
import { badRequest } from "~/utils/badRequest";

// export const loader = async () => {
//   return json({ image });
// };

export default function Orders() {
  return (
    <div>
      <h1>Orders</h1>
    </div>
  );
}
