import {
  FaMagnifyingGlass,
  FaClock,
  FaCircleCheck,
  FaClapperboard,
} from "react-icons/fa6";

const steps = [
  {
    number: "01",
    title: "Discover Spaces",
    text: "Browse photo studios, stages, podcast rooms and music suites, and filter by category or location.",
    Icon: FaMagnifyingGlass,
  },
  {
    number: "02",
    title: "Select Shoot Hours",
    text: "Pick your date and start and end time, with the hourly price and deposit shown upfront.",
    Icon: FaClock,
  },
  {
    number: "03",
    title: "Book Instantly",
    text: "Send your booking in a few clicks and track its status from your My Bookings page.",
    Icon: FaCircleCheck,
  },
  {
    number: "04",
    title: "Create & Produce",
    text: "Walk in, set up and focus on making great work while the space is ready for you.",
    Icon: FaClapperboard,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
         
          <h2 className="text-3xl font-bold md:text-4xl">
            How Booking Works
          </h2>
          <p className="mx-auto mt-3 max-w-xl opacity-70">
            From finding a space to hitting record, in four easy steps.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ number, title, text, Icon }) => (
            <div
              key={number}
              className="relative flex h-full flex-col rounded-2xl border border-base-300 bg-base-100 p-7 transition duration-300 hover:-translate-y-1.5 hover:border-primary/60 hover:shadow-xl"
            >
              <span className="absolute right-5 top-4 text-5xl font-bold text-primary/15">
                {number}
              </span>
              <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-2xl text-primary">
                <Icon />
              </span>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm opacity-70">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}