import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/auth/db.server";
import HoodieCarousel from "~/components/Carousel/hoodieCarousel";
import Product from "~/components/product";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const featuredProducts = await db.product.findMany({
    where: {
      category: "hoodies",
    },
    take: 4,
  });

  const winterHoodies = await db.product.findMany({
    where: {
      category: "hoodies",
      subCategory: "winter",
    },
    select: {
      id: true,
      name: true,
      imageURL: true,
      price: true,
    },
  });

  return json({ featured: featuredProducts, winterHoodies });
};

export default function Route() {
  const products = useLoaderData<typeof loader>();

  return (
    <div className="mt-16 p-4 md:px-16 flex-1">
      <h1 className="text-2xl font-bold tracking-[2px] uppercase mb-4">
        Hoodies
      </h1>
      <HoodieCarousel />

      <div className="grid gap-2 my-8 sm:grid-cols-2 md:grid-cols-2">
        {products.featured.map((featured) => {
          return <Product product={featured} key={featured.id} />;
        })}
      </div>
      <div>
        <h2 className="text-xl font-bold tracking-[2px] uppercase mb-4">
          Street Hoodies
        </h2>
        <div className="grid gap-2 mb-8 grid-cols-2 md:grid-cols-4">
          {products.winterHoodies.map((hoodie) => (
            <Product key={hoodie.id} product={hoodie} />
          ))}
        </div>
      </div>
    </div>
  );
}
