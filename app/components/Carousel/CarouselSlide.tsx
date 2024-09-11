import { PropsWithChildren } from "react";

export default function CarouselSlide({
  children,
  alt,
  slideClassName = "absolute h-full w-full object-cover",
  src,
}: PropsWithChildren<{ alt: string; src: string; slideClassName?: string }>) {
  return (
    <div className="embla__slide">
      <div className="relative h-full w-full">
        <img alt={alt} src={src} className={slideClassName} />
      </div>
    </div>
  );
}
