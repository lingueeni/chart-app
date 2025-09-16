"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import "../globals.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20); // adjust threshold if needed
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#141627]/80 backdrop-blur-md shadow-lg"
          : "bg-gradient-to-r from-[#141627] to-[#1c1f36] shadow-md"
      }`}
    >
      <div className="w-[90%] mx-auto py-4 flex justify-between items-center">
        <Link
          href="/"
          className="font-oswald text-2xl font-bold text-white hover:text-indigo-400 transition-colors"
        >
          AD X-Ray
        </Link>

        <div className="space-x-8">
          <Link
            href="/"
            className="font-roboto text-gray-300 hover:text-indigo-400 transition-colors font-semibold text-lg"
          >
            Dashboard
          </Link>
          <Link
            href="/reports"
            className="font-roboto text-gray-300 hover:text-indigo-400 transition-colors font-semibold text-lg"
          >
            Reports
          </Link>
          <Link
            href="/settings"
            className="font-roboto text-gray-300 hover:text-indigo-400 transition-colors font-semibold text-lg"
          >
            Settings
          </Link>
        </div>
      </div>
    </nav>
  );
}
