import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { EmblaOptionsType } from "embla-carousel";
import { ArrowRight, ArrowUpRightFromSquare } from "lucide-react";
import { db } from "~/auth/db.server";
import Carousel from "~/components/Carousel";
import LandingCarousel from "~/components/Carousel/landingCarousel";

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
        <LandingCarousel />
      </div>
      <div className="mt-8">
        <h2 className="text-2xl mb-8 font-bold tracking-wide uppercase text-center">
          Stand out in the crowd.
        </h2>
        <div className="flex flex-col md:flex-row w-full gap-4 isolate">
          <Link to={"/streetwear"} className="w-full">
            <div className="relative max-h-screen rounded-lg h-[400px] md:h-[calc(100vh-32px)] shadow-lg">
              <button className="inline-flex gap-2 shadow-lg items-center absolute px-2 py-1 text-sm font-bold bg-black text-white z-10">
                Shop Streetwear <ArrowRight size={14} />
              </button>
              <img
                src="/landing/streetwear.jpeg"
                alt="2 ppl wearing streetwear"
                className="absolute h-full w-full object-cover rounded-lg"
              />
            </div>
          </Link>
          <Link to={"/sneakers"} className="w-full">
            <div className="relative max-h-screen rounded-lg h-[400px] md:h-[calc(100vh-32px)] shadow-lg">
              <button className="inline-flex gap-2 shadow-lg items-center absolute px-2 py-1 text-sm font-bold bg-black text-white z-10">
                Shop Sneakers <ArrowRight size={14} />
              </button>
              <img
                src="/landing/sneakers.jpeg"
                alt="A white sneaker"
                className="absolute h-full w-full object-cover rounded-lg"
              />
            </div>
          </Link>
          <Link to={"/hoodies"} className="w-full">
            <div className="relative max-h-screen rounded-lg h-[400px] md:h-[calc(100vh-32px)] shadow-lg">
              <button className="inline-flex gap-2 shadow-lg items-center absolute px-2 py-1 text-sm font-bold bg-black text-white z-10">
                Shop Hoodies <ArrowRight size={14} />
              </button>
              <img
                src="/landing/hoodie.jpeg"
                alt="A black hoodie"
                className="absolute h-full w-full object-cover rounded-lg"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
