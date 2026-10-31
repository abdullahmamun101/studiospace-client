import Link from "next/link";
import StudioCard, { type Studio } from "@/components/StudioCard";

async function getFeaturedStudios(): Promise<Studio[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/studios?limit=6&sort=rating`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function FeaturedStudios() {
  const studios = await getFeaturedStudios();

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="mb-12 text-center">
    
        <h2 className="text-3xl font-bold md:text-4xl">Featured Studios</h2>
        <p className="mx-auto mt-3 max-w-xl opacity-70">
          Hand-picked spaces that creators love to book again and again.
        </p>
      </div>

      {studios.length === 0 ? (
        <div className="rounded-2xl border border-base-300 bg-base-200 py-14 text-center">
          <p className="mb-5 opacity-70">No studios listed yet.</p>
          <Link href="/add-studio" className="btn btn-primary">
            Host Your Space
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {studios.map((studio) => (
            <StudioCard key={studio._id} studio={studio} />
          ))}
        </div>
      )}

      {studios.length > 0 && (
        <div className="mt-12 text-center">
          <Link href="/studios" className="btn btn-outline btn-lg">
            View All Studios
          </Link>
        </div>
      )}
    </section>
  );
}