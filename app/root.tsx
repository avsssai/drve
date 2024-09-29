import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import "./tailwind.css";
// Supports weights 100-900
import "@fontsource-variable/raleway/wght.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { getUserId } from "./auth/session.server";
import { getCartItems, numberOfItemsInCart } from "./routes/rootActions";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request);
  const cartItems = userId ? await getCartItems(userId) : null;
  const numOfItemsInCart = userId ? await numberOfItemsInCart(userId) : null;
  return json({ userId, cartItems, numOfItemsInCart });
};

export function Layout({ children }: { children: React.ReactNode }) {
  const { userId, cartItems, numOfItemsInCart } =
    useLoaderData<typeof loader>();
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-primary isolate flex flex-col h-full">
        <div className="fixed top-2 w-full flex justify-center z-20">
          <Header
            userId={userId}
            cartItems={cartItems}
            numberOfItemsInCart={numOfItemsInCart}
          />
        </div>
        {children}
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
