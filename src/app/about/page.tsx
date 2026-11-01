import type { Metadata } from "next";
import Link from "next/link";
import { FaHandshake, FaEye, FaBolt } from "react-icons/fa6";

export const metadata: Metadata = {
  title: "About Us | StudioSpace",
  description: "StudioSpace connects creators with inspiring studios.",
};

const values = [
  {
    number: "01",
    title: "Transparency",
    text: "Hourly rate, deposit and capacity are always shown upfront, so there are no surprises at booking time.",
    Icon: FaEye,
    rotate: "rotate-1",
    pinColor: "bg-orange-500 shadow-orange-500/50",
  },
  {
    number: "02",
    title: "Trust",
    text: "Clear booking status and host details help creators and hosts work together with confidence.",
    Icon: FaHandshake,
    rotate: "-rotate-1",
    pinColor: "bg-blue-600 shadow-blue-600/50",
  },
  {
    number: "03",
    title: "Speed",
    text: "From finding a space to sending a booking takes only a few clicks, so ideas never have to wait.",
    Icon: FaBolt,
    rotate: "rotate-1",
    pinColor: "bg-purple-600 shadow-purple-600/50",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Heading */}
      <section className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-3xl font-bold md:text-5xl">
          A Home for Every Creative Idea
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg opacity-70">
          StudioSpace is a peer-to-peer marketplace where photographers,
          filmmakers, podcasters and musicians find the right space, and where
          studio owners turn empty rooms into income.
        </p>
      </section>

      {/* Mission + what we do (No Hardcoded Colors, Full Theme Switch Support) */}
      <section className="relative overflow-hidden py-24 bg-base-200 border-y border-base-300">
        {/* Subtle theme-adaptive grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />

        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-2 z-10">
          {/* Our Mission Card */}
          <div className="group relative overflow-hidden flex flex-col justify-between rounded-[2.5rem] border border-base-300 bg-base-100 p-10 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 min-h-[280px]">
            {/* Background Image Overlay */}
            <div className="absolute inset-0 z-0 opacity-20 mix-blend-luminosity transition-transform duration-700 group-hover:scale-105">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop"
                alt="Target Space"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-base-100 via-base-100/90 to-transparent" />
            </div>

            <div className="relative z-10 flex flex-col items-start text-left">
              <span className="inline-block rounded-full border border-base-300 px-5 py-1 text-xs font-bold tracking-wider uppercase text-primary bg-base-200 mb-6 shadow-sm">
                Our Mission
              </span>

              <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
              <p className="mt-2 leading-relaxed text-sm md:text-base opacity-80 max-w-md">
                Great work needs the right room. Our mission is to connect
                creators with inspiring studios, so a missing space is never the
                reason a project stops.
              </p>
            </div>
          </div>

          {/* What We Do Card */}
          <div className="group relative overflow-hidden flex flex-col justify-between rounded-[2.5rem] border border-base-300 bg-base-100 p-10 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 min-h-[280px]">
            {/* Background Image Overlay */}
            <div className="absolute inset-0 z-0 opacity-20 mix-blend-luminosity transition-transform duration-700 group-hover:scale-105">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1000&auto=format&fit=crop"
                alt="Studio Space"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-base-100 via-base-100/90 to-transparent" />
            </div>

            <div className="relative z-10 flex flex-col items-start text-left">
              <span className="inline-block rounded-full border border-base-300 px-5 py-1 text-xs font-bold tracking-wider uppercase text-primary bg-base-200 mb-6 shadow-sm">
                What We Do
              </span>

              <h2 className="text-2xl font-semibold mb-3">What We Do</h2>
              <p className="mt-2 leading-relaxed text-sm md:text-base opacity-80 max-w-md">
                We list photo studios, film stages, podcast lounges, music suites
                and workshops, and let creators book them by the hour with clear
                pricing and booking status.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values - Pin Note Style Design */}
      <section className="relative mx-auto max-w-5xl px-6 py-28 overflow-hidden">
        <div className="mb-16 text-center">
         
          <h2 className="text-3xl font-bold md:text-5xl">What We Stand For</h2>
        </div>

        {/* 3-step connected dotted line background */}
        <div className="pointer-events-none absolute inset-x-0 top-[22%] bottom-[18%] hidden md:block z-0 px-12">
          <svg className="w-full h-full text-base-300" viewBox="0 0 700 500" fill="none">
            <path
              d="M 150 50 Q 550 200 550 250 Q 550 300 150 450"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              fill="none"
            />
          </svg>
        </div>

        <div className="relative flex flex-col items-center gap-20 z-10 max-w-md mx-auto md:max-w-none">
          {values.map(({ number, title, text, Icon, rotate, pinColor }, index) => {
            const isEven = index % 2 === 1;
            return (
              <div
                key={title}
                className={`w-full max-w-md transition duration-300 hover:scale-105 ${rotate} ${
                  isEven ? "md:self-end md:mr-12" : "md:self-start md:ml-12"
                }`}
              >
                <div className="relative rounded-3xl border border-base-300 bg-base-100 p-8 shadow-2xl">
                  {/* Pin Graphic at Top Center */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full shadow-md flex items-center justify-center bg-base-100 border border-base-300">
                    <div className={`w-3 h-3 rounded-full shadow ${pinColor}`} />
                  </div>

                  {/* Header info */}
                  <div className="flex items-center justify-between mb-4 mt-1">
                    <span className="text-xl font-extrabold text-primary opacity-90">
                      {number}
                    </span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary text-xl">
                      <Icon />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed opacity-70">{text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-base-200 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Ready to Start Creating?
          </h2>
          <p className="mt-3 opacity-70">
            Find a studio for your next project, or list your own space today.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/studios" className="btn btn-primary btn-lg">
              Explore Studios
            </Link>
            <Link href="/add-studio" className="btn btn-outline btn-lg">
              Host Your Space
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}