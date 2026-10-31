"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/PrivateRoute";

const categories = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop",
];

const baseAmenities = [
  "WiFi",
  "Air Conditioning",
  "Parking",
  "Changing Room",
  "Lighting Kit",
  "Backdrops",
  "Sound Proofing",
  "Microphones",
  "Green Screen",
  "Restroom",
  "Tea and Coffee",
  "Props",
];

type Studio = {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  location: string;
  image: string;
  amenities?: string[];
  overview: string;
  ownerName: string;
  ownerEmail: string;
};

function EditStudioForm() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [studio, setStudio] = useState<Studio | null>(null);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [saving, setSaving] = useState(false);

  
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/studios/${id}`
        );
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        const data: Studio = await res.json();
        setStudio(data);
        setAmenities(data.amenities ?? []);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const toggleAmenity = (item: string) => {
    setAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (amenities.length === 0) {
      toast.error("Please select at least one amenity");
      return;
    }

    const form = e.currentTarget;
    const value = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement).value;

    const updated = {
      title: value("title"),
      category: value("category"),
      hourlyRate: Number(value("hourlyRate")),
      securityDeposit: Number(value("securityDeposit")),
      maxCapacity: Number(value("maxCapacity")),
      location: value("location"),
      image: value("image"),
      amenities,
      overview: value("overview"),
    };

    setSaving(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/studios/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        toast.error(data?.message || "Failed to update studio");
        return;
      }

      toast.success("Studio updated successfully!");
      router.push("/my-listings");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (notFound || !studio) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Studio not found</h1>
        <p className="mb-6 mt-2 opacity-70">
          This studio does not exist or has been removed.
        </p>
        <Link href="/my-listings" className="btn btn-primary">
          Back to My Listings
        </Link>
      </div>
    );
  }

  
  const amenityOptions = Array.from(
    new Set([...baseAmenities, ...(studio.amenities ?? [])])
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold md:text-4xl">Update Studio</h1>
        <p className="mx-auto mt-3 max-w-xl opacity-70">
          Edit the details of your listing.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-base-300 bg-base-100 p-6 shadow-lg md:p-8"
      >
        {/* Title */}
        <div>
          <label className="mb-1 block text-sm font-medium">Studio title</label>
          <input
            name="title"
            type="text"
            defaultValue={studio.title}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Category + Location */}
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Category</label>
            <select
              name="category"
              defaultValue={studio.category}
              className="select select-bordered w-full"
              required
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              Location / address
            </label>
            <input
              name="location"
              type="text"
              defaultValue={studio.location}
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        {/* Prices + capacity */}
        <div className="grid gap-5 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Hourly rate ($)
            </label>
            <input
              name="hourlyRate"
              type="number"
              min="1"
              defaultValue={studio.hourlyRate}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              Security deposit ($)
            </label>
            <input
              name="securityDeposit"
              type="number"
              min="0"
              defaultValue={studio.securityDeposit}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              Max capacity
            </label>
            <input
              name="maxCapacity"
              type="number"
              min="1"
              defaultValue={studio.maxCapacity}
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label className="mb-1 block text-sm font-medium">Image URL</label>
          <input
            name="image"
            type="url"
            defaultValue={studio.image}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Amenities */}
        <div>
          <label className="mb-2 block text-sm font-medium">Amenities</label>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {amenityOptions.map((item) => (
              <label
                key={item}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2 text-sm transition ${
                  amenities.includes(item)
                    ? "border-primary bg-primary/10"
                    : "border-base-300 hover:border-primary/50"
                }`}
              >
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary checkbox-sm"
                  checked={amenities.includes(item)}
                  onChange={() => toggleAmenity(item)}
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* Overview */}
        <div>
          <label className="mb-1 block text-sm font-medium">
            Detailed overview
          </label>
          <textarea
            name="overview"
            rows={5}
            defaultValue={studio.overview}
            className="textarea textarea-bordered w-full"
            required
          />
        </div>

        {/* Read-only host info */}
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Host name</label>
            <input
              type="text"
              value={studio.ownerName}
              readOnly
              className="input input-bordered w-full cursor-not-allowed opacity-70"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Host email</label>
            <input
              type="email"
              value={studio.ownerEmail}
              readOnly
              className="input input-bordered w-full cursor-not-allowed opacity-70"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/my-listings"
            className="btn btn-ghost btn-lg sm:w-40"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="btn btn-primary btn-lg flex-1"
            disabled={saving}
          >
            {saving ? "Saving..." : "Update Studio"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function EditStudioPage() {
  return (
    <PrivateRoute>
      <EditStudioForm />
    </PrivateRoute>
  );
}