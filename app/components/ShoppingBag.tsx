import { ShoppingBag } from "lucide-react";

export default function ShoppingBagWithItems({ items }: { items: number }) {
  return (
    <div className="relative">
      <ShoppingBag size={16} />
      <div className="absolute bottom-0 right-0 w-[8px] h-[8px] rounded-full flex items-center justify-center bg-red-500 text-white font-extrabold text-[6px]">
        {items}
      </div>
    </div>
  );
}
