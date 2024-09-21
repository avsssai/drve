import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { IndianRupee } from "lucide-react";
import invariant from "tiny-invariant";
import { db } from "~/auth/db.server";
import { badRequest } from "~/utils/badRequest";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.productId, "Missing product Id");
  let product = await db.product.findUnique({
    where: {
      id: params.productId,
    },
  });
  if (!product) {
    throw new Response("Not Found", { status: 404, statusText: "Not Found." });
  }
  return json({ product });
};

export default function ProductPage() {
  let data = useLoaderData<typeof loader>();
  return (
    <div className="min-h-screen mt-16 p-8 flex-1 flex flex-col md:flex-row">
      <div className="flex-1 h-fit">
        <div className="relative aspect-square">
          <img
            src={data.product.imageURL}
            alt={`Image of ${data.product.name}`}
            className="absolute h-full w-full"
          />
        </div>
      </div>
      <div className="flex-1 p-4">
        <h1 className="text-3xl uppercase mb-4">{data.product.name}</h1>
        <p className="flex items-center text-xl mb-4">
          <IndianRupee size={16} className="mt-1" /> {data.product.price}/-
        </p>
        <p className="text-sm font-bold">Get by tomorrow 2 PM</p>
      </div>
    </div>
  );
}
