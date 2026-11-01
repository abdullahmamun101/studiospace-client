import type { Metadata } from "next";
import Link from "next/link";
import HowItWorks from "@/components/home/HowItWorks";

export const metadata: Metadata = {
  title: "How It Works | StudioSpace",
  description: "Learn how to book a studio or host your own space on StudioSpace.",
};

const hostSteps = [
  {
    number: "01",
    title: "List your space",
    text: "Add your studio with photos, amenities, hourly rate and security deposit.",
    rotation: "md:-rotate-6 md:translate-y-8",
  },
  {
    number: "02",
    title: "Receive booking requests",
    text: "Creators pick a date and time, and each request reaches you as a pending booking.",
    rotation: "md:rotate-0 md:-translate-y-4",
  },
  {
    number: "03",
    title: "Manage your listings",
    text: "Update details or remove a listing any time from your My Studio Listings page.",
    rotation: "md:rotate-6 md:translate-y-8",
  },
];

const faqs = [
  {
    q: "How do I book a studio?",
    a: "Open any studio, press Book Workspace Now, choose a date with start and end time, and confirm. You need to be logged in to book.",
  },
  {
    q: "What does Pending mean on my booking?",
    a: "A new booking starts as Pending. You can follow its status on the My Bookings page and cancel it while it is still pending.",
  },
  {
    q: "What is the security deposit?",
    a: "Each studio sets a refundable-style deposit that protects its equipment. The amount is shown before you book.",
  },
  {
    q: "Can two people book the same time slot?",
    a: "No. If a slot is already confirmed for a studio, a new request for an overlapping time is rejected with a clear message.",
  },
  {
    q: "How do I list my own studio?",
    a: "Log in, open Add New Studio from your profile menu, fill in the details and submit. It appears on Explore Studios right away.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* Page heading */}
      <section className="mx-auto max-w-7xl px-4 pt-16 text-center">
        <h1 className="text-3xl font-bold md:text-5xl">How StudioSpace Works</h1>
        <p className="mx-auto mt-4 max-w-2xl opacity-70">
          Whether you are looking for a space to create in or a space to share,
          here is how it works from start to finish.
        </p>
      </section>

      <HowItWorks />

      {/* Host steps */}
      <section className="relative overflow-hidden bg-base-200 py-32">
        <div className="mx-auto max-w-7xl px-4 relative">
          
          <div className="mb-20 text-center">
            
            <h2 className="text-3xl font-bold md:text-5xl">
              Share Your Space in 3 Steps
            </h2>
            <p className="mt-3 text-sm opacity-70 max-w-md mx-auto">
              Turn your unused creative space into steady income with full host protection.
            </p>
          </div>

          {/* Curved Dotted Connecting Line (Desktop Background SVG) */}
          <div className="pointer-events-none absolute inset-x-0 top-[60%] hidden md:block -translate-y-1/2 z-0 px-12">
            <svg className="w-full h-28 text-primary/40" viewBox="0 0 1000 150" fill="none">
              <path
                d="M 50 120 Q 500 -40 950 120"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray="8 8"
                fill="none"
              />
            </svg>
          </div>

          <div className="relative grid gap-10 md:grid-cols-3 md:gap-8 pt-6 z-10">
            {hostSteps.map((step) => (
              <div
                key={step.number}
                className={`relative flex flex-col justify-between rounded-3xl border border-white/20 bg-base-100/70 backdrop-blur-md p-8 shadow-2xl transition-all duration-300 hover:scale-[1.04] hover:shadow-3xl ${step.rotation}`}
              >
                <div>
                  {/* Top Step Number */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-base font-bold text-primary shadow-sm">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold tracking-tight">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed opacity-70">{step.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 text-center z-10 relative">
            <Link href="/add-studio" className="btn btn-primary btn-lg shadow-xl px-8">
              Add New Studio
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ (Redesigned matching reference split layout) */}
      <section className="mx-auto max-w-7xl px-4 py-28">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          {/* Left Column: Heading & "Still have questions?" Card */}
          <div className="lg:col-span-5 space-y-8">
            <div>
             
              <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl leading-tight">
                Frequently asked questions
              </h2>
            </div>

            {/* Still have questions Card */}
            <div className="rounded-3xl border border-base-300 bg-base-200/50 backdrop-blur-xl p-8 shadow-2xl">
              <h3 className="text-xl font-bold mb-3">Still have a question?</h3>
              <p className="text-sm opacity-75 mb-6 leading-relaxed">
                Can&apos;t find the answer to your question? Send us an email and we&apos;ll get back to you as soon as possible!
              </p>
              <Link
                href="mailto:support@studiospace.com"
                className="btn btn-primary shadow-lg rounded-2xl px-6"
              >
                Send email
              </Link>
            </div>
          </div>

          {/* Right Column: FAQ Accordion List */}
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((item, i) => (
              <div
                key={item.q}
                className="collapse collapse-arrow rounded-2xl border border-base-300 bg-base-100 shadow-xl transition-all duration-300 hover:border-primary/50"
              >
                <input type="radio" name="faq" defaultChecked={i === 0} />
                <div className="collapse-title text-lg font-semibold pr-12">
                  {item.q}
                </div>
                <div className="collapse-content text-sm opacity-80 leading-relaxed">
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}