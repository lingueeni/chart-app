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
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

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
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${roboto.variable} ${oswald.variable}`}
    >
      <body className="min-h-screen bg-[#181523] text-gray-200 font-sans">
        <Navbar />
        <main className="w-[95%] mx-auto py-4">{children}</main>
      </body>
    </html>
  );
}
