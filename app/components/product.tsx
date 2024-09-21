import { IndianRupee } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category?: string;
  subCategory?: string;
  createdAt?: string;
  updatedAt?: string;
  price: string;
  imageURL: string;
  userId?: string;
}

export default function Product({ product }: { product: Product }) {
  return (
    <div key={product.id} className="mb-4">
      <div className="relative mb-1 md:mb-2 aspect-square w-full">
        <img
          src={product.imageURL}
          alt={`Image of ${product.name}`}
          className="absolute w-full h-full"
        />
      </div>
      <h2 className="text-sm lg:text-base">{product.name}</h2>
      <p className="flex items-center font-normal text-sm">
        <IndianRupee size={14} fontWeight={300} />{" "}
        <span> {product.price}/-</span>
      </p>
    </div>
  );
}
