"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface NetworkAdapter {
  id: number;
  name: string;
  enabled: boolean;
}

export default function GeneralHealthCard() {
  const adapters: NetworkAdapter[] = [
    { id: 1, name: "Ethernet0", enabled: true },
    { id: 2, name: "Ethernet1", enabled: false },
    { id: 3, name: "Wi-Fi", enabled: true },
  ];

  // Example performance data
  const cpuUsed = 45;
  const memUsed = 68;
  const diskUsed = 72;

  const charts = [
    {
      title: "CPU Usage",
      data: [
        { name: "Used", value: cpuUsed, color: "#F25022" },
        { name: "Free", value: 100 - cpuUsed, color: "#E5E7EB" },
      ],
    },
    {
      title: "Memory Usage",
      data: [
        { name: "Used", value: memUsed, color: "#7FBA00" },
        { name: "Free", value: 100 - memUsed, color: "#E5E7EB" },
      ],
    },
    {
      title: "Disk Usage",
      data: [
        { name: "Used", value: diskUsed, color: "#0078D4" },
        { name: "Free", value: 100 - diskUsed, color: "#E5E7EB" },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Time Sync */}
      <div className="bg-[#F25022]/10 p-6 rounded-xl shadow-md hover:shadow-lg transition">
        <h3 className="font-poppins text-xl font-bold text-[#F25022] mb-4">
          ⏱️ Time Sync
        </h3>
        <p>
          Source: <span className="font-medium">DC01</span>
        </p>
        <p>
          NTP: <span className="font-medium">time.windows.com</span>
        </p>
      </div>

      {/* NTDS */}
      <div className="bg-[#7FBA00]/10 p-6 rounded-xl shadow-md hover:shadow-lg transition">
        <h3 className="font-poppins text-xl font-bold text-[#7FBA00] mb-4">
          📂 NTDS
        </h3>
        <p>
          Database: <span className="font-medium">ntds.dit</span>
        </p>
        <p>
          Size: <span className="font-medium">2.3 GB</span>
        </p>
        <p>
          Free Space: <span className="font-medium">500 MB</span>
        </p>
      </div>

      {/* Sysvol/Netlogon */}
      <div className="bg-[#00A4EF]/10 p-6 rounded-xl shadow-md hover:shadow-lg transition flex flex-col items-center justify-center text-center">
        {/* Icon / Title */}
        <div className="w-14 h-14 rounded-full bg-[#00A4EF]/20 flex items-center justify-center mb-3">
          <span className="text-2xl">📁</span>
        </div>
        <h3 className="font-poppins text-lg font-bold text-[#00A4EF] mb-3">
          SYSVOL / NETLOGON
        </h3>

        {/* Status Badge */}
        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700 border border-green-300 shadow-sm">
          Healthy ✅
        </span>
      </div>

      {/* System Performance with pies + adapters */}
      <div className="bg-[#FFB900]/10 p-6 rounded-xl shadow-md hover:shadow-lg transition">
        <h3 className="font-poppins text-xl font-bold text-[#FFB900] mb-6">
          🖥️ System Performance
        </h3>

        {/* Performance charts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          {charts.map((chart, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-white/40 rounded-lg p-4 shadow-sm"
            >
              <div className="h-32 w-full">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={chart.data}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={50}
                      startAngle={90}
                      endAngle={-270}
                    >
                      {chart.data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          stroke="#fff"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number, name: string) => [
                        `${value}%`,
                        name,
                      ]}
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-2 text-sm font-medium text-gray-700">
                {chart.title}
              </p>
            </div>
          ))}
        </div>

        {/* Network Adapters Subtable */}
        <h4 className="font-semibold text-[#004578] mb-2">
          🌐 Network Adapters
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-[#FFB900]/30 rounded-lg">
            <thead>
              <tr className="bg-[#E5F1FB] text-[#004578]">
                <th className="px-3 py-2 text-left">Name</th>
                <th className="px-3 py-2 text-left">Enabled</th>
              </tr>
            </thead>
            <tbody>
              {adapters.map((adapter) => (
                <tr
                  key={adapter.id}
                  className="odd:bg-green/10 even:bg-yellow/10"
                >
                  <td className="px-3 py-2">{adapter.name}</td>
                  <td className="px-3 py-2">
                    {adapter.enabled ? "✅ Yes" : "❌ No"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Replication Summary */}
      <div className="bg-[#0078D4]/10 p-6 rounded-xl shadow-md hover:shadow-lg transition md:col-span-1">
        <h3 className="font-poppins text-xl font-bold text-[#0078D4] mb-4">
          🔄 Replication Summary
        </h3>
        <p>
          Partners Checked: <span className="font-medium">12</span>
        </p>
        <p>
          Failing Connections:{" "}
          <span className="font-medium text-red-600">2</span>
        </p>
        <p>
          Longest Since Sync: <span className="font-medium">45 min</span>
        </p>
        <p>
          Avg Sync Time: <span className="font-medium">5 min</span>
        </p>
      </div>
    </div>
  );
}
