"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface NetworkAdapter {
  id: number;
  name: string;
  enabled: boolean;
}

interface Domain {
  name: string;
  performance: {
    cpu: number;
    memory: number;
    disk: number;
  };
  adapters: NetworkAdapter[];
}

export default function SystemPerformance() {
  const router = useRouter();

  const domains: Domain[] = [
    {
      name: "contoso.local",
      performance: { cpu: 45, memory: 68, disk: 72 },
      adapters: [
        { id: 1, name: "Ethernet0", enabled: true },
        { id: 2, name: "Ethernet1", enabled: false },
      ],
    },
    {
      name: "hr.contoso.local",
      performance: { cpu: 32, memory: 54, disk: 60 },
      adapters: [{ id: 4, name: "Ethernet0", enabled: true }],
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow w-full">
      {/* 🔹 Clickable Header */}
      <button
        onClick={() => router.push("/domain-controllers")}
        className="relative w-full text-left px-6 py-4 border-b border-gray-200 flex justify-between items-center hover:bg-gray-50 transition group"
      >
        <div className="flex items-center gap-2">
          <Image
            src="/monitor.svg"
            alt="System Performance"
            width={24}
            height={24}
            className="opacity-90"
          />
          <h3 className="text-2xl font-semibold text-gray-900">
            System Performance
          </h3>
        </div>
        <Image
          src="/arrow-right.svg"
          alt="Go to Domain Controllers"
          width={20}
          height={20}
          className="opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
        />
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#0078D4] via-[#107C10] to-[#FFB900]" />
      </button>

      {/* 🔹 Body */}
      <div className="p-6 space-y-8">
        {domains.map((domain, idx) => {
          const charts = [
            {
              title: "CPU Usage",
              data: [
                {
                  name: "Used",
                  value: domain.performance.cpu,
                  gradientFrom: "#ff8a80",
                  gradientTo: "#d13438",
                },
                {
                  name: "Free",
                  value: 100 - domain.performance.cpu,
                  gradientFrom: "#e5e7eb",
                  gradientTo: "#cbd5e1",
                },
              ],
            },
            {
              title: "Memory Usage",
              data: [
                {
                  name: "Used",
                  value: domain.performance.memory,
                  gradientFrom: "#36DECE",
                  gradientTo: "#008080",
                },
                {
                  name: "Free",
                  value: 100 - domain.performance.memory,
                  gradientFrom: "#e5e7eb",
                  gradientTo: "#cbd5e1",
                },
              ],
            },
            {
              title: "Disk Usage",
              data: [
                {
                  name: "Used",
                  value: domain.performance.disk,
                  gradientFrom: "#4dabf7",
                  gradientTo: "#0078d4",
                },
                {
                  name: "Free",
                  value: 100 - domain.performance.disk,
                  gradientFrom: "#e5e7eb",
                  gradientTo: "#cbd5e1",
                },
              ],
            },
          ];

          return (
            <div
              key={idx}
              className="bg-white/40 p-4 rounded-lg shadow-sm border border-gray-100"
            >
              <h4 className="flex items-center gap-2 font-semibold text-lg text-[#004578] mb-4">
                <Image
                  src="/domain.svg"
                  alt="Domain"
                  width={20}
                  height={20}
                  className="opacity-90"
                />
                {domain.name}
              </h4>

              {/* Charts */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                {charts.map((chart, idx2) => (
                  <div
                    key={idx2}
                    className="flex flex-col items-center rounded-lg p-4 bg-white shadow-sm border border-gray-100"
                  >
                    <div className="h-32 w-full">
                      <ResponsiveContainer>
                        <PieChart>
                          <defs>
                            {chart.data.map((entry, i) => (
                              <linearGradient
                                key={`grad-${idx2}-${i}`}
                                id={`grad-${idx2}-${i}`}
                                x1="0"
                                y1="0"
                                x2="1"
                                y2="1"
                              >
                                <stop
                                  offset="5%"
                                  stopColor={entry.gradientFrom}
                                  stopOpacity={1}
                                />
                                <stop
                                  offset="95%"
                                  stopColor={entry.gradientTo}
                                  stopOpacity={1}
                                />
                              </linearGradient>
                            ))}
                          </defs>

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
                            {chart.data.map((entry, i) => (
                              <Cell
                                key={`cell-${idx2}-${i}`}
                                fill={`url(#grad-${idx2}-${i})`}
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

              {/* Network Adapters */}
              <h5 className="flex items-center gap-2 font-semibold text-[#004578] mb-2">
                <Image
                  src="/global.svg"
                  alt="Network Adapters"
                  width={20}
                  height={20}
                  className="opacity-90"
                />
                Network Adapters
              </h5>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-gray-200 rounded-lg">
                  <thead>
                    <tr className="bg-[#E5F1FB] text-[#004578]">
                      <th className="px-3 py-2 text-left">Name</th>
                      <th className="px-3 py-2 text-left">Enabled</th>
                    </tr>
                  </thead>
                  <tbody>
                    {domain.adapters.map((adapter) => (
                      <tr
                        key={adapter.id}
                        className="odd:bg-white even:bg-blue-50"
                      >
                        <td className="px-3 py-2">{adapter.name}</td>
                        <td className="px-3 py-2">
                          {adapter.enabled ? (
                            <span className="inline-flex items-center gap-1 text-green-700 font-medium">
                              <Image
                                src="/check.svg"
                                alt="Yes"
                                width={16}
                                height={16}
                                className="inline-block"
                              />
                              Yes
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-red-600 font-medium">
                              <Image
                                src="/x.svg"
                                alt="No"
                                width={16}
                                height={16}
                                className="inline-block"
                              />
                              No
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
