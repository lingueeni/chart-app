import Link from "next/link";
import "../globals.css";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-[#141627] to-[#1c1f36] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Title */}
        <Link href="/" className="text-2xl font-bold text-blue-400">
          AD X-Ray
        </Link>

        {/* Navigation Links */}
        <div className="space-x-8">
          <Link
            href="/"
            className="text-gray-300 hover:text-blue-400 transition-colors font-semibold text-lg"
          >
            Dashboard
          </Link>
          <Link
            href="/reports"
            className="text-gray-300 hover:text-blue-400 transition-colors font-semibold text-lg"
          >
            Reports
          </Link>
          <Link
            href="/settings"
            className="text-gray-300 hover:text-blue-400 transition-colors font-semibold text-lg"
          >
            Settings
          </Link>
        </div>
      </div>
    </nav>
  );
}
