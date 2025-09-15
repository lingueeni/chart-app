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
      <body className="min-h-screen bg-gradient-to-br from-[#0f1120] via-[#1a1c2c] to-[#0f1120]">
        <Navbar />
        <main className="max-w-7xl mx-auto px-1 py-1">{children}</main>
      </body>
    </html>
  );
}
