import { ShoppingBag } from "lucide-react";

export default function ShoppingBagWithItems({
  items,
}: {
  items: number | null;
}) {
  return (
    <div className="relative">
      <ShoppingBag size={16} />
      <div className="absolute -bottom-1 -right-1 w-[12px] h-[12px] rounded-full flex items-center justify-center bg-red-700 text-white font-semibold text-[10px]">
        {items}
      </div>
    </div>
  );
}
