"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Page() {
  return (
    <main className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{
          scale: 1.02,
          boxShadow: "0 8px 25px rgba(0, 120, 212, 0.2)",
        }}
        className="relative overflow-hidden rounded-3xl border border-gray-200 shadow-lg bg-white/80 backdrop-blur-md p-10 w-full max-w-2xl text-center transition-all duration-300"
      >
        {/* Top Gradient Bar */}
        <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-[#0078D4] via-[#00A4EF] to-[#36DECE]" />

        {/* Glow Background Accent */}
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#0078D4]/10 rounded-full blur-3xl" />
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#36DECE]/10 rounded-full blur-3xl" />

        {/* Icon Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0078D4]/10 to-[#36DECE]/20 flex items-center justify-center border border-[#0078D4]/20">
            <Image
              src="/hourglass.svg"
              alt="Coming Soon"
              width={50}
              height={50}
              className="opacity-90"
            />
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-4xl font-extrabold text-[#0078D4] tracking-tight mb-3"
        >
          Coming Soon
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-gray-600 text-lg leading-relaxed max-w-lg mx-auto mb-6"
        >
          We’re building something powerful for your network management
          experience. Stay tuned — new features are on the way!
        </motion.p>

        {/* Animated Progress Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.6, duration: 1.2, ease: "easeInOut" }}
          className="w-full bg-gray-200 rounded-full h-2 overflow-hidden mb-8"
        >
          <div className="h-2 bg-gradient-to-r from-[#0078D4] via-[#00A4EF] to-[#36DECE] animate-pulse" />
        </motion.div>

        {/* Button */}
        <motion.button
          whileHover={{
            scale: 1.05,
            background: "linear-gradient(to right, #0078D4, #00A4EF, #36DECE)",
            color: "#fff",
            boxShadow: "0 6px 20px rgba(0, 120, 212, 0.3)",
          }}
          className="px-6 py-3 rounded-xl font-semibold text-[#0078D4] border border-[#0078D4]/40 bg-white transition-all duration-300"
        >
          Notify Me
        </motion.button>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 text-sm text-gray-400"
        >
          © {new Date().getFullYear()} ADX Dashboard — In Progress
        </motion.p>
      </motion.div>
    </main>
  );
}
