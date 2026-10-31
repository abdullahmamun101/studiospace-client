import Link from "next/link";
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

export default function HostGuarantee() {
  return (
    <section className="bg-base-200 py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2">
        {/* Left: heading */}
        <div>
         
          <h2 className="text-3xl font-bold md:text-4xl">
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

        {/* Right: 2x2 cards */}
        <div className="grid gap-5 sm:grid-cols-2">
          {guarantees.map(({ title, text, Icon }) => (
            <div
              key={title}
              className="flex h-full flex-col rounded-2xl border border-base-300 bg-base-100 p-6 transition duration-300 hover:-translate-y-1.5 hover:border-primary/60 hover:shadow-xl"
            >
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-xl text-primary">
                <Icon />
              </span>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm opacity-70">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}