import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/auth/db.server";
import StreetwearCarousel from "~/components/Carousel/streetwearCarousel";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const products = await db.product.findMany({
    where: {
      category: "shoes",
    },
  });
  return json({ shoes: products });
};

export default function Route() {
  const products = useLoaderData<typeof loader>();

  return (
    <div className="mt-16 p-4 min-h-screen flex-1">
      <h1 className="text-2xl font-bold tracking-[2px] uppercase mb-4">
        Streetwear
      </h1>
      <StreetwearCarousel />

      <div className="flex my-8">
        {products.shoes.map((shoe) => {
          return (
            <div key={shoe.id}>
              <div className="relative mb-4 h-[150px] w-[150px]">
                <img
                  src={shoe.imageURL}
                  alt={`Image of ${shoe.name}`}
                  className="absolute w-full h-full"
                />
              </div>
              <h2>{shoe.name}</h2>
              <p>{shoe.price}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
