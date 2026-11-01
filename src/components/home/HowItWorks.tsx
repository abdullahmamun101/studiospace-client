const steps = [
  {
    number: "1",
    title: "Discover Spaces",
    points: [
      "Browse photo, film, podcast and music studios",
      "Filter by category or search by name",
      "Compare rate, deposit and capacity",
      "Read reviews from other creators",
    ],
  },
  {
    number: "2",
    title: "Select Shoot Hours",
    points: [
      "Pick your date",
      "Choose a start and end time",
      "See the hourly price and deposit upfront",
    ],
  },
  {
    number: "3",
    title: "Book Instantly",
    points: [
      "Send your request in a few clicks",
      "Track it as Pending or Confirmed",
      "Cancel while it is still pending",
    ],
  },
  {
    number: "4",
    title: "Create & Produce",
    points: [
      "Walk in to a ready space",
      "Use the amenities listed on the studio",
      "Focus on your shoot, recording or class",
    ],
  },
];


const slots = [
  { left: "3%", width: "25%", bottom: "67%" },
  { left: "22%", width: "22%", top: "65.5%" },
  { left: "46%", width: "24%", bottom: "56%" },
  { left: "77%", width: "21%", bottom: "28.5%" },
] as const;


const markers = [
  { x: 140, y: 223.2 },
  { x: 342, y: 327.4 },
  { x: 543, y: 284.1 },
  { x: 733, y: 403.5 },
];


const labels = [
  { text: "Discover Spaces", offset: "16.5%" },
  { text: "Select Shoot Hours", offset: "39.1%" },
  { text: "Book Instantly", offset: "61.1%" },
  { text: "Create & Produce", offset: "82.9%" },
];


const BAND = "M-900 668.1 L-41.2 320.7 A724 724 0 0 1 880 673.1";
const OUTER = "M-856 596.5 L-59.9 274.4 A774 774 0 0 1 924.9 651.1";
const INNER = "M-818.6 689.2 L-22.5 367.1 A674 674 0 0 1 835.1 695.1";

const LABEL_PATH = "M-41.2 320.7 A724 724 0 0 1 850 618.1";

