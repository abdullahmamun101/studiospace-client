"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaPenToSquare, FaTrashCan } from "react-icons/fa6";
import PrivateRoute from "@/components/PrivateRoute";
import { authClient } from "@/lib/auth-client";

type Studio = {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  location: string;
  image: string;
  rating?: number;
};

function MyListings() {
  const { data: session } = authClient.useSession();
  const email = session?.user?.email;

  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState<Studio | null>(null);
  const [deleting, setDeleting] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  
  useEffect(() => {
    if (!email) return;

    const load = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/my-studios?email=${encodeURIComponent(email)}`
        );
        if (!res.ok) throw new Error("Failed to load");
        setStudios(await res.json());
      } catch {
        toast.error("Could not load your studios");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [email]);

  const openDeleteModal = (studio: Studio) => {
    setToDelete(studio);
    dialogRef.current?.showModal();
  };

  const closeDeleteModal = () => {
    dialogRef.current?.close();
    setToDelete(null);
  };

  const confirmDelete = async () => {
    if (!toDelete) return;

    setDeleting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/studios/${toDelete._id}`,
        { method: "DELETE" }
      );

      if (!res.ok) {
        toast.error("Failed to delete studio");
        return;
      }

      setStudios((prev) => prev.filter((s) => s._id !== toDelete._id));
      toast.success("Studio deleted successfully");
      closeDeleteModal();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      {/* Heading */}
      <div className="mb-10 flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <div>
          <h1 className="text-3xl font-bold md:text-4xl">My Studio Listings</h1>
          <p className="mt-2 opacity-70">
            Manage the spaces you have listed on StudioSpace.
          </p>
        </div>
        <Link href="/add-studio" className="btn btn-primary">
          Add New Studio
        </Link>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      ) : studios.length === 0 ? (
        <div className="rounded-2xl border border-base-300 bg-base-200 py-16 text-center">
          <h2 className="text-xl font-semibold">No studios listed yet</h2>
          <p className="mx-auto mb-6 mt-2 max-w-md opacity-70">
            You have not added any studio. List your first space and start
            earning.
          </p>
          <Link href="/add-studio" className="btn btn-primary">
            Add New Studio
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-base-300 bg-base-100">
          <table className="table">
            <thead>
              <tr className="bg-base-200">
                <th>Studio</th>
                <th>Category</th>
                <th>Location</th>
                <th>Rate</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {studios.map((studio) => (
                <tr key={studio._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={studio.image}
                        alt={studio.title}
                        className="h-14 w-20 shrink-0 rounded-lg object-cover"
                      />
                      <Link
                        href={`/studios/${studio._id}`}
                        className="font-semibold hover:text-primary"
                      >
                        {studio.title}
                      </Link>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-primary badge-outline">
                      {studio.category}
                    </span>
                  </td>
                  <td className="whitespace-nowrap">{studio.location}</td>
                  <td className="whitespace-nowrap font-semibold text-primary">
                    ${studio.hourlyRate} / hr
                  </td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/studios/edit/${studio._id}`}
                        className="btn btn-sm btn-outline"
                      >
                        <FaPenToSquare /> Update
                      </Link>
                      <button
                        type="button"
                        onClick={() => openDeleteModal(studio)}
                        className="btn btn-sm btn-error btn-outline"
                      >
                        <FaTrashCan /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete confirmation modal */}
      <dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="text-xl font-bold">Delete this studio?</h3>
          <p className="mt-3 opacity-80">
            You are about to delete{" "}
            <span className="font-semibold">{toDelete?.title}</span>. This
            cannot be undone.
          </p>
          <div className="modal-action">
            <button
              type="button"
              onClick={closeDeleteModal}
              className="btn btn-ghost"
              disabled={deleting}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmDelete}
              className="btn btn-error"
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Yes, Delete"}
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setToDelete(null)}>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default function MyListingsPage() {
  return (
    <PrivateRoute>
      <MyListings />
    </PrivateRoute>
  );
}