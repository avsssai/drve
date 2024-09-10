import { Link } from "@remix-run/react";

export default function Footer() {
  return (
    <footer className="p-4 flex justify-between">
      <h1 className="text-4xl font-black uppercase leading-8">
        Dr <br />
        ve.
      </h1>
      <div>
        <nav>
          <ul className="text-sm italic">
            <li>
              <Link to={"/shop"}>Shop</Link>
            </li>
            <li>
              <Link to={"/account"}>Account</Link>
            </li>
            <li>
              <Link to={"/about"}>About</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
