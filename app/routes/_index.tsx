import type { MetaFunction } from "@remix-run/node";
import { EmblaOptionsType } from "embla-carousel";
import Carousel from "~/components/Carousel";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="p-4">
      <div className="mt-16 relative isolate">
        {/* <button className="absolute bottom-10 left-0 right-0 w-fit px-2 py-1 rounded-full text-white z-10 bg-black">
          Shop Now
        </button> */}
        <Carousel />
      </div>
    </div>
  );
}
