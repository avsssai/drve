import Carousel from ".";
import CarouselSlide from "./CarouselSlide";

export default function ShoeCarousel() {
  return (
    <Carousel>
      <CarouselSlide
        alt="image of red blue kickbacks"
        src="/shoes/blue-red-kickbacks.png"
        slideClassName="absolute h-full w-full object-cover"
      />
      <CarouselSlide
        alt="image of yellow tennis shoes."
        src="/shoes/yellow-tennis-shoes.png"
        slideClassName="absolute h-full w-full object-cover"
      />
      <CarouselSlide
        alt="image of Blue funky shoe"
        src="/shoes/blue-funky-shoe.png"
        slideClassName="absolute h-full w-full object-cover"
      />
    </Carousel>
  );
}
