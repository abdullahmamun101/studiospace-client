import Link from "next/link";
import { FaStar, FaLocationDot } from "react-icons/fa6";

export type Studio = {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  location: string;
  image: string;
  rating?: number;
};

export default function StudioCard({ studio }: { studio: Studio }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-xl">
      
      <div className="relative h-56 w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={studio.image}
          alt={studio.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

       
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base-100/70 via-transparent to-transparent" />

        {/* Category badge */}
        <span className="badge badge-primary absolute left-3 top-3 px-3 py-3 font-medium">
          {studio.category}
        </span>

        {/* Rating badge */}
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-base-100/90 px-3 py-1 text-sm font-semibold backdrop-blur">
          <FaStar className="text-primary" />
          {(studio.rating ?? 0).toFixed(1)}
        </span>
      </div>

      
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="line-clamp-1 text-lg font-semibold">{studio.title}</h3>

        <p className="flex items-center gap-2 text-sm opacity-70">
          <FaLocationDot className="shrink-0 text-primary" />
          <span className="line-clamp-1">{studio.location}</span>
        </p>

        <div className="mt-auto flex items-end justify-between pt-2">
          <p className="text-2xl font-bold text-primary">
            ${studio.hourlyRate}
            <span className="text-sm font-normal opacity-70"> / hr</span>
          </p>
        </div>

        <Link
          href={`/studios/${studio._id}`}
          className="btn btn-primary w-full"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}