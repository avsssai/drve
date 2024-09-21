import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/auth/db.server";
import StreetwearCarousel from "~/components/Carousel/streetwearCarousel";
import Product from "~/components/product";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const featuredProducts = await db.product.findMany({
    where: {
      category: "streetwear",
    },
    take: 4,
  });

  const polos = await db.product.findMany({
    where: {
      category: "streetwear",
      subCategory: "polos",
    },
    select: {
      id: true,
      name: true,
      imageURL: true,
      price: true,
    },
  });

  const shirts = await db.product.findMany({
    where: {
      category: "streetwear",
      subCategory: "shirts",
    },
    select: {
      id: true,
      name: true,
      imageURL: true,
      price: true,
    },
  });
  const pants = await db.product.findMany({
    where: {
      category: "streetwear",
      subCategory: "pants",
    },
    select: {
      id: true,
      name: true,
      imageURL: true,
      price: true,
    },
  });

  return json({ streetwear: featuredProducts, polos, shirts, pants });
};

export default function Route() {
  const products = useLoaderData<typeof loader>();

  return (
    <div className="mt-16 p-4 flex-1">
      <h1 className="text-2xl font-bold tracking-[2px] uppercase mb-4">
        Streetwear
      </h1>
      <StreetwearCarousel />

      <div className="grid gap-2 my-8 sm:grid-cols-2 md:grid-cols-2">
        {products.streetwear.map((wear) => {
          return <Product product={wear} key={wear.id} />;
        })}
      </div>
      <div>
        <h2 className="text-xl font-bold tracking-[2px] uppercase mb-4">
          Polos
        </h2>
        <div className="grid gap-2 mb-8 grid-cols-2 md:grid-cols-4">
          {products.polos.map((polo) => (
            <Product key={polo.id} product={polo} />
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold tracking-[2px] uppercase mb-4">
          Street Shirts
        </h2>
        <div className="grid gap-2 mb-8 grid-cols-2 md:grid-cols-4">
          {products.shirts.map((shirt) => (
            <Product key={shirt.id} product={shirt} />
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold tracking-[2px] uppercase mb-4">
          Street Pants
        </h2>
        <div className="grid gap-2 mb-8 grid-cols-2 md:grid-cols-4">
          {products.pants.map((pant) => (
            <Product key={pant.id} product={pant} />
          ))}
        </div>
      </div>
    </div>
  );
}
