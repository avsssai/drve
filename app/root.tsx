import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";
// Supports weights 100-900
import "@fontsource-variable/raleway/wght.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export function Layout({ children }: { children: React.ReactNode }) {
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
          <Header />
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
