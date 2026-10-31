"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { TbAperture } from "react-icons/tb";
import { authClient } from "@/lib/auth-client";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/studios", label: "Explore Studios" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About Us" },
];

const userLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/add-studio", label: "Add New Studio" },
  { href: "/my-listings", label: "My Studio Listings" },
  { href: "/my-bookings", label: "My Bookings" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out");
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <div className="navbar mx-auto max-w-7xl px-4">
        {/* Left: mobile menu + logo */}
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-square">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-10 mt-3 w-56 rounded-box bg-base-100 p-2 shadow"
            >
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={isActive(link.href) ? "text-primary font-semibold" : ""}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <TbAperture className="text-3xl text-primary" />
            <span>
              Studio<span className="text-primary">Space</span>
            </span>
          </Link>
        </div>

        {/* Center: desktop links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium transition border-b-2 ${
                    isActive(link.href)
                      ? "border-primary text-primary"
                      : "border-transparent hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: auth area */}
        <div className="navbar-end gap-2">
          {isPending ? (
            <span className="loading loading-spinner loading-sm" />
          ) : user ? (
            <div className="dropdown dropdown-end dropdown-hover">
              <div tabIndex={0} role="button" className="avatar cursor-pointer">
                <div className="w-10 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={user.image || "https://i.ibb.co/2kR7xwL/avatar.png"}
                    alt={user.name}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content z-10 w-60 rounded-box bg-base-100 p-2 shadow-lg"
              >
                <li className="menu-title px-4 py-2">
                  <span className="block text-base-content font-semibold">
                    {user.name}
                  </span>
                  <span className="block text-xs font-normal opacity-70">
                    {user.email}
                  </span>
                </li>
                {userLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
                <li>
                  <button onClick={handleLogout} className="text-error">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost btn-sm">
                Login
              </Link>
              <Link href="/register" className="btn btn-primary btn-sm">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}