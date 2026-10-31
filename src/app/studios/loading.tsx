import StudioCardSkeleton from "@/components/StudioCardSkeleton";

export default function StudiosLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      {/* Heading skeleton */}
      <div className="mb-10 flex flex-col items-center gap-3">
        <div className="skeleton h-10 w-64" />
        <div className="skeleton h-4 w-80 max-w-full" />
      </div>

      {/* Filter bar skeleton */}
      <div className="skeleton mb-10 h-20 w-full rounded-2xl" />

      {/* Cards skeleton */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <StudioCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}