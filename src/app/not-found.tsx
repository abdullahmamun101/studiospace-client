import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
      {/* Clapperboard illustration */}
      <svg
        viewBox="0 0 240 200"
        fill="none"
        className="h-48 w-48 md:h-60 md:w-60"
        aria-hidden="true"
      >
        {/* Board body */}
        <rect
          x="30"
          y="84"
          width="180"
          height="100"
          rx="10"
          strokeWidth="4"
          className="fill-base-200 stroke-primary"
        />

        {/* Clapper arm (tilted) */}
        <g transform="rotate(-12 30 84)">
          <rect
            x="30"
            y="54"
            width="180"
            height="28"
            rx="6"
            className="fill-primary"
          />
          <path d="M62 54 l-14 28 h20 l14 -28z" className="fill-base-100" />
          <path d="M102 54 l-14 28 h20 l14 -28z" className="fill-base-100" />
          <path d="M142 54 l-14 28 h20 l14 -28z" className="fill-base-100" />
          <path d="M182 54 l-14 28 h20 l14 -28z" className="fill-base-100" />
        </g>

        {/* Fixed top bar */}
        <rect
          x="30"
          y="84"
          width="180"
          height="14"
          rx="4"
          className="fill-primary"
        />

        {/* 404 text */}
        <text
          x="120"
          y="156"
          textAnchor="middle"
          fontSize="46"
          fontWeight="700"
          className="fill-primary"
        >
          404
        </text>
      </svg>

      <h1 className="mt-6 text-3xl font-bold md:text-4xl">
        Cut! This scene is missing
      </h1>
      <p className="mt-3 max-w-md opacity-70">
        The page you are looking for does not exist, or the studio has been
        moved. Let us get you back on set.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-primary btn-lg">
          Return to Home
        </Link>
        <Link href="/studios" className="btn btn-outline btn-lg">
          Explore Studios
        </Link>
      </div>
    </div>
  );
}