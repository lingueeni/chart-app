"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

interface Site {
  id: number;
  name: string;
  link: string;
  replicationTopology: string;
  fsmoCount: number;
  gradientFrom: string;
  gradientTo: string;
}

export default function SitesCard() {
  const sites: Site[] = [
    {
      id: 1,
      name: "HQ-Site",
      link: "hq-link",
      replicationTopology: "Ring",
      fsmoCount: 5,
      gradientTo: "#0078d4", // blue
      gradientFrom: "#4dabf7",
    },
    {
      id: 2,
      name: "Branch-Site",
      link: "branch-link",
      replicationTopology: "Hub-Spoke",
      fsmoCount: 3,
      gradientTo: "#d13438", // red
      gradientFrom: "#ff8a80",
    },
    {
      id: 3,
      name: "Remote-Site",
      link: "remote-link",
      replicationTopology: "Mesh",
      fsmoCount: 4,
      gradientTo: "#008080", // turquoise
      gradientFrom: "#36DECE",
    },
    {
      id: 4,
      name: "DMZ-Site",
      link: "dmz-link",
      replicationTopology: "Star",
      fsmoCount: 2,
      gradientTo: "#ff8c00", // orange
      gradientFrom: "#ffd43b",
    },
    {
      id: 5,
      name: "Backup-Site",
      link: "backup-link",
      replicationTopology: "Tree",
      fsmoCount: 6,
      gradientFrom: "#ffb900", // yellow
      gradientTo: "#ffd43b",
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
      <div className="relative px-6 py-4 border-b border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-900">Sites</h3>
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#0078D4] via-[#107C10] to-[#FFB900]" />
      </div>

      <div className="p-6">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-m">
            <thead>
              <tr className="bg-gray-50 text-gray-600 uppercase">
                <th className="px-6 py-3 text-left font-semibold">Name</th>
                <th className="px-6 py-3 text-left font-semibold">Link</th>
                <th className="px-6 py-3 text-left font-semibold">
                  Replication Topology
                </th>
                <th className="px-6 py-3 text-left font-semibold">
                  FSMO Holders
                </th>
              </tr>
            </thead>
            <tbody>
              {sites.map((site) => (
                <tr key={site.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900 flex items-center">
                    <span
                      className="w-2.5 h-2.5 rounded-full mr-3"
                      style={{
                        background: `linear-gradient(135deg, ${site.gradientFrom}, ${site.gradientTo})`,
                      }}
                    />
                    {site.name}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{site.link}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {site.replicationTopology}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-white text-xs font-semibold shadow-sm"
                      style={{
                        background: `linear-gradient(135deg, ${site.gradientFrom}, ${site.gradientTo})`,
                      }}
                    >
                      {site.fsmoCount}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Chart */}
        <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-base font-semibold text-gray-900">
              FSMO Holders Distribution
            </h4>
            <div className="flex gap-4 text-xs text-gray-600">
              {sites.map((s) => (
                <div key={s.id} className="flex items-center gap-1">
                  <span
                    className="w-3 h-3 rounded-sm"
                    style={{
                      background: `linear-gradient(135deg, ${s.gradientFrom}, ${s.gradientTo})`,
                    }}
                  />
                  {s.name.split("-")[0]}
                </div>
              ))}
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sites}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <defs>
                  {sites.map((site) => (
                    <linearGradient
                      key={site.id}
                      id={`colorGradient-${site.id}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={site.gradientFrom}
                        stopOpacity={1}
                      />
                      <stop
                        offset="95%"
                        stopColor={site.gradientTo}
                        stopOpacity={1}
                      />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis
                  dataKey="name"
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
                  labelStyle={{ color: "#0078D4", fontWeight: "bold" }}
                />
                <Bar dataKey="fsmoCount" barSize={40} radius={[6, 6, 0, 0]}>
                  {sites.map((entry) => (
                    <Cell
                      key={`cell-${entry.id}`}
                      fill={`url(#colorGradient-${entry.id})`}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
