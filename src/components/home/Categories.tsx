import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { IconType } from "react-icons";
import { TbAperture } from "react-icons/tb";
import {
  FaArrowRight,
  FaCamera,
  FaFilm,
  FaMicrophoneLines,
  FaMusic,
  FaPaintbrush,
} from "react-icons/fa6";


const pos = (l: string, t: string, w: string, h: string) =>
  ({ "--l": l, "--t": t, "--w": w, "--h": h }) as CSSProperties;


const NOTCH =
  "lg:[mask-image:radial-gradient(ellipse_39.6%_43.2%_at_50%_-38.6%,transparent_99.5%,#000_100%)] lg:[-webkit-mask-image:radial-gradient(ellipse_39.6%_43.2%_at_50%_-38.6%,transparent_99.5%,#000_100%)]";


const gridStyle: CSSProperties = {
  backgroundImage:
    "linear-gradient(to right, color-mix(in oklab, var(--color-base-content) 9%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--color-base-content) 9%, transparent) 1px, transparent 1px)",
  backgroundSize: "56px 56px",
  maskImage:
    "radial-gradient(ellipse 75% 70% at 50% 50%, #000 25%, transparent 78%)",
  WebkitMaskImage:
    "radial-gradient(ellipse 75% 70% at 50% 50%, #000 25%, transparent 78%)",
};

const glowStyle: CSSProperties = {
  backgroundImage:
    "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--color-primary) 20%, transparent), transparent 52%), radial-gradient(circle at 8% 12%, color-mix(in oklab, var(--color-primary) 10%, transparent), transparent 38%), radial-gradient(circle at 92% 90%, color-mix(in oklab, var(--color-secondary) 12%, transparent), transparent 40%)",
};


const decor: Record<string, ReactNode> = {
  photo: (
    <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2" className="h-full w-full">
      <circle cx="60" cy="60" r="52" />
      <circle cx="60" cy="60" r="36" />
      <circle cx="60" cy="60" r="18" />
      <path d="M60 8v28M60 84v28M8 60h28M84 60h28M23 23l20 20M77 77l20 20M97 23L77 43M43 77L23 97" />
    </svg>
  ),
  film: (
    <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2" className="h-full w-full">
      <rect x="14" y="22" width="92" height="76" rx="8" />
      <path d="M14 40h92M14 80h92" />
      <path d="M26 22v18M44 22v18M62 22v18M80 22v18M98 22v18M26 80v18M44 80v18M62 80v18M80 80v18M98 80v18" />
      <circle cx="60" cy="60" r="12" />
    </svg>
  ),
  podcast: (
    <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="h-full w-full">
      <path d="M16 56v8M30 44v32M44 28v64M58 14v92M72 34v52M86 48v24M100 54v12" />
    </svg>
  ),
  music: (
    <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="h-full w-full">
      <path d="M6 56c10-40 20-40 30 0s20 40 30 0 20-40 30 0 10 18 18 8" />
      <path d="M6 84c10-28 20-28 30 0s20 28 30 0 20-28 30 0" opacity="0.6" />
      <circle cx="26" cy="106" r="5" />
      <circle cx="60" cy="106" r="5" />
      <circle cx="94" cy="106" r="5" />
    </svg>
  ),
  workshop: (
    <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" className="h-full w-full">
      <path d="M12 98c20-8 30-40 52-48s36 4 44-16" />
      <path d="M20 66c14-4 22-22 38-26" strokeWidth="6" opacity="0.6" />
      <circle cx="96" cy="86" r="5" fill="currentColor" stroke="none" />
      <circle cx="78" cy="102" r="3" fill="currentColor" stroke="none" />
    </svg>
  ),
};

type Category = {
  label: string; 
  value: string; 
  text: string;
  Icon: IconType;
  art: ReactNode;
  style: CSSProperties;
  notch?: boolean;
};

const categories: Category[] = [
  {
    label: "Photo Studios",
    value: "Photo Studio",
    text: "Cyc walls, lights and backdrops",
    Icon: FaCamera,
    art: decor.photo,
    style: pos("3%", "3.33%", "29%", "43.33%"),
  },
  {
    label: "Sound Stages",
    value: "Film Stage",
    text: "Large stages for film and video",
    Icon: FaFilm,
    art: decor.film,
    style: pos("68%", "3.33%", "29%", "43.33%"),
  },
  {
    label: "Podcast Rooms",
    value: "Podcast Lounge",
    text: "Treated rooms with pro mics",
    Icon: FaMicrophoneLines,
    art: decor.podcast,
    style: pos("3%", "53.33%", "29%", "43.33%"),
  },
  {
    label: "Music Suites",
    value: "Music Suite",
    text: "Booths for recording and mixing",
    Icon: FaMusic,
    art: decor.music,
    style: pos("68%", "53.33%", "29%", "43.33%"),
  },
  {
    label: "Art Workshops",
    value: "Workshop",
    text: "Open spaces for classes and art",
    Icon: FaPaintbrush,
    art: decor.workshop,
    style: pos("38%", "60%", "24%", "36.67%"),
    notch: true,
  },
];


const lines = [
  { d: "M444 300 C405 300 385 150 345 150 H320", x: 320, y: 150 },
  { d: "M556 300 C595 300 615 150 655 150 H680", x: 680, y: 150 },
  { d: "M444 300 C405 300 385 450 345 450 H320", x: 320, y: 450 },
  { d: "M556 300 C595 300 615 450 655 450 H680", x: 680, y: 450 },
];


