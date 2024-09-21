import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/auth/db.server";
import ShoeCarousel from "~/components/Carousel/shoesCarousel";
import Product from "~/components/product";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const featuredProducts = await db.product.findMany({
    where: {
      category: "shoes",
    },
    take: 4,
  });

  const sneakers = await db.product.findMany({
    where: {
      category: "shoes",
      subCategory: "Sneakers",
    },
    select: {
      id: true,
      name: true,
      imageURL: true,
      price: true,
    },
  });

  const kickbacks = await db.product.findMany({
    where: {
      category: "shoes",
      subCategory: "kickbacks",
    },
    select: {
      id: true,
      name: true,
      imageURL: true,
      price: true,
    },
  });

  return json({ featured: featuredProducts, sneakers, kickbacks });
};

export default function Route() {
  const products = useLoaderData<typeof loader>();

  return (
    <div className="mt-16 p-4 flex-1">
      <h1 className="text-2xl font-bold tracking-[2px] uppercase mb-4">
        Shoes
      </h1>
      <ShoeCarousel />

      <div className="grid gap-2 my-8 sm:grid-cols-2 md:grid-cols-2">
        {products.featured.map((featured) => {
          return <Product product={featured} key={featured.id} />;
        })}
      </div>
      <div>
        <h2 className="text-xl font-bold tracking-[2px] uppercase mb-4">
          Sneakers
        </h2>
        <div className="grid gap-2 mb-8 grid-cols-2 md:grid-cols-4">
          {products.sneakers.map((sneaker) => (
            <Product key={sneaker.id} product={sneaker} />
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold tracking-[2px] uppercase mb-4">
          Kickbacks
        </h2>
        <div className="grid gap-2 mb-8 grid-cols-2 md:grid-cols-4">
          {products.kickbacks.map((kickback) => (
            <Product key={kickback.id} product={kickback} />
          ))}
        </div>
      </div>
    </div>
  );
}
