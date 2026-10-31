"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const photo = (form.elements.namedItem("photo") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must have an uppercase letter");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must have a lowercase letter");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: photo,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Registration failed");
      return;
    }

    toast.success("Account created! Please login.");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <form onSubmit={handleRegister} className="card-body gap-3">
          <h1 className="text-3xl font-bold text-center">Create Account</h1>
          <p className="text-center text-sm opacity-70">
            Join StudioSpace to book or host creative studios
          </p>

          <input
            name="name"
            type="text"
            placeholder="Full name"
            className="input input-bordered w-full"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            required
          />
          <input
            name="photo"
            type="url"
            placeholder="Photo URL"
            className="input input-bordered w-full"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            required
          />

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Creating..." : "Register"}
          </button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="link link-primary">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}