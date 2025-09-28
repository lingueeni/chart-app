import "./globals.css";
import Navbar from "./components/Navbar";
import { Inter, Poppins, Roboto, Oswald } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-poppins",
});
const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});
const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

export const metadata = {
  title: "AD X-Ray Dashboard",
  description:
    "Next.js 15 Dashboard styled with Microsoft Windows color schema",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${roboto.variable} ${oswald.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-[#F3F6FA] text-gray-900 font-sans antialiased">
        {/* Navbar */}
        <Navbar />

        {/* Page Wrapper */}
        <main className="flex-1 w-[95%] mx-auto py-8 space-y-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="w-full py-4 bg-gray-100 text-center text-sm text-gray-500 border-t">
          © {new Date().getFullYear()} AD X-Ray
        </footer>
      </body>
    </html>
  );
}
