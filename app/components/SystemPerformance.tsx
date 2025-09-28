"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

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
    <div className="bg-white/10 p-6 rounded-xl  md:col-span-2">
      <h3 className="font-poppins text-xl font-bold text-black mb-6">
        🖥️ System Performance
      </h3>

      <div className="space-y-8">
        {domains.map((domain, idx) => {
          const charts = [
            {
              title: "CPU Usage",
              data: [
                {
                  name: "Used",
                  value: domain.performance.cpu,
                  color: "#F25022",
                },
                {
                  name: "Free",
                  value: 100 - domain.performance.cpu,
                  color: "#E5E7EB",
                },
              ],
            },
            {
              title: "Memory Usage",
              data: [
                {
                  name: "Used",
                  value: domain.performance.memory,
                  color: "#7FBA00",
                },
                {
                  name: "Free",
                  value: 100 - domain.performance.memory,
                  color: "#E5E7EB",
                },
              ],
            },
            {
              title: "Disk Usage",
              data: [
                {
                  name: "Used",
                  value: domain.performance.disk,
                  color: "#0078D4",
                },
                {
                  name: "Free",
                  value: 100 - domain.performance.disk,
                  color: "#E5E7EB",
                },
              ],
            },
          ];

          return (
            <div key={idx} className="bg-white/40 p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold text-lg text-[#004578] mb-4">
                📡 {domain.name}
              </h4>

              {/* Charts */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                {charts.map((chart, idx2) => (
                  <div
                    key={idx2}
                    className="flex flex-col items-center rounded-lg p-4 bg-white shadow-sm"
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
                            {chart.data.map((entry, i) => (
                              <Cell
                                key={`cell-${i}`}
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

              {/* Network Adapters */}
              <h5 className="font-semibold text-[#004578] mb-2">
                🌐 Network Adapters
              </h5>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-grey/100 rounded-lg">
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
                          {adapter.enabled ? "✅ Yes" : "❌ No"}
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
