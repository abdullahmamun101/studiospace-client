export default function StudioDetailsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      {/* Title skeleton */}
      <div className="mb-8 space-y-3">
        <div className="skeleton h-6 w-28" />
        <div className="skeleton h-10 w-2/3" />
        <div className="skeleton h-4 w-1/3" />
      </div>

      <div className="grid gap-10 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-10 lg:col-span-2">
          <div className="skeleton h-72 w-full rounded-2xl md:h-[26rem]" />

          <div className="space-y-3">
            <div className="skeleton h-7 w-48" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-3/4" />
          </div>

          <div className="space-y-3">
            <div className="skeleton h-7 w-40" />
            <div className="grid gap-3 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="skeleton h-12 w-full rounded-xl" />
              ))}
            </div>
          </div>
        </div>

        {/* Right column: price card */}
        <div className="lg:col-span-1">
          <div className="skeleton h-96 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}