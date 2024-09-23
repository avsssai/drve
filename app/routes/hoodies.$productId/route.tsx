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
    <div className=" mt-16 p-4 md:p-16 flex-1 flex flex-col md:flex-row gap-4">
      <div className="flex-1 h-fit mb-8">
        <div className="relative aspect-square">
          <img
            src={data.product.imageURL}
            alt={`Image of ${data.product.name}`}
            className="absolute h-full w-full"
          />
        </div>
      </div>
      <div className="flex-1 p-4">
        <h1 className="text-3xl uppercase mb-1">{data.product.name}</h1>
        <p className="flex items-center text-xl mb-8">
          <IndianRupee size={16} className="mt-1" /> {data.product.price}/-
        </p>
        {/* <p className="text-sm font-bold mb-4">Get by tomorrow 2 PM</p> */}
        <div className="">
          <select
            name="size"
            id="size"
            required
            className="text-sm outline outline-1 mb-4  focus:outline-offset-2 p-2 block"
          >
            <option value="">Please select the size</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>
        <div className="mt-8">
          <button className="bg-black text-white tracking-widest p-2 uppercase text-sm w-[140px]">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
