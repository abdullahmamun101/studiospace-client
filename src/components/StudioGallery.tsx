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
    <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-base-300 bg-base-200">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        className="aspect-[4/3] w-full sm:aspect-[16/9]"
        style={
          {
            "--swiper-theme-color": "var(--color-primary)",
            "--swiper-navigation-size": "24px",
          } as React.CSSProperties
        }
      >
        {images.map((src, i) => (
          <SwiperSlide key={`${src}-${i}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${title} photo ${i + 1}`}
              className="block h-full w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}