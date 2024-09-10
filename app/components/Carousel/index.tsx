import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import "./carousel.css";

export default function Carousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide">
          <div className="relative h-full w-full">
            <img
              alt="image of a shirt, pant and shoes of brand drve."
              src="/landing/drve-slide1.jpeg"
              className="absolute h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="embla__slide">
          <div className="relative h-full w-full">
            <img
              alt="image of a man wearing a blue polo shirt of the brand drve."
              src="/landing/drve-slide2.jpeg"
              className="absolute h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="embla__slide">
          <div className="relative h-full w-full">
            <img
              alt="image of many polo shirts of the brand drve."
              src="/landing/drve-slide3.jpeg"
              className="absolute h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
