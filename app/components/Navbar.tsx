"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import clsx from "clsx";
import "../globals.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
      });
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 transition-all duration-300 shadow-md",
        scrolled
          ? "bg-[#141627]/80 backdrop-blur-md shadow-lg"
          : "bg-gradient-to-r from-[#141627] to-[#1c1f36]"
      )}
    >
      <div className="w-[90%] mx-auto py-4 flex justify-between items-center">
        <Link
          href="/"
          className="font-oswald text-2xl font-bold text-white hover:text-indigo-400 transition-colors"
        >
          AD X-Ray
        </Link>

        <nav className="space-x-8">
          {[
            { href: "/", label: "Dashboard" },
            { href: "/reports", label: "Reports" },
            { href: "/settings", label: "Settings" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-roboto text-gray-300 hover:text-indigo-400 transition-colors font-semibold text-lg"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
