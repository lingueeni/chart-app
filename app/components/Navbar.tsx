"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="w-[90%] mx-auto py-4 flex justify-between items-center">
        <Link
          href="/"
          className="font-oswald text-2xl font-bold text-[#0078D4] hover:text-[#005A9E] transition-colors"
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
              className="font-roboto text-[#0078D4] hover:text-[#005A9E] transition-colors font-semibold text-lg"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
