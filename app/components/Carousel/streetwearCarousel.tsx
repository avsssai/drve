import Carousel from ".";
import CarouselSlide from "./CarouselSlide";

export default function StreetwearCarousel() {
  return (
    <Carousel>
      <CarouselSlide
        alt="image of a man wearing a yellow polo shirt of the brand drve."
        src="/shirts/man-wearing-yellow-polo.png"
        slideClassName="absolute h-full w-full object-cover"
      />
      <CarouselSlide
        alt="image of a man wearing baggy beige pants of the brand drve."
        src="/pants/man-wearing-beige-loose-pants.png"
        slideClassName="absolute h-full w-full object-cover"
      />
      <CarouselSlide
        alt="image of hung black straight pants of the brand drve."
        src="/pants/black-straight-pants.png"
        slideClassName="absolute h-full w-full object-cover"
      />
    </Carousel>
  );
}
