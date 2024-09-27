import { json } from "@remix-run/node";
import { db } from "~/auth/db.server";

export const getCartItems = async (userId: string) => {
  const cartItems = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      cart: {
        select: {
          id: true,
          CartProduct: {
            select: {
              productId: true,
              product: true,
            },
          },
        },
      },
    },
  });
  if (!cartItems) return null;
  return cartItems;
};

export const numberOfItemsInCart = async (userId: string) => {
  const noOfItems = await db.cartProduct.aggregate({
    _sum: {
      quantity: true,
    },
    where: {
      cart: {
        userId,
      },
    },
  });
  return noOfItems._sum.quantity;
};
