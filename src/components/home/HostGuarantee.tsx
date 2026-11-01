import Link from "next/link";
import type { CSSProperties } from "react";
import {
  FaShieldHalved,
  FaUserCheck,
  FaScrewdriverWrench,
  FaHeadset,
} from "react-icons/fa6";

const guarantees = [
  {
    title: "Liability Protection",
    text: "Every booking is covered, so hosts and creators can work without worrying about accidents.",
    Icon: FaShieldHalved,
  },
  {
    title: "Verified Profiles",
    text: "Hosts and creators are verified, so you always know who you are booking with.",
    Icon: FaUserCheck,
  },
  {
    title: "Equipment Safety",
    text: "Security deposits and clear equipment lists keep gear protected on every shoot.",
    Icon: FaScrewdriverWrench,
  },
  {
    title: "24/7 Host Support",
    text: "Our support team is available around the clock to help with bookings and issues.",
    Icon: FaHeadset,
  },
];

// Hexagon shape (dui pash sharp)
const hex: CSSProperties = {
  clipPath: "polygon(9% 0, 91% 0, 100% 50%, 91% 100%, 9% 100%, 0 50%)",
};

// Ultra-subtle grid with radial shadow fade (fade-out vignette effect)
const gridBgStyle: CSSProperties = {
  backgroundImage: `
    linear-gradient(to right, color-mix(in oklab, var(--color-base-content) 3%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in oklab, var(--color-base-content) 3%, transparent) 1px, transparent 1px)
  `,
  backgroundSize: "24px 24px",
  WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
  maskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
};

export default function HostGuarantee() {
  return (
    <section className="relative isolate overflow-hidden bg-base-200 py-24">
      {/* Subtle shadowy grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={gridBgStyle}
      />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 lg:grid-cols-2">
        {/* Left: heading */}
        <div>
         
          <h2 className="text-3xl font-bold md:text-5xl">
            Host Guarantee and Creator Support
          </h2>
          <p className="mt-4 max-w-lg opacity-70">
            Whether you are listing a space or booking one, StudioSpace keeps
            every session safe, clear and supported from start to finish.
          </p>
          <Link href="/studios" className="btn btn-primary btn-lg mt-8">
            Explore Studios
          </Link>
        </div>

        {/* Right: zigzag hexagon cards */}
        <div className="py-4">
          {guarantees.map(({ title, text, Icon }, i) => {
            const alignRight = i % 2 === 0;

            return (
              <div
                key={title}
                style={{ zIndex: guarantees.length - i }}
                className={`relative w-full sm:w-[84%] ${
                  alignRight ? "sm:ml-auto" : ""
                } ${i > 0 ? "mt-4 sm:-mt-9" : ""}`}
              >
                {/* Main hexagon */}
                <div className="relative">
                  <div
                    style={hex}
                    className="relative bg-gradient-to-br from-primary/60 via-base-300 to-primary/20"
                  >
                    <span
                      style={hex}
                      className="absolute inset-[1.5px] bg-base-100"
                    />
                    <div className="relative flex min-h-44 flex-col items-center justify-center px-[14%] py-8 text-center">
                      <Icon className="mb-3 text-3xl text-primary" />
                      <h3 className="text-lg font-semibold">{title}</h3>
                      <p className="mt-2 text-sm opacity-70">{text}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}