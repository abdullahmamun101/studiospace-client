"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { TbAperture } from "react-icons/tb";
import { authClient } from "@/lib/auth-client";
import ThemeToggle from "@/components/ThemeToggle";

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


const closeMenu = () => {
  (document.activeElement as HTMLElement | null)?.blur();
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const handleLogout = async () => {
    closeMenu();
    await fetch("/api/jwt", { method: "DELETE" });
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
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-md transition-all duration-300 ${
        scrolled
          ? "border-base-300 bg-base-100/90 shadow-sm"
          : "border-transparent bg-base-100/60"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 md:h-20">
        {/* Left: mobile menu + logo */}
        <div className="flex items-center gap-1">
          <div className="dropdown lg:hidden">
            <div
              tabIndex={0}
              role="button"
              aria-label="Open menu"
              className="btn btn-ghost btn-square"
            >
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
              className="menu dropdown-content z-10 mt-3 w-60 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg"
            >
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className={
                      isActive(link.href) ? "font-semibold text-primary" : ""
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {!isPending && !user && (
                <li className="mt-1 border-t border-base-300 pt-1">
                  <Link href="/login" onClick={closeMenu}>
                    Login
                  </Link>
                </li>
              )}
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
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-primary"
                      : "hover:text-primary"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-primary transition-transform duration-300 ${
                      isActive(link.href) ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: theme toggle + auth area */}
        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />

          {isPending ? (
            <span className="loading loading-spinner loading-sm" />
          ) : user ? (
            <div className="dropdown dropdown-end dropdown-hover">
              <div
                tabIndex={0}
                role="button"
                aria-label="Open profile menu"
                className="cursor-pointer"
              >
                <div className="h-10 w-10 overflow-hidden rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                  {user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.image}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center bg-primary font-semibold text-primary-content">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content z-10 w-64 rounded-box border border-base-300 bg-base-100 p-2 shadow-xl"
              >
                <li className="menu-title px-4 py-2">
                  <span className="block font-semibold text-base-content">
                    {user.name}
                  </span>
                  <span className="block text-xs font-normal opacity-70">
                    {user.email}
                  </span>
                </li>
                {userLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} onClick={closeMenu}>
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li className="mt-1 border-t border-base-300 pt-1">
                  <button onClick={handleLogout} className="text-error">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="btn btn-ghost btn-sm hidden sm:inline-flex"
              >
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