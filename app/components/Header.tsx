import { Link } from "@remix-run/react";
import { MenuIcon, Moon, ShoppingBag, User } from "lucide-react";
import ShoppingBagComponent from "./ShoppingBag";

interface CartItems {
  id: string;
  cart: {
    id: string;
    CartProduct: {
      product: {
        id: string;
        name: string;
        category: string;
        subCategory: string;
        createdAt: string;
        updatedAt: string;
        price: string;
        imageURL: string;
        userId: string;
      };
      productId: string;
    }[];
  } | null;
}

export default function Header({
  userId,
  cartItems,
  numberOfItemsInCart,
}: {
  userId: string | null;
  // cartItems: CartItems | null;
  cartItems: CartItems | null;
  numberOfItemsInCart: number | null;
}) {
  let numberOfItems = cartItems?.cart?.CartProduct.length;
  return (
    <div className="rounded-lg border-2 shadow-lg bg-white  px-2 py-1">
      <nav>
        <ul className="relative inline-flex justify-evenly gap-16 items-center w-full">
          {/* <li className="justify-self-start">
            <MenuIcon size={16} />
          </li> */}
          <li className="justify-self-start ml-4">
            <Link to={userId ? "/profile" : "/login"}>
              <User size={16} />
            </Link>
          </li>
          <li className="rounded-full p-2 border-black border-2">
            <Link className="text-lg font-bold" to="/">
              drve.
            </Link>
          </li>
          {/* <li>
            <Moon size={16} />
          </li> */}
          <li className="mr-4">
            <Link to={"/cart"}>
              {numberOfItems ? (
                <ShoppingBagComponent items={numberOfItemsInCart} />
              ) : (
                <ShoppingBag size={16} />
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
