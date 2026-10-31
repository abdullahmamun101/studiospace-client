"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  FaBuilding,
  FaCalendarCheck,
  FaHourglassHalf,
  FaCircleCheck,
  FaPlus,
  FaListUl,
  FaMagnifyingGlass,
} from "react-icons/fa6";
import PrivateRoute from "@/components/PrivateRoute";
import { authClient } from "@/lib/auth-client";

type Booking = {
  _id: string;
  studioId: string;
  studioTitle: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
};

const statusStyle: Record<Booking["status"], string> = {
  Pending: "badge-warning",
  Confirmed: "badge-success",
  Completed: "badge-info",
  Cancelled: "badge-error",
};

function DashboardContent() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const email = user?.email;

  const [listingCount, setListingCount] = useState(0);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) return;

    const load = async () => {
      try {
        const api = process.env.NEXT_PUBLIC_API_URL;
        const [studiosRes, bookingsRes] = await Promise.all([
          fetch(`${api}/my-studios?email=${encodeURIComponent(email)}`),
          fetch(`${api}/my-bookings?email=${encodeURIComponent(email)}`),
        ]);

        if (!studiosRes.ok || !bookingsRes.ok) throw new Error("Failed");

        const studios = await studiosRes.json();
        setListingCount(studios.length);
        setBookings(await bookingsRes.json());
      } catch {
        toast.error("Could not load your dashboard data");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [email]);

  const pending = bookings.filter((b) => b.status === "Pending").length;
  const confirmed = bookings.filter((b) => b.status === "Confirmed").length;
  const recent = bookings.slice(0, 3);

  const stats = [
    { label: "My Listings", value: listingCount, Icon: FaBuilding },
    { label: "Total Bookings", value: bookings.length, Icon: FaCalendarCheck },
    { label: "Pending", value: pending, Icon: FaHourglassHalf },
    { label: "Confirmed", value: confirmed, Icon: FaCircleCheck },
  ];

  const actions = [
    { href: "/add-studio", label: "Add New Studio", Icon: FaPlus },
    { href: "/my-listings", label: "My Studio Listings", Icon: FaListUl },
    { href: "/my-bookings", label: "My Bookings", Icon: FaCalendarCheck },
    { href: "/studios", label: "Explore Studios", Icon: FaMagnifyingGlass },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      {/* Welcome */}
      <div className="mb-10 flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        <div className="avatar">
          <div className="w-16 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user?.image || "https://i.ibb.co/2kR7xwL/avatar.png"}
              alt={user?.name ?? "User"}
            />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold md:text-4xl">
            Welcome back, {user?.name?.split(" ")[0]}
          </h1>
          <p className="mt-1 opacity-70">{user?.email}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(({ label, value, Icon }) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded-2xl border border-base-300 bg-base-100 p-5"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl text-primary">
              <Icon />
            </span>
            <div>
              {loading ? (
                <div className="skeleton mb-1 h-7 w-10" />
              ) : (
                <p className="text-3xl font-bold">{value}</p>
              )}
              <p className="text-sm opacity-70">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center gap-3 rounded-2xl border border-base-300 bg-base-100 p-5 font-medium transition duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-content">
                <Icon />
              </span>
              {label}
            </Link>
          ))}
        </div>
      </section>

      {/* Recent bookings */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Recent Bookings</h2>
          {bookings.length > 0 && (
            <Link href="/my-bookings" className="link link-primary text-sm">
              View all
            </Link>
          )}
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="skeleton h-20 w-full rounded-2xl" />
            ))}
          </div>
        ) : recent.length === 0 ? (
          <div className="rounded-2xl border border-base-300 bg-base-200 py-12 text-center">
            <h3 className="text-xl font-semibold">No bookings yet</h3>
            <p className="mx-auto mb-6 mt-2 max-w-md opacity-70">
              Your latest bookings will show up here once you reserve a studio.
            </p>
            <Link href="/studios" className="btn btn-primary">
              Explore Studios
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recent.map((booking) => (
              <div
                key={booking._id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-base-300 bg-base-100 p-5"
              >
                <div>
                  <Link
                    href={`/studios/${booking.studioId}`}
                    className="font-semibold hover:text-primary"
                  >
                    {booking.studioTitle}
                  </Link>
                  <p className="mt-1 text-sm opacity-70">
                    {booking.date} | {booking.startTime} - {booking.endTime}
                  </p>
                </div>
                <span
                  className={`badge px-3 py-3 font-medium ${statusStyle[booking.status]}`}
                >
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <PrivateRoute>
      <DashboardContent />
    </PrivateRoute>
  );
}