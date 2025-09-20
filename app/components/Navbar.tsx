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
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-white border-b border-gray-200 shadow-md"
          : "bg-[#00B6F1]" // Windows blue
      }`}
    >
      <div className="w-[90%] mx-auto py-4 flex justify-between items-center">
        {/* Logo + Brand */}
        <Link href="/" className="flex items-center space-x-2">
          {/* Windows Logo */}
          <div className="w-8 h-8 grid grid-cols-2 grid-rows-2 gap-[2px] rounded-md overflow-hidden">
            <div className="bg-[#0078D4]" />
            <div className="bg-[#107C10]" />
            <div className="bg-[#FFB900]" />
            <div className="bg-[#D13438]" />
          </div>

          <span
            className={`font-oswald text-2xl font-bold transition-colors ${
              scrolled ? "text-[#00B6F1]" : "text-white hover:text-[#004578]"
            }`}
          >
            AD X-Ray
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="flex space-x-10">
          {[
            { href: "/", label: "Dashboard", color: "#F86828" }, // Orange
            { href: "/reports", label: "Reports", color: "#92C400" }, // Green
            { href: "/settings", label: "Settings", color: "#FFC400" }, // Yellow
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-2 font-roboto font-semibold text-lg transition-colors ${
                scrolled ? "text-gray-800 hover:opacity-70" : "text-white"
              }`}
              style={{
                textDecorationColor: link.color,
                textDecorationThickness: "3px",
                textUnderlineOffset: "6px",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
