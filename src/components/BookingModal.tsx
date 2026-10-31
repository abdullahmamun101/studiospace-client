"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

type Props = {
  studio: {
    _id: string;
    title: string;
    image: string;
    hourlyRate: number;
    securityDeposit: number;
  };
};

const toMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

export default function BookingModal({ studio }: Props) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  
  const validTimes = startTime && endTime && startTime < endTime;
  const hours = validTimes
    ? (toMinutes(endTime) - toMinutes(startTime)) / 60
    : 0;
  const total = hours * studio.hourlyRate;

  const openModal = () => {
    if (isPending) return;

    if (!user) {
      toast.error("Please login to book a studio");
      router.push(`/login?redirect=/studios/${studio._id}`);
      return;
    }
    dialogRef.current?.showModal();
  };

  const closeModal = () => dialogRef.current?.close();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) return;

    if (!validTimes) {
      toast.error("End time must be after start time");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/server/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studioId: studio._id,
          studioTitle: studio.title,
          studioImage: studio.image,
          hourlyRate: studio.hourlyRate,
          securityDeposit: studio.securityDeposit,
          userEmail: user.email,
          userName: user.name,
          date,
          startTime,
          endTime,
          hours,
          totalPrice: total,
        }),
      });

      
      if (res.status === 401) {
        toast.error("Session expired. Please login again.");
        return;
      }

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Booking failed");
        return;
      }

      toast.success("Booking request sent!");
      closeModal();
      setDate("");
      setStartTime("");
      setEndTime("");
      router.push("/my-bookings");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="btn btn-primary btn-lg w-full"
      >
        Book Workspace Now
      </button>

      <dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="text-xl font-bold">Book this studio</h3>
          <p className="mt-1 text-sm opacity-70">{studio.title}</p>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <label className="form-control w-full">
              <span className="mb-1 block text-sm font-medium">Date</span>
              <input
                type="date"
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="form-control w-full">
                <span className="mb-1 block text-sm font-medium">
                  Start time
                </span>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="input input-bordered w-full"
                  required
                />
              </label>
              <label className="form-control w-full">
                <span className="mb-1 block text-sm font-medium">
                  End time
                </span>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="input input-bordered w-full"
                  required
                />
              </label>
            </div>

            {/* Price summary */}
            <div className="space-y-2 rounded-xl border border-base-300 bg-base-200 p-4 text-sm">
              <div className="flex justify-between">
                <span className="opacity-70">Rate</span>
                <span>${studio.hourlyRate} / hr</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">Hours</span>
                <span>{hours > 0 ? hours : "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">Security deposit</span>
                <span>${studio.securityDeposit}</span>
              </div>
              <div className="flex justify-between border-t border-base-300 pt-2 text-base font-semibold">
                <span>Studio total</span>
                <span className="text-primary">
                  {hours > 0 ? `$${total}` : "-"}
                </span>
              </div>
            </div>

            <div className="modal-action">
              <button
                type="button"
                onClick={closeModal}
                className="btn btn-ghost"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Booking..." : "Confirm Booking"}
              </button>
            </div>
          </form>
        </div>

        
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}