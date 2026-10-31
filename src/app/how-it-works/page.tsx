import type { Metadata } from "next";
import Link from "next/link";
import HowItWorks from "@/components/home/HowItWorks";

export const metadata: Metadata = {
  title: "How It Works | StudioSpace",
  description: "Learn how to book a studio or host your own space on StudioSpace.",
};

const hostSteps = [
  {
    number: "1",
    title: "List your space",
    text: "Add your studio with photos, amenities, hourly rate and security deposit.",
  },
  {
    number: "2",
    title: "Receive booking requests",
    text: "Creators pick a date and time, and each request reaches you as a pending booking.",
  },
  {
    number: "3",
    title: "Manage your listings",
    text: "Update details or remove a listing any time from your My Studio Listings page.",
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
      <section className="bg-base-200 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
           
            <h2 className="text-3xl font-bold md:text-4xl">
              Share Your Space in 3 Steps
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {hostSteps.map((step) => (
              <div
                key={step.number}
                className="flex h-full flex-col rounded-2xl border border-base-300 bg-base-100 p-7 transition duration-300 hover:-translate-y-1.5 hover:border-primary/60 hover:shadow-xl"
              >
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-content">
                  {step.number}
                </span>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm opacity-70">{step.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/add-studio" className="btn btn-primary btn-lg">
              Add New Studio
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-20">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((item, i) => (
            <div
              key={item.q}
              className="collapse collapse-arrow rounded-2xl border border-base-300 bg-base-100"
            >
              <input type="radio" name="faq" defaultChecked={i === 0} />
              <div className="collapse-title text-lg font-semibold">
                {item.q}
              </div>
              <div className="collapse-content text-sm opacity-80">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}