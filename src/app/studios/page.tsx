import Link from "next/link";
import StudioCard, { type Studio } from "@/components/StudioCard";


const categories = [
  { value: "Photo Studio", label: "Photo Studios" },
  { value: "Film Stage", label: "Sound Stages" },
  { value: "Podcast Lounge", label: "Podcast Rooms" },
  { value: "Music Suite", label: "Music Suites" },
  { value: "Workshop", label: "Art Workshops" },
];

async function getStudios(category?: string, search?: string): Promise<Studio[]> {
  try {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (search) params.set("search", search);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/studios?${params.toString()}`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function StudiosPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const { category, search } = await searchParams;
  const studios = await getStudios(category, search);
  const hasFilter = Boolean(category || search);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      {/* Heading */}
      <div className="mb-10 text-center">
    
        <h1 className="text-3xl font-bold md:text-5xl">Explore Studios</h1>
        <p className="mx-auto mt-3 max-w-xl opacity-70">
          Find the right space for your next shoot, recording or workshop.
        </p>
      </div>

      {/* Search and filter (GET form, URL bodlay) */}
      <form
        action="/studios"
        method="GET"
        className="mb-10 flex flex-col gap-3 rounded-2xl border border-base-300 bg-base-200 p-4 md:flex-row"
      >
        <input
          type="text"
          name="search"
          defaultValue={search ?? ""}
          placeholder="Search studios by name"
          className="input input-bordered w-full md:flex-1"
        />
        <select
          name="category"
          defaultValue={category ?? ""}
          className="select select-bordered w-full md:w-60"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
        <button type="submit" className="btn btn-primary md:px-8">
          Search
        </button>
        {hasFilter && (
          <Link href="/studios" className="btn btn-ghost">
            Reset
          </Link>
        )}
      </form>

      {/* Result count */}
      <p className="mb-6 text-sm opacity-70">
        {studios.length} {studios.length === 1 ? "studio" : "studios"} found
      </p>

      {/* Grid or empty state */}
      {studios.length === 0 ? (
        <div className="rounded-2xl border border-base-300 bg-base-200 py-16 text-center">
          <h2 className="text-xl font-semibold">No studios found</h2>
          <p className="mx-auto mb-6 mt-2 max-w-md opacity-70">
            {hasFilter
              ? "Nothing matches your search. Try a different name or category."
              : "No studios have been listed yet. Be the first to host one."}
          </p>
          {hasFilter ? (
            <Link href="/studios" className="btn btn-primary">
              Clear Filters
            </Link>
          ) : (
            <Link href="/add-studio" className="btn btn-primary">
              Host Your Space
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {studios.map((studio) => (
            <StudioCard key={studio._id} studio={studio} />
          ))}
        </div>
      )}
    </div>
  );
}