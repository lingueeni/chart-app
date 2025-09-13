import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Dashboard",
  description: "Next.js 15 Dashboard with Tailwind",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
        <Navbar />
        <main className="max-w-7xl mx-auto px-1 py-1">{children}</main>
      </body>
    </html>
  );
}
