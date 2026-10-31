"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";


const images = [
  "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=1920&q=80",
];


const messages = [
  {
    badge: "Photo & Film Studios",
    title: "Find the Perfect Studio for Your Next Shoot",
    text: "Book photo, video and film studios by the hour, with lights, backdrops and gear already set up.",
  },
  {
    badge: "Podcast & Sound Rooms",
    title: "Record Your Sound in a Professional Space",
    text: "Acoustically treated podcast lounges and music suites, ready the moment you walk in.",
  },
  {
    badge: "For Studio Hosts",
    title: "Turn Your Empty Space Into Income",
    text: "List your studio, set your hourly rate, and welcome creators from your city.",
  },
];

const IMAGE_DELAY = 6000; 
const TEXT_DELAY = 4500; 
const TEXT_FADE = 500; 

export default function Hero() {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [textVisible, setTextVisible] = useState(true);

  
  useEffect(() => {
    let swapTimeout: ReturnType<typeof setTimeout>;

    const interval = setInterval(() => {
      setTextVisible(false);
      swapTimeout = setTimeout(() => {
        setTextIndex((prev) => (prev + 1) % messages.length);
        setTextVisible(true);
      }, TEXT_FADE);
    }, TEXT_DELAY);

    return () => {
      clearInterval(interval);
      clearTimeout(swapTimeout);
    };
  }, []);

  const current = messages[textIndex];

  return (
    <section className="relative h-[80vh] min-h-[560px] overflow-hidden">
      {/* Layer 1: image slider */}
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={1800}
          rewind
          allowTouchMove={false}
          autoplay={{ delay: IMAGE_DELAY, disableOnInteraction: false }}
          onSwiper={setSwiper}
          onSlideChange={(s) => setActiveImage(s.realIndex)}
          className="h-full w-full"
        >
          {images.map((src, i) => (
            <SwiperSlide key={src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Studio slide ${i + 1}`}
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-base-100 via-base-100/75 to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-base-100 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-primary/15 via-transparent to-transparent" />

      {/* Layer 3: content */}
      <div className="relative z-20 mx-auto flex h-full max-w-7xl items-center px-4">
        <div className="max-w-2xl pb-10">
          
          <div className="min-h-[19rem] md:min-h-[24rem]">
            <div
              className={`transition-all ease-out ${
                textVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-3 opacity-0"
              }`}
              style={{ transitionDuration: `${TEXT_FADE}ms` }}
            >
              <span className="badge badge-primary badge-outline mb-5 px-4 py-3 font-medium">
                {current.badge}
              </span>
              <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                {current.title}
              </h1>
              <p className="mt-5 max-w-xl text-base opacity-80 md:text-lg">
                {current.text}
              </p>
            </div>
          </div>

    
          <div className="flex flex-wrap gap-3">
            <Link href="/studios" className="btn btn-primary btn-lg">
              Explore Studios
            </Link>
            <Link href="/studios" className="btn btn-outline btn-lg">
              Host Your Space
            </Link>
          </div>
        </div>
      </div>

      {/* Image slider dots */}
      <div className="pointer-events-auto absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-3">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => {
              if (!swiper) return;
              swiper.slideTo(i, 1800);
              swiper.autoplay.start();
            }}
            className="flex h-6 w-6 cursor-pointer items-center justify-center"
          >
            <span
              className={`block h-2 rounded-full transition-all duration-500 ${
                activeImage === i
                  ? "w-8 bg-primary"
                  : "w-2 bg-base-content/40 hover:bg-base-content/70"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}