"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { TbAperture } from "react-icons/tb";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/studios", label: "Explore Studios" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About Us" },
];

const categories = [
  "Photo Studio",
  "Podcast Studio",
  "Music Studio",
  "Video Studio",
  "Art Studio",
];

const socials = [
  { href: "https://x.com", label: "X", Icon: FaXTwitter },
  { href: "https://facebook.com", label: "Facebook", Icon: FaFacebookF },
  { href: "https://instagram.com", label: "Instagram", Icon: FaInstagram },
  { href: "https://linkedin.com", label: "LinkedIn", Icon: FaLinkedinIn },
];

export default function Footer() {
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.reset();
    toast.success("Thanks for subscribing!");
  };

  return (
    <footer className="border-t border-base-300 bg-base-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <TbAperture className="text-3xl text-primary" />
            <span>
              Studio<span className="text-primary">Space</span>
            </span>
          </Link>
          <p className="mt-4 text-sm opacity-70">
            Our mission is to connect creators with inspiring studios, so great
            ideas never wait for the right space.
          </p>
          <div className="mt-5 flex gap-3">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="btn btn-circle btn-sm btn-outline"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">Popular Categories</h3>
          <ul className="space-y-2 text-sm">
            {categories.map((cat) => (
              <li key={cat}>
                <Link
                  href={`/studios?category=${encodeURIComponent(cat)}`}
                  className="hover:text-primary"
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">Newsletter</h3>
          <p className="mb-3 text-sm opacity-70">
            Get new studio listings and creator tips in your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="join w-full">
            <input
              type="email"
              placeholder="Your email"
              className="input input-bordered join-item w-full"
              required
            />
            <button type="submit" className="btn btn-primary join-item">
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-base-300 py-4 text-center text-sm opacity-70">
        <p>
          © {new Date().getFullYear()} StudioSpace. All rights reserved.{" "}
          <span className="mx-1">|</span> Terms &amp; Privacy
        </p>
      </div>
    </footer>
  );
}