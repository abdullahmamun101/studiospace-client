"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/PrivateRoute";
import { authClient } from "@/lib/auth-client";

const categories = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop",
];

const amenityOptions = [
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

function AddStudioForm() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [amenities, setAmenities] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleAmenity = (item: string) => {
    setAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    if (amenities.length === 0) {
      toast.error("Please select at least one amenity");
      return;
    }

    const form = e.currentTarget;
    const value = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement).value;

    const studio = {
      title: value("title"),
      category: value("category"),
      hourlyRate: Number(value("hourlyRate")),
      securityDeposit: Number(value("securityDeposit")),
      maxCapacity: Number(value("maxCapacity")),
      location: value("location"),
      image: value("image"),
      amenities,
      overview: value("overview"),
      ownerName: user.name,
      ownerEmail: user.email,
    };

    setLoading(true);
    try {
      const res = await fetch("/api/server/studios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studio),
      });

        if (res.status === 401) {
        toast.error("Session expired. Please login again.");
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        toast.error(data?.message || "Failed to add studio");
        return;
      }

      toast.success("Studio added successfully!");
      router.push("/my-listings");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold md:text-4xl">Add New Studio</h1>
        <p className="mx-auto mt-3 max-w-xl opacity-70">
          List your space and start welcoming creators.
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
            placeholder="e.g. Golden Hour Photo Studio"
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
              defaultValue=""
              className="select select-bordered w-full"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
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
              placeholder="e.g. Gulshan 2, Dhaka"
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
              placeholder="45"
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
              placeholder="100"
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
              placeholder="10"
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
            placeholder="https://..."
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
            placeholder="Describe the space, its size, lighting, equipment and the kind of shoots it suits."
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
              value={user?.name ?? ""}
              readOnly
              className="input input-bordered w-full cursor-not-allowed opacity-70"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Host email</label>
            <input
              type="email"
              value={user?.email ?? ""}
              readOnly
              className="input input-bordered w-full cursor-not-allowed opacity-70"
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-lg w-full"
          disabled={loading}
        >
          {loading ? "Adding studio..." : "Add Studio"}
        </button>
      </form>
    </div>
  );
}

export default function AddStudioPage() {
  return (
    <PrivateRoute>
      <AddStudioForm />
    </PrivateRoute>
  );
}