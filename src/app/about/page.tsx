import type { Metadata } from "next";
import Link from "next/link";
import { FaHandshake, FaEye, FaBolt } from "react-icons/fa6";

export const metadata: Metadata = {
  title: "About Us | StudioSpace",
  description: "StudioSpace connects creators with inspiring studios.",
};

const values = [
  {
    title: "Transparency",
    text: "Hourly rate, deposit and capacity are always shown upfront, so there are no surprises at booking time.",
    Icon: FaEye,
  },
  {
    title: "Trust",
    text: "Clear booking status and host details help creators and hosts work together with confidence.",
    Icon: FaHandshake,
  },
  {
    title: "Speed",
    text: "From finding a space to sending a booking takes only a few clicks, so ideas never have to wait.",
    Icon: FaBolt,
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

      {/* Mission + what we do */}
      <section className="bg-base-200 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-2">
          <div className="rounded-2xl border border-base-300 bg-base-100 p-8">
            <h2 className="text-2xl font-semibold">Our Mission</h2>
            <p className="mt-4 leading-relaxed opacity-80">
              Great work needs the right room. Our mission is to connect
              creators with inspiring studios, so a missing space is never the
              reason a project stops.
            </p>
          </div>
          <div className="rounded-2xl border border-base-300 bg-base-100 p-8">
            <h2 className="text-2xl font-semibold">What We Do</h2>
            <p className="mt-4 leading-relaxed opacity-80">
              We list photo studios, film stages, podcast lounges, music suites
              and workshops, and let creators book them by the hour with clear
              pricing and booking status.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">What We Stand For</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {values.map(({ title, text, Icon }) => (
            <div
              key={title}
              className="flex h-full flex-col items-center rounded-2xl border border-base-300 bg-base-100 p-8 text-center transition duration-300 hover:-translate-y-1.5 hover:border-primary/60 hover:shadow-xl"
            >
              <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-3xl text-primary">
                <Icon />
              </span>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm opacity-70">{text}</p>
            </div>
          ))}
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