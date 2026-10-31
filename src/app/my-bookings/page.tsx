"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaCalendarDays, FaClock } from "react-icons/fa6";
import PrivateRoute from "@/components/PrivateRoute";
import { authClient } from "@/lib/auth-client";

type Booking = {
  _id: string;
  studioId: string;
  studioTitle: string;
  studioImage?: string;
  date: string;
  startTime: string;
  endTime: string;
  hours?: number;
  totalPrice?: number;
  securityDeposit?: number;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
};

const statusStyle: Record<Booking["status"], string> = {
  Pending: "badge-warning",
  Confirmed: "badge-success",
  Completed: "badge-info",
  Cancelled: "badge-error",
};

function MyBookings() {
  const { data: session } = authClient.useSession();
  const email = session?.user?.email;

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [toCancel, setToCancel] = useState<Booking | null>(null);
  const [cancelling, setCancelling] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!email) return;

    const load = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/my-bookings?email=${encodeURIComponent(email)}`
        );
        if (!res.ok) throw new Error("Failed to load");
        setBookings(await res.json());
      } catch {
        toast.error("Could not load your bookings");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [email]);

  const openCancelModal = (booking: Booking) => {
    setToCancel(booking);
    dialogRef.current?.showModal();
  };

  const closeCancelModal = () => {
    dialogRef.current?.close();
    setToCancel(null);
  };

  const confirmCancel = async () => {
    if (!toCancel) return;

    setCancelling(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings/${toCancel._id}/cancel`,
        { method: "PATCH" }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        toast.error(data?.message || "Failed to cancel booking");
        return;
      }

      setBookings((prev) =>
        prev.map((b) =>
          b._id === toCancel._id ? { ...b, status: "Cancelled" } : b
        )
      );
      toast.success("Booking cancelled");
      closeCancelModal();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setCancelling(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      {/* Heading */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold md:text-4xl">My Bookings</h1>
        <p className="mx-auto mt-3 max-w-xl opacity-70">
          Track your studio reservations and their status.
        </p>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      ) : bookings.length === 0 ? (
        <div className="rounded-2xl border border-base-300 bg-base-200 py-16 text-center">
          <h2 className="text-xl font-semibold">No bookings yet</h2>
          <p className="mx-auto mb-6 mt-2 max-w-md opacity-70">
            You have not booked any studio. Find a space for your next project.
          </p>
          <Link href="/studios" className="btn btn-primary">
            Explore Studios
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="flex flex-col overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm sm:flex-row"
            >
              {/* Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  booking.studioImage ||
                  "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=600&q=80"
                }
                alt={booking.studioTitle}
                className="h-48 w-full object-cover sm:h-auto sm:w-56"
              />

              {/* Details */}
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <Link
                    href={`/studios/${booking.studioId}`}
                    className="text-xl font-semibold hover:text-primary"
                  >
                    {booking.studioTitle}
                  </Link>
                  <span
                    className={`badge px-3 py-3 font-medium ${statusStyle[booking.status]}`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm opacity-80">
                  <span className="flex items-center gap-2">
                    <FaCalendarDays className="text-primary" />
                    {booking.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <FaClock className="text-primary" />
                    {booking.startTime} - {booking.endTime}
                    {booking.hours ? ` (${booking.hours} hr)` : ""}
                  </span>
                </div>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
                  <p className="text-lg font-bold text-primary">
                    {booking.totalPrice !== undefined
                      ? `$${booking.totalPrice}`
                      : "-"}
                    {booking.securityDeposit !== undefined && (
                      <span className="ml-2 text-xs font-normal opacity-70">
                        + ${booking.securityDeposit} deposit
                      </span>
                    )}
                  </p>

                  {booking.status === "Pending" && (
                    <button
                      type="button"
                      onClick={() => openCancelModal(booking)}
                      className="btn btn-sm btn-error btn-outline"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cancel confirmation modal */}
      <dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="text-xl font-bold">Cancel this booking?</h3>
          <p className="mt-3 opacity-80">
            You are about to cancel your booking for{" "}
            <span className="font-semibold">{toCancel?.studioTitle}</span> on{" "}
            {toCancel?.date}. This cannot be undone.
          </p>
          <div className="modal-action">
            <button
              type="button"
              onClick={closeCancelModal}
              className="btn btn-ghost"
              disabled={cancelling}
            >
              Keep Booking
            </button>
            <button
              type="button"
              onClick={confirmCancel}
              className="btn btn-error"
              disabled={cancelling}
            >
              {cancelling ? "Cancelling..." : "Yes, Cancel"}
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setToCancel(null)}>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default function MyBookingsPage() {
  return (
    <PrivateRoute>
      <MyBookings />
    </PrivateRoute>
  );
}