export default function HowItWorks() {
  return (
    <section className="relative isolate overflow-hidden bg-base-100 py-24">
      
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <svg
          viewBox="0 0 1000 560"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          className="h-full w-full text-base-content"
        >
          <defs>
            <linearGradient id="how-silver" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="currentColor" stopOpacity="0" />
              <stop offset="0.45" stopColor="currentColor" stopOpacity="0.035" />
              <stop offset="1" stopColor="currentColor" stopOpacity="0.01" />
            </linearGradient>
            <linearGradient id="how-silver-2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="currentColor" stopOpacity="0.03" />
              <stop offset="1" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* S-swoosh */}
          <path
            d="M-120 470 C140 330 300 520 480 450 S800 250 1120 350"
            stroke="url(#how-silver)"
            strokeWidth="110"
            strokeLinecap="round"
          />
          <path
            d="M240 -30 C420 90 560 20 700 80 S960 60 1120 -10"
            stroke="url(#how-silver-2)"
            strokeWidth="70"
            strokeLinecap="round"
          />

          {/* Bottom-left ring */}
          <circle cx="60" cy="620" r="250" stroke="currentColor" strokeOpacity="0.045" strokeWidth="2" />
          <circle cx="60" cy="620" r="340" stroke="currentColor" strokeOpacity="0.035" strokeWidth="2" />
          <circle cx="60" cy="620" r="430" stroke="currentColor" strokeOpacity="0.025" strokeWidth="2" />

          {/* Top-right ring */}
          <circle cx="990" cy="-20" r="170" stroke="currentColor" strokeOpacity="0.04" strokeWidth="2" />
          <circle cx="990" cy="-20" r="250" stroke="currentColor" strokeOpacity="0.03" strokeWidth="2" />
          <circle cx="990" cy="-20" r="330" stroke="currentColor" strokeOpacity="0.02" strokeWidth="2" />
        </svg>

        
        <span className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <span className="absolute -left-24 bottom-10 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-[1500px] px-4">
        <div className="mb-16 text-center">
          
          <h2 className="text-3xl font-bold md:text-5xl">How Booking Works</h2>
          <p className="mx-auto mt-4 max-w-xl opacity-70">
            From finding a space to hitting record, in four easy steps.
          </p>
        </div>

       
        <div className="relative mx-auto hidden aspect-[1000/560] max-w-[1400px] lg:block">
          <svg
            aria-hidden
            viewBox="0 0 1000 560"
            fill="none"
            className="absolute inset-0 h-full w-full overflow-visible"
          >
            <defs>
             
              <path id="how-arch" d={LABEL_PATH} />
              <filter id="how-shadow" x="-10%" y="-60%" width="120%" height="220%">
                <feGaussianBlur stdDeviation="14" />
              </filter>
            </defs>

            
            <path
              d={BAND}
              stroke="#000"
              strokeOpacity="0.25"
              strokeWidth="100"
              transform="translate(0 18)"
              filter="url(#how-shadow)"
            />

            
            <path d={BAND} className="stroke-neutral" strokeWidth="100" />

           
            <path d={OUTER} className="stroke-primary/50" strokeWidth="2" />
            <path d={INNER} className="stroke-base-100/15" strokeWidth="2" />

            
            <line x1="244" y1="318.2" x2="246.1" y2="218.2" className="stroke-base-100/30" strokeWidth="2" />
            <line x1="438.5" y1="351" x2="469.4" y2="255.9" className="stroke-base-100/30" strokeWidth="2" />
            <line x1="633.7" y1="452.3" x2="693.6" y2="372.3" className="stroke-base-100/30" strokeWidth="2" />

            
            {labels.map((label) => (
              <text
                key={label.text}
                dy="7"
                fontSize="18"
                textAnchor="middle"
                className="fill-neutral-content font-semibold"
              >
                <textPath href="#how-arch" startOffset={label.offset}>
                  {label.text}
                </textPath>
              </text>
            ))}

            {/* Number circle */}
            {markers.map((m, i) => (
              <g key={m.x}>
                <circle cx={m.x} cy={m.y} r="30" className="fill-primary/25" />
                <circle
                  cx={m.x}
                  cy={m.y}
                  r="23"
                  className="fill-primary stroke-base-100"
                  strokeWidth="4"
                />
                <text
                  x={m.x}
                  y={m.y}
                  dy="7"
                  fontSize="21"
                  textAnchor="middle"
                  className="fill-primary-content font-bold"
                >
                  {steps[i].number}
                </text>
              </g>
            ))}
          </svg>

          
          {steps.map((step, i) => (
            <div
              key={step.title}
              style={slots[i]}
              className="absolute rounded-xl border border-base-300 bg-base-200/90 p-3 text-xs shadow-lg backdrop-blur xl:p-4 xl:text-sm 2xl:p-5 2xl:text-base"
            >
              <h3 className="sr-only">{step.title}</h3>
              <ul className="list-disc space-y-1 pl-4 marker:text-primary 2xl:space-y-1.5 2xl:pl-5">
                {step.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        
        <ol className="relative mx-auto max-w-xl space-y-6 lg:hidden">
          <span
            aria-hidden
            className="absolute bottom-0 left-5 top-0 w-3 -translate-x-1/2 rounded-full bg-neutral"
          />
          {steps.map((step) => (
            <li key={step.title} className="relative pl-14">
              <span className="absolute left-5 top-5 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-primary font-bold text-primary-content ring-4 ring-base-100">
                {step.number}
              </span>
              <div className="rounded-2xl border border-base-300 bg-base-200/90 p-5 shadow-md">
                <h3 className="mb-3 text-lg font-semibold">{step.title}</h3>
                <ul className="list-disc space-y-1 pl-4 text-sm marker:text-primary">
                  {step.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}