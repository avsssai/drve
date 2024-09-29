import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { IndianRupee } from "lucide-react";
import invariant from "tiny-invariant";
import { db } from "~/auth/db.server";
import { getUserId } from "~/auth/session.server";
import { badRequest } from "~/utils/badRequest";
import { INTENTS } from "~/utils/constants";

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

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent");
  console.log("hereee with intent");
  const userId = await getUserId(request);
  if (!userId) {
    throw new Response("Unauthorized", {
      status: 401,
      statusText: "Unauthorized.",
    });
  }
  invariant(intent, "Missing form intent");
  switch (intent) {
    case INTENTS.addToCart: {
      const productId = String(formData.get("productId"));
      let cart = await db.cart.findUnique({
        where: {
          userId,
        },
      });
      if (!cart) {
        cart = await db.cart.create({
          data: {
            userId,
          },
        });
      }
      const cartAlreadyHasProduct = await db.cartProduct.findFirst({
        where: {
          cartId: cart.id,
          productId,
        },
      });
      if (cartAlreadyHasProduct) {
        return await db.cartProduct.update({
          where: {
            id: cartAlreadyHasProduct.id,
          },
          data: {
            quantity: {
              increment: 1,
            },
          },
        });
      } else {
        const cartProduct = await db.cartProduct.create({
          data: {
            productId,
            cartId: cart.id,
            quantity: 1,
          },
        });
        return cartProduct;
      }
    }
    default: {
      return badRequest({ message: "Unknown form intent." });
    }
  }
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
          <Form method="post" navigate={false}>
            <input type="hidden" name="intent" value={INTENTS.addToCart} />
            <input type="hidden" name="productId" value={data.product.id} />
            <button
              className="bg-black text-white tracking-widest p-2 uppercase text-sm w-[140px]"
              type="submit"
            >
              Add to cart
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
