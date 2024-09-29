import { IndianRupee } from "lucide-react";
import { Form, useLoaderData } from "@remix-run/react";
import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { requireUserSession } from "~/auth/session.server";
import { getCartItems } from "../rootActions";
import { INTENTS } from "~/utils/constants";
import invariant from "tiny-invariant";
import { db } from "~/auth/db.server";
// import { getCart } from "./cartActions";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // need to change this to have cart operating even when no authentication.
  const userId = await requireUserSession(request);
  const cartProducts = await getCartItems(userId);
  // const cart = await getCart(userId);
  return json({ userId, cartProducts });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent");
  invariant("intent", "Missing form intent.");

  const cartId = String(formData.get("cartId"));
  const cartProductId = String(formData.get("cartProductId"));
  console.log("STUFF MAN", cartId, cartProductId);
  invariant(cartId, "Missing cart Id");
  console.log("hereeeees1");
  switch (intent) {
    case INTENTS.upQuantity: {
      console.log("hereeeees");
      return await db.cartProduct.update({
        where: {
          cartId,
          id: cartProductId,
        },
        data: {
          quantity: { increment: 1 },
        },
      });
    }
    case INTENTS.downQuantity: {
      const currentItem = await db.cartProduct.findFirst({
        where: {
          cartId,
          id: cartProductId,
        },
      });
      if (!currentItem || currentItem.quantity <= 1) {
        return await db.cartProduct.delete({
          where: {
            cartId,
            id: cartProductId,
          },
        });
      } else {
        return await db.cartProduct.update({
          where: {
            cartId,
            id: cartProductId,
          },
          data: {
            quantity: { decrement: 1 },
          },
        });
      }
    }
    default: {
      throw new Error("Unknown form intent.");
    }
  }
};

export default function Profile() {
  const { userId, cartProducts } = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-bold mb-4">Your cart</h1>
      <div>
        {cartProducts?.cart?.CartProduct.map((cartProduct) => (
          <div className="flex gap-2 mb-4">
            <div className="relative h-[150px] aspect-square">
              <img
                src={cartProduct.product.imageURL}
                className="absolute w-full h-full"
                alt={`Image of ${cartProduct.product.name}`}
              />
            </div>
            <div className="leading-5">
              <h2 className="mb-2 text-sm md:text-base">
                {cartProduct.product.name}
              </h2>
              <p className="flex items-center font-normal text-xs">
                <IndianRupee size={14} fontWeight={300} />{" "}
                <span> {cartProduct.product.price}/-</span>
              </p>{" "}
              <div className="inline-flex gap-2 items-center justify-start mt-4">
                <Form method="post" navigate={false}>
                  <input
                    type="hidden"
                    name="intent"
                    value={INTENTS.downQuantity}
                  />
                  <input
                    type="hidden"
                    name="cartProductId"
                    value={cartProduct.id}
                  />

                  <input
                    type="hidden"
                    name="cartId"
                    value={cartProducts.cart?.id}
                  />

                  <button
                    type="submit"
                    className="px-2 bg-black text-white rounded-sm"
                  >
                    -
                  </button>
                </Form>
                <span className="leading-1">{cartProduct.quantity}</span>
                <Form method="post" navigate={false}>
                  <input
                    type="hidden"
                    name="intent"
                    value={INTENTS.upQuantity}
                  />
                  <input
                    type="hidden"
                    name="cartId"
                    value={cartProducts.cart?.id}
                  />
                  <input
                    type="hidden"
                    name="cartProductId"
                    value={cartProduct.id}
                  />
                  <button
                    type="submit"
                    className="px-2 bg-black text-white rounded-sm"
                  >
                    +
                  </button>
                </Form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