const travelers = [
  { delay: 0, dur: 3.4 },
  { delay: 1.7, dur: 3.4 },
];

export default function Categories() {
  return (
    <section className="relative isolate overflow-hidden bg-base-200 py-24">
     
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0" style={glowStyle} />
        <div className="absolute inset-0" style={gridStyle} />
      </div>

      <div className="mx-auto max-w-[1500px] px-4">
        <div className="mb-14 text-center">
          <span className="badge badge-primary badge-outline mb-3 px-4 py-3 font-medium">
            Categories
          </span>
          <h2 className="text-3xl font-bold md:text-5xl">
            Browse by Studio Category
          </h2>
          <p className="mx-auto mt-4 max-w-xl opacity-70">
            Pick the kind of space your next project needs.
          </p>
        </div>

        <div className="relative mx-auto grid max-w-[1400px] gap-4 sm:grid-cols-2 lg:block lg:aspect-[1000/600] lg:gap-0">
          
          <svg
            aria-hidden
            viewBox="0 0 1000 600"
            fill="none"
            className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block"
          >
            <defs>
              <filter id="cat-glow" x="-200%" y="-200%" width="500%" height="500%">
                <feGaussianBlur stdDeviation="5" />
              </filter>
            </defs>

            {lines.map((line) => (
              <g key={line.d}>
              
                <path
                  d={line.d}
                  className="stroke-primary/30"
                  strokeWidth="5"
                  filter="url(#cat-glow)"
                />
                <path
                  d={line.d}
                  className="stroke-primary/60"
                  strokeWidth="1.5"
                />
              
                <circle cx={line.x} cy={line.y} r="4" className="fill-primary" />
                <circle
                  cx={line.x}
                  cy={line.y}
                  r="10"
                  className="fill-primary/40"
                  filter="url(#cat-glow)"
                />

               
                {travelers.map((t, i) => (
                  <g key={i} className="motion-reduce:hidden" opacity="0">
                    <animateMotion
                      path={line.d}
                      dur={`${t.dur}s`}
                      begin={`${t.delay}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0;1;1;0"
                      keyTimes="0;0.12;0.85;1"
                      dur={`${t.dur}s`}
                      begin={`${t.delay}s`}
                      repeatCount="indefinite"
                    />
                    <circle r="12" className="fill-primary/60" filter="url(#cat-glow)" />
                    <circle r="4" className="fill-primary" />
                  </g>
                ))}
              </g>
            ))}
          </svg>

        
          <div className="relative col-span-full mx-auto h-28 w-28 lg:absolute lg:left-1/2 lg:top-1/2 lg:z-10 lg:mx-0 lg:aspect-square lg:h-auto lg:w-[11.2%] lg:-translate-x-1/2 lg:-translate-y-1/2">
            <span
              aria-hidden
              className="absolute -inset-1/2 rounded-full bg-primary/20 blur-2xl"
            />
            <span
              aria-hidden
              className="absolute -inset-[22%] animate-pulse rounded-full border border-primary/30 motion-reduce:animate-none"
            />
            <span
              aria-hidden
              className="absolute -inset-[10%] rounded-full border border-primary/40"
            />
            <div className="relative flex h-full w-full items-center justify-center rounded-full border-2 border-primary bg-base-100 shadow-xl shadow-primary/40">
              <span
                aria-hidden
                className="absolute inset-1 rounded-full bg-gradient-to-br from-primary/20 via-transparent to-transparent"
              />
              <TbAperture className="relative h-1/2 w-1/2 animate-[spin_24s_linear_infinite] text-primary motion-reduce:animate-none" />
            </div>
          </div>

       
          <span
            aria-hidden
            className="col-span-full mx-auto h-8 w-px bg-gradient-to-b from-primary/70 to-transparent lg:hidden"
          />

          
          {categories.map(({ label, value, text, Icon, art, style, notch }) => (
            <Link
              key={value}
              href={`/studios?category=${encodeURIComponent(value)}`}
              style={style}
              className={`group relative flex min-h-48 flex-col justify-end overflow-hidden rounded-3xl border border-base-content/10 bg-gradient-to-br from-base-100/90 via-base-100/70 to-primary/10 p-6 shadow-lg shadow-base-content/5 ring-1 ring-inset ring-base-content/5 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/20 lg:absolute lg:left-[var(--l)] lg:top-[var(--t)] lg:h-[var(--h)] lg:min-h-0 lg:w-[var(--w)] lg:p-5 xl:p-7 ${
                notch ? `sm:col-span-2 lg:col-span-1 ${NOTCH}` : ""
              }`}
            >
              
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent"
              />

             
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-primary/15 blur-3xl transition duration-500 group-hover:bg-primary/25"
              />

              {/* Category related shadow decoration */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-4 -top-4 h-32 w-32 text-primary/10 transition duration-500 group-hover:rotate-6 group-hover:text-primary/20 lg:aspect-square lg:h-[62%] lg:w-auto"
              >
                {art}
              </span>

              <div className="relative">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-xl text-primary ring-1 ring-primary/30 transition group-hover:bg-primary group-hover:text-primary-content lg:h-11 lg:w-11 xl:h-14 xl:w-14 xl:text-2xl">
                  <Icon />
                </span>
                <h3 className="text-xl font-semibold xl:text-2xl">{label}</h3>
                <p className="mt-1 text-sm opacity-70 lg:hidden xl:block">
                  {text}
                </p>
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary">
                  Browse
                  <FaArrowRight className="transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}