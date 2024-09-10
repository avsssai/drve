import { MenuIcon, Moon, ShoppingBag, User } from "lucide-react";

export default function Header() {
  return (
    <div>
      <nav>
        <ul className="relative inline-flex justify-evenly items-center rounded-lg shadow-lg bg-white w-[80vw] md:w-1/2 px-2 py-1">
          <li className="justify-self-start">
            <MenuIcon size={16} />
          </li>
          <li className="justify-self-start">
            <User size={16} />
          </li>
          <li className="rounded-full p-2 border-black border-2">
            <span className="text-lg font-bold">drve.</span>
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
