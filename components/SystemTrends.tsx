"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import DiskSpaceUtilization from "./DiskSpaceUtilization";

export default function SystemTrends() {
  // Sample mock data — replace these with your real API data later
  const failedTestsData = [
    { date: "2025-09-14", failed: 5, passed: 10 },
    { date: "2025-09-20", failed: 7, passed: 8 },
    { date: "2025-09-25", failed: 3, passed: 12 },
    { date: "2025-09-27", failed: 0, passed: 15 },
  ];

  const usersComputersData = [
    {
      date: "2025-09-14",
      activeUsers: 120,
      inactiveUsers: 30,
      activeComputers: 80,
      inactiveComputers: 20,
    },
    {
      date: "2025-09-20",
      activeUsers: 140,
      inactiveUsers: 25,
      activeComputers: 90,
      inactiveComputers: 15,
    },
    {
      date: "2025-09-25",
      activeUsers: 135,
      inactiveUsers: 35,
      activeComputers: 95,
      inactiveComputers: 25,
    },
    {
      date: "2025-09-27",
      activeUsers: 150,
      inactiveUsers: 20,
      activeComputers: 100,
      inactiveComputers: 10,
    },
  ];

  //     const diskSpaceData = [
  //     { date: "2025-09-14", DC1: 70, DC2: 85, DC3: 60 },
  //     { date: "2025-09-20", DC1: 68, DC2: 88, DC3: 62 },
  //     { date: "2025-09-25", DC1: 75, DC2: 80, DC3: 70 },
  //     { date: "2025-09-27", DC1: 72, DC2: 90, DC3: 65 },
  //     { date: "2025-10-02", DC1: 74, DC2: 87, DC3: 67 },
  //     { date: "2025-10-07", DC1: 77, DC2: 83, DC3: 72 },
  //     { date: "2025-10-12", DC1: 79, DC2: 89, DC3: 69 },
  //   ];

  const diskSpaceData = [
    { date: "2025-09-14", DC1: 70, DC2: 85, DC3: 60 },
    { date: "2025-09-20", DC1: 68, DC2: 88, DC3: 62 },
    { date: "2025-09-25", DC1: 75, DC2: 80, DC3: 70 },
    { date: "2025-09-27", DC1: 72, DC2: 90, DC3: 65 },
  ];
  const gradientColorsfordiskSpaceData = [
    { from: "#4dabf7", to: "#0078d4" }, // blue
  ];
  const dcKeys = Object.keys(diskSpaceData[0] || {}).filter(
    (k) => k !== "date"
  );

  return (
    <div className="space-y-10 bg-gray-50 p-8 rounded-2xl shadow-md">
      <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">
        System Trends Overview
      </h2>

      {/* 1️⃣ Tests Over Time (Line Chart) */}
      <section className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Tests Over Time
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={failedTestsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />

            {/* 🔴 Failed Tests Line */}
            <Line
              type="monotone"
              dataKey="failed"
              stroke="#ef4444"
              strokeWidth={3}
              activeDot={{ r: 6 }}
              name="Failed Tests"
            />

            {/* 🟢 Passed Tests Line */}
            <Line
              type="monotone"
              dataKey="passed"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Passed Tests"
            />
          </LineChart>
        </ResponsiveContainer>
      </section>

      <div className="p-6 space-y-10">
        {/* 🧑‍💻 USERS */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-base font-semibold text-gray-900">
              Users Activity
            </h4>
            <div className="flex gap-4 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <span
                  className="w-3 h-3 rounded-sm"
                  style={{
                    background: "linear-gradient(135deg, #73d697ff, #1d9a4bff)",
                  }}
                />
                Active
              </div>
              <div className="flex items-center gap-1">
                <span
                  className="w-3 h-3 rounded-sm"
                  style={{
                    background: "linear-gradient(135deg, #fca5a5, #ef4444)",
                  }}
                />
                Inactive
              </div>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usersComputersData}>
                <defs>
                  <linearGradient
                    id="activeUsersGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#73d697ff" stopOpacity={1} />
                    <stop offset="95%" stopColor="#1d9a4bff" stopOpacity={1} />
                  </linearGradient>
                  <linearGradient
                    id="inactiveUsersGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#fca5a5" stopOpacity={1} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={1} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis
                  dataKey="date"
                  stroke="#404040"
                  fontSize={12}
                  tickMargin={10}
                />
                <YAxis stroke="#404040" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#1d9a4bff", fontWeight: "bold" }}
                />
                <Legend />

                <Bar
                  dataKey="activeUsers"
                  fill="url(#activeUsersGradient)"
                  name="Active Users"
                  barSize={40}
                  radius={[6, 6, 0, 0]}
                />
                <Bar
                  dataKey="inactiveUsers"
                  fill="url(#inactiveUsersGradient)"
                  name="Inactive Users"
                  barSize={40}
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 💻 COMPUTERS */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-base font-semibold text-gray-900">
              Computers Activity
            </h4>
            <div className="flex gap-4 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <span
                  className="w-3 h-3 rounded-sm"
                  style={{
                    background: "linear-gradient(135deg, #73d697ff, #1d9a4bff)",
                  }}
                />
                Active
              </div>
              <div className="flex items-center gap-1">
                <span
                  className="w-3 h-3 rounded-sm"
                  style={{
                    background: "linear-gradient(135deg, #fca5a5, #ef4444)",
                  }}
                />
                Inactive
              </div>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usersComputersData}>
                <defs>
                  <linearGradient
                    id="activeComputersGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#73d697ff" stopOpacity={1} />
                    <stop offset="95%" stopColor="#1d9a4bff" stopOpacity={1} />
                  </linearGradient>
                  <linearGradient
                    id="inactiveComputersGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#fca5a5" stopOpacity={1} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={1} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis
                  dataKey="date"
                  stroke="#404040"
                  fontSize={12}
                  tickMargin={10}
                />
                <YAxis stroke="#404040" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#1d9a4bff", fontWeight: "bold" }}
                />
                <Legend />

                <Bar
                  dataKey="activeComputers"
                  fill="url(#activeComputersGradient)"
                  name="Active Computers"
                  barSize={40}
                  radius={[6, 6, 0, 0]}
                />
                <Bar
                  dataKey="inactiveComputers"
                  fill="url(#inactiveComputersGradient)"
                  name="Inactive Computers"
                  barSize={40}
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 3️⃣ Disk Space Utilization Across DCs */}
      <DiskSpaceUtilization />
    </div>
  );
}
