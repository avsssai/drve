import Carousel from ".";
import CarouselSlide from "./CarouselSlide";

export default function HoodieCarousel() {
  return (
    <Carousel>
      <CarouselSlide
        alt="image of beige hoodie"
        src="/hoodies/beige-hoodie.png"
        slideClassName="absolute h-full w-full object-cover"
      />
      <CarouselSlide
        alt="image of white brand hoodie."
        src="/hoodies/white-brand-hoodie.png"
        slideClassName="absolute h-full w-full object-cover"
      />
      <CarouselSlide
        alt="image of white black hoodie"
        src="/hoodies/white-black-hoodie.png"
        slideClassName="absolute h-full w-full object-cover"
      />
    </Carousel>
  );
}
