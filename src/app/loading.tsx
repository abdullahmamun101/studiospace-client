import { TbAperture } from "react-icons/tb";

export default function Loading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
      <TbAperture className="animate-spin text-6xl text-primary" />
      <p className="text-lg font-semibold">
        Studio<span className="text-primary">Space</span>
      </p>
      <p className="text-sm opacity-60">Setting up the lights...</p>
    </div>
  );
}