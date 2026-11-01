import { notFound } from "next/navigation";
import {
  FaStar,
  FaLocationDot,
  FaUsers,
  FaShieldHalved,
  FaCheck,
} from "react-icons/fa6";
import StudioGallery from "@/components/StudioGallery";
import BookingModal from "@/components/BookingModal";

type Review = {
  name: string;
  rating: number;
  comment: string;
  date: string;
};

type StudioDetails = {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  location: string;
  image: string;
  gallery?: string[];
  amenities?: string[];
  overview: string;
  rating?: number;
  reviews?: Review[];
  ownerName: string;
  ownerEmail: string;
};

async function getStudio(id: string): Promise<StudioDetails | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function Stars({ value }: { value: number }) {
  return (
    <span className="flex gap-0.5 text-primary">
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar key={i} className={i < value ? "" : "opacity-25"} />
      ))}
    </span>
  );
}

export default async function StudioDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const studio = await getStudio(id);

  if (!studio) notFound();

  const images =
    studio.gallery && studio.gallery.length > 0
      ? studio.gallery
      : [studio.image];
  const reviews = studio.reviews ?? [];
  const amenities = studio.amenities ?? [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      {/* Title row */}
      <div className="mb-8">
        <span className="badge badge-primary mb-3 px-3 py-3 font-medium">
          {studio.category}
        </span>
        <h1 className="text-3xl font-bold md:text-4xl">{studio.title}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm opacity-80">
          <span className="flex items-center gap-2">
            <FaLocationDot className="text-primary" />
            {studio.location}
          </span>
          <span className="flex items-center gap-2">
            <FaStar className="text-primary" />
            {(studio.rating ?? 0).toFixed(1)} ({reviews.length}{" "}
            {reviews.length === 1 ? "review" : "reviews"})
          </span>
        </div>
      </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Left column */}
        <div className="min-w-0 space-y-10 lg:col-span-2">
          <StudioGallery images={images} title={studio.title} />

          {/* Overview */}
          <section>
            <h2 className="mb-3 text-2xl font-semibold">About this space</h2>
            <p className="leading-relaxed opacity-80">{studio.overview}</p>
          </section>

          {/* Amenities */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold">Amenities</h2>
            {amenities.length === 0 ? (
              <p className="opacity-70">No amenities listed.</p>
            ) : (
              <ul className="grid gap-3 sm:grid-cols-2">
                {amenities.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-base-300 bg-base-100 px-4 py-3"
                  >
                    <FaCheck className="text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Reviews */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              Reviews ({reviews.length})
            </h2>
            {reviews.length === 0 ? (
              <div className="rounded-2xl border border-base-300 bg-base-200 p-8 text-center opacity-80">
                No reviews yet for this studio.
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((review, i) => (
                  <div
                    key={`${review.name}-${i}`}
                    className="rounded-2xl border border-base-300 bg-base-100 p-5"
                  >
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 font-semibold text-primary">
                          {review.name.charAt(0)}
                        </span>
                        <div>
                          <p className="font-semibold">{review.name}</p>
                          <p className="text-xs opacity-60">{review.date}</p>
                        </div>
                      </div>
                      <Stars value={review.rating} />
                    </div>
                    <p className="text-sm opacity-80">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Right column: booking card */}
            <aside className="min-w-0 lg:col-span-1">
          <div className="sticky top-24 space-y-5 rounded-2xl border border-base-300 bg-base-100 p-6 shadow-lg">
            <p className="text-3xl font-bold text-primary">
              ${studio.hourlyRate}
              <span className="text-base font-normal opacity-70"> / hr</span>
            </p>

            <ul className="space-y-3 text-sm">
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-2 opacity-70">
                  <FaShieldHalved className="text-primary" />
                  Security deposit
                </span>
                <span className="font-semibold">${studio.securityDeposit}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-2 opacity-70">
                  <FaUsers className="text-primary" />
                  Max capacity
                </span>
                <span className="font-semibold">{studio.maxCapacity} people</span>
              </li>
            </ul>

            <BookingModal
              studio={{
                _id: studio._id,
                title: studio.title,
                image: studio.image,
                hourlyRate: studio.hourlyRate,
                securityDeposit: studio.securityDeposit,
              }}
            />

            {/* Host details */}
            <div className="border-t border-base-300 pt-5">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide opacity-60">
                Hosted by
              </p>
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-lg font-semibold text-primary">
                  {studio.ownerName.charAt(0)}
                </span>
                <div className="min-w-0">
                  <p className="font-semibold">{studio.ownerName}</p>
                  <p className="truncate text-sm opacity-70">
                    {studio.ownerEmail}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}