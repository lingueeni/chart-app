import Link from "next/link";
import "../globals.css";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          AD x-ray
        </Link>

        <div className="space-x-6">
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            Dashboard
          </Link>
          <Link
            href="/reports"
            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            Reports
          </Link>
          <Link
            href="/settings"
            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            Settings
          </Link>
        </div>
      </div>
    </nav>
  );
}
