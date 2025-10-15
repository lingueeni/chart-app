"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Brush,
} from "recharts";
import dayjs from "dayjs";

// 🧮 Utility — aggregate by week
function aggregateByWeek(data: any[]) {
  const grouped: Record<string, any> = {};
  data.forEach((entry) => {
    const week = dayjs(entry.date).startOf("week").format("YYYY-MM-DD");
    if (!grouped[week]) grouped[week] = { date: week };
    Object.keys(entry).forEach((key) => {
      if (key === "date") return;
      grouped[week][key] = (grouped[week][key] || 0) + entry[key];
    });
  });

  return Object.values(grouped).map((entry: any) => {
    const keys = Object.keys(entry).filter((k) => k !== "date");
    keys.forEach((k) => (entry[k] = Math.round(entry[k] / 7)));
    return entry;
  });
}

export default function DiskSpaceUtilization() {
  const diskSpaceData = [
    { date: "2025-09-01", DC1: 70, DC2: 85, DC3: 60 },
    { date: "2025-09-07", DC1: 68, DC2: 88, DC3: 62 },
    { date: "2025-09-14", DC1: 75, DC2: 80, DC3: 70 },
    { date: "2025-09-21", DC1: 72, DC2: 90, DC3: 65 },
    { date: "2025-09-28", DC1: 74, DC2: 83, DC3: 67 },
    { date: "2025-10-05", DC1: 76, DC2: 89, DC3: 64 },
    { date: "2025-10-12", DC1: 78, DC2: 86, DC3: 68 },
    { date: "2025-10-19", DC1: 79, DC2: 87, DC3: 69 },
    { date: "2025-10-26", DC1: 80, DC2: 85, DC3: 70 },
  ];

  const dcKeys = Object.keys(diskSpaceData[0] || {}).filter(
    (k) => k !== "date"
  );
  const gradient = { from: "#4dabf7", to: "#0078d4" };

  const [viewMode, setViewMode] = useState<"all" | "single">("single");
  const [selectedDC, setSelectedDC] = useState(dcKeys[0]);
  const displayedDCs = viewMode === "all" ? dcKeys : [selectedDC];

  // ⚡ Automatically aggregate if dataset is large
  const processedData = useMemo(() => {
    if (diskSpaceData.length > 30) return aggregateByWeek(diskSpaceData);
    return diskSpaceData;
  }, [diskSpaceData]);

  return (
    <section className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="relative px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h4 className="text-2xl font-semibold text-gray-900">
          Disk Space Utilization Across Data Centers
        </h4>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode("single")}
            className={`px-4 py-2 text-sm rounded-lg font-medium transition ${
              viewMode === "single"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Select DC
          </button>
          <button
            onClick={() => setViewMode("all")}
            className={`px-4 py-2 text-sm rounded-lg font-medium transition ${
              viewMode === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            View All DCs
          </button>

          {viewMode === "single" && (
            <select
              value={selectedDC}
              onChange={(e) => setSelectedDC(e.target.value)}
              className="ml-2 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {dcKeys.map((dc) => (
                <option key={dc} value={dc}>
                  {dc}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Animated charts */}
      <div className="p-6 space-y-10">
        <AnimatePresence mode="wait">
          {displayedDCs.map((dcName) => {
            const gradientId = `gradient-${dcName}`;

            return (
              <motion.div
                key={dcName}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm"
              >
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-base font-semibold text-gray-900">
                    {dcName} Utilization
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span
                      className="w-3 h-3 rounded-sm"
                      style={{
                        background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
                      }}
                    />
                    Disk Usage
                  </div>
                </div>

                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={processedData}>
                      <defs>
                        <linearGradient
                          id={gradientId}
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor={gradient.from}
                            stopOpacity={1}
                          />
                          <stop
                            offset="95%"
                            stopColor={gradient.to}
                            stopOpacity={1}
                          />
                        </linearGradient>
                      </defs>

                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                      <XAxis
                        dataKey="date"
                        stroke="#404040"
                        fontSize={12}
                        tickFormatter={(tick) => dayjs(tick).format("MMM D")}
                      />
                      <YAxis
                        stroke="#404040"
                        fontSize={12}
                        domain={[
                          (min: number) => Math.max(0, min - 5),
                          (max: number) => Math.min(100, max + 5),
                        ]}
                        allowDecimals={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                        }}
                        labelStyle={{
                          color: gradient.to,
                          fontWeight: "bold",
                        }}
                        formatter={(value: number) => `${value}%`}
                      />
                      <Legend />
                      <Bar
                        dataKey={dcName}
                        fill={`url(#${gradientId})`}
                        name={`${dcName} Disk Usage`}
                        barSize={40}
                        radius={[6, 6, 0, 0]}
                      />

                      {/* 🧭 Brush for zoom/scroll */}
                      <Brush
                        dataKey="date"
                        height={20}
                        stroke="#0078d4"
                        travellerWidth={8}
                        tickFormatter={(tick) => dayjs(tick).format("MMM D")}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
