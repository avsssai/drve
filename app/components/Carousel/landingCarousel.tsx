import Carousel from ".";
import CarouselSlide from "./CarouselSlide";

export default function LandingCarousel() {
  return (
    <Carousel>
      <CarouselSlide
        alt="image of a shirt, pant and shoes of brand drve."
        src="/landing/drve-slide1.jpeg"
        slideClassName="absolute h-full w-full object-cover"
      />
      <CarouselSlide
        alt="image of a man wearing a blue polo shirt of the brand drve."
        src="/landing/drve-slide2.jpeg"
        slideClassName="absolute h-full w-full object-cover"
      />
      <CarouselSlide
        alt="image of many polo shirts of the brand drve."
        src="/landing/drve-slide3.jpeg"
        slideClassName="absolute h-full w-full object-cover"
      />
    </Carousel>
  );
}
