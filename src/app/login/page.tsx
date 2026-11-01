"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { FaGoogle } from "react-icons/fa6";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: getRedirectPath(),
    });

    if (error) {
      console.log("GOOGLE ERROR:", error);
      toast.error(error.message || "Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-10 right-1/4 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container Card */}
      <div className="card w-full max-w-5xl bg-base-100 shadow-2xl grid md:grid-cols-2 overflow-hidden border border-base-300/40">
        
        {/* Left Side: Brand Showcase & Enhanced Illustration */}
        <div className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/85 p-8 md:p-12 text-primary-content flex flex-col justify-between overflow-hidden">
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
              Simplify <br />
              management with <br />
              our dashboard
            </h2>
            <p className="mt-3 text-sm opacity-90 max-w-xs leading-relaxed">
              Simplify your studio bookings and management with our user-friendly platform.
            </p>
          </div>

          {/* Left Side Expanded & Modern Vector Illustration */}
          <div className="my-8 flex items-center justify-center relative z-10">
            <svg
              className="w-full max-w-[320px] h-auto drop-shadow-2xl"
              viewBox="0 0 420 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Studio Desk Surface */}
              <rect x="30" y="235" width="360" height="14" rx="7" fill="#ffffff" fillOpacity="0.95" />
              <rect x="65" y="249" width="14" height="45" rx="5" fill="#ffffff" fillOpacity="0.75" />
              <rect x="341" y="249" width="14" height="45" rx="5" fill="#ffffff" fillOpacity="0.75" />
              
              {/* Main Monitor / Studio Dashboard Display */}
              <rect x="120" y="70" width="180" height="120" rx="12" fill="#ffffff" />
              <rect x="128" y="78" width="164" height="104" rx="6" fill="#0f172a" />
              
              {/* Monitor Stand */}
              <path d="M190 190H230V215H190V190Z" fill="#ffffff" fillOpacity="0.85" />
              <rect x="165" y="219" width="90" height="10" rx="4" fill="#ffffff" opacity="0.95" />
              
              {/* Dashboard Screen UI Elements */}
              {/* Top bar inside monitor */}
              <rect x="140" y="94" width="35" height="6" rx="3" fill="#38bdf8" />
              <circle cx="270" cy="97" r="5" fill="#22c55e" />
              
              {/* Chart Bars / Metrics */}
              <rect x="140" y="115" width="24" height="45" rx="4" fill="#3b82f6" />
              <rect x="172" y="130" width="24" height="30" rx="4" fill="#60a5fa" />
              <rect x="204" y="105" width="24" height="55" rx="4" fill="#2563eb" />
              <rect x="236" y="122" width="24" height="38" rx="4" fill="#93c5fd" />

              {/* Floating Mini Analytics Card (Left) */}
              <g className="animate-pulse">
                <rect x="45" y="125" width="75" height="55" rx="10" fill="#ffffff" fillOpacity="0.9" stroke="#ffffff" strokeWidth="2" />
                <circle cx="65" cy="145" r="8" fill="#22c55e" fillOpacity="0.2" />
                <rect x="80" y="141" width="28" height="6" rx="3" fill="#1e293b" />
                <rect x="60" y="160" width="48" height="5" rx="2.5" fill="#94a3b8" />
              </g>

              {/* Floating Success Badge Card (Right) */}
              <g className="animate-bounce" style={{ animationDuration: '4s' }}>
                <rect x="295" y="95" width="85" height="45" rx="10" fill="#ffffff" fillOpacity="0.95" stroke="#ffffff" strokeWidth="2" />
                <circle cx="315" cy="117" r="8" fill="#3b82f6" />
                <path d="M312 117L315 120L320 113" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="330" y="111" width="38" height="6" rx="3" fill="#1e293b" />
              </g>

              {/* Creative Plant Accent on Desk */}
              <rect x="315" y="195" width="24" height="40" rx="6" fill="#38bdf8" />
              <path d="M327 195C310 170 295 165 290 172C290 190 310 195 327 195Z" fill="#4ade80" />
              <path d="M327 195C344 170 359 165 364 172C364 190 344 195 327 195Z" fill="#22c55e" />
            </svg>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          {/* StudioSpace Logo Header */}
          <div className="text-center mb-6">
            <Link href="/" className="inline-flex items-center gap-2 mb-3 group">
              <span className="text-2xl font-extrabold tracking-tight text-base-content">
                Studio<span className="text-primary">Space</span>
              </span>
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Welcome Back</h1>
            <p className="text-xs md:text-sm opacity-70 mt-1">
              Please login to your account
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="form-control">
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="input input-bordered w-full bg-base-100 focus:input-primary text-sm"
                required
              />
            </div>
            
            <div className="form-control">
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="input input-bordered w-full bg-base-100 focus:input-primary text-sm"
                required
              />
            </div>

            <div className="flex justify-end">
              <Link href="#" className="link link-hover text-xs opacity-80 hover:opacity-100">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full shadow-md font-medium"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="divider my-6 text-xs opacity-50 uppercase tracking-wider">or Login with</div>

          {/* Social Login - Google Only */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full h-11 border-base-300 hover:border-primary hover:bg-base-100 text-base-content font-medium gap-3"
          >
            <FaGoogle className="text-base" />
            Continue with Google
          </button>

          <p className="text-center text-xs mt-8 opacity-80">
            New to StudioSpace?{" "}
            <Link href="/register" className="link link-primary font-medium">
              Register
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}