"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function StudioGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-base-300">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        className="h-72 w-full md:h-[26rem]"
        style={
          {
            "--swiper-theme-color": "var(--color-primary)",
            "--swiper-navigation-size": "28px",
          } as React.CSSProperties
        }
      >
        {images.map((src, i) => (
          <SwiperSlide key={`${src}-${i}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${title} photo ${i + 1}`}
              className="h-full w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}