import { db } from "~/auth/db.server";

export async function getCart(userId: string) {
  try {
    const cart = await db.cart.findUnique({
      where: {
        userId,
      },
      select: {
        CartProduct: true,
        userId: true,
      },
    });
    return cart;
  } catch (error) {
    throw new Error("Couldn't get the user's cart.");
  }
}
