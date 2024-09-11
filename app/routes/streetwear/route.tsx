import Carousel from "~/components/Carousel";
import CarouselSlide from "~/components/Carousel/CarouselSlide";
import StreetwearCarousel from "~/components/Carousel/streetwearCarousel";

export default function Route() {
  return (
    <div className="mt-16 p-4 min-h-screen">
      <h1 className="text-2xl font-bold tracking-[2px] uppercase mb-4">
        Streetwear
      </h1>
      <StreetwearCarousel />
    </div>
  );
}
