import { Link } from "@remix-run/react";
import { MenuIcon, Moon, ShoppingBag, User } from "lucide-react";

export default function Header() {
  return (
    <div className="rounded-lg shadow-lg bg-white w-[80vw] md:w-1/2 px-2 py-1">
      <nav>
        <ul className="relative inline-flex justify-evenly items-center w-full">
          <li className="justify-self-start">
            <MenuIcon size={16} />
          </li>
          <li className="justify-self-start">
            <User size={16} />
          </li>
          <li className="rounded-full p-2 border-black border-2">
            <Link className="text-lg font-bold" to="/">
              drve.
            </Link>
          </li>
          <li>
            <Moon size={16} />
          </li>
          <li>
            <ShoppingBag size={16} />
          </li>
        </ul>
      </nav>
    </div>
  );
}
