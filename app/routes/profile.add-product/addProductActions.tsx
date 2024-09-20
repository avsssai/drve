import { db } from "~/auth/db.server";

export async function createNewProduct(
  name: string,
  category: string,
  subCategory: string,
  price: string,
  imageUrl: string,
  userId: string
) {
  try {
    console.log(category);
    const newProduct = await db.product.create({
      data: {
        name,
        category,
        subCategory,
        price,
        imageURL: imageUrl,
        userId: userId,
      },
    });
    return newProduct;
  } catch (error) {
    throw new Response("Error creating product.", {
      status: 500,
      statusText: "Error creating product.",
    });
  }
}
