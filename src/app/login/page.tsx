"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // ?redirect=/some-page thakle login er por oikhane jabe, na hole Home e
  const getRedirectPath = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("redirect") || "/";
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Login failed");
      return;
    }

    toast.success("Login successful!");
    router.push(getRedirectPath());
    router.refresh();
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: getRedirectPath(),
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body gap-3">
          <h1 className="text-3xl font-bold text-center">Welcome Back</h1>
          <p className="text-center text-sm opacity-70">
            Login to book or manage your studios
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <input
              name="email"
              type="email"
              placeholder="Email"
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

            <Link href="#" className="link link-hover text-sm self-end">
              Forgot password?
            </Link>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="divider my-1">OR</div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full"
          >
            Continue with Google
          </button>

          <p className="text-center text-sm">
            New to StudioSpace?{" "}
            <Link href="/register" className="link link-primary">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}