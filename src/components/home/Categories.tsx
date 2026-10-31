import Link from "next/link";
import {
  FaCamera,
  FaFilm,
  FaMicrophoneLines,
  FaMusic,
  FaPaintbrush,
} from "react-icons/fa6";


const categories = [
  {
    label: "Photo Studios",
    value: "Photo Studio",
    text: "Cyc walls, lights and backdrops",
    Icon: FaCamera,
  },
  {
    label: "Sound Stages",
    value: "Film Stage",
    text: "Large stages for film and video",
    Icon: FaFilm,
  },
  {
    label: "Podcast Rooms",
    value: "Podcast Lounge",
    text: "Treated rooms with pro mics",
    Icon: FaMicrophoneLines,
  },
  {
    label: "Music Suites",
    value: "Music Suite",
    text: "Booths for recording and mixing",
    Icon: FaMusic,
  },
  {
    label: "Art Workshops",
    value: "Workshop",
    text: "Open spaces for classes and art",
    Icon: FaPaintbrush,
  },
];

export default function Categories() {
  return (
    <section className="bg-base-200 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
    
          <h2 className="text-3xl font-bold md:text-4xl">
            Browse by Studio Category
          </h2>
          <p className="mx-auto mt-3 max-w-xl opacity-70">
            Pick the kind of space your next project needs.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {categories.map(({ label, value, text, Icon }) => (
            <Link
              key={value}
              href={`/studios?category=${encodeURIComponent(value)}`}
              className="group flex h-full flex-col items-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center transition duration-300 hover:-translate-y-1.5 hover:border-primary/60 hover:shadow-xl"
            >
              <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-3xl text-primary transition group-hover:bg-primary group-hover:text-primary-content">
                <Icon />
              </span>
              <h3 className="text-lg font-semibold">{label}</h3>
              <p className="mt-2 text-sm opacity-70">{text}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}