"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface Site {
  id: number;
  name: string;
  link: string;
  replicationTopology: string;
  fsmoCount: number;
}

export default function SitesCard() {
  const sites: Site[] = [
    {
      id: 1,
      name: "HQ-Site",
      link: "hq-link",
      replicationTopology: "Ring",
      fsmoCount: 5,
    },
    {
      id: 2,
      name: "Branch-Site",
      link: "branch-link",
      replicationTopology: "Hub-Spoke",
      fsmoCount: 3,
    },
    {
      id: 3,
      name: "Remote-Site",
      link: "remote-link",
      replicationTopology: "Mesh",
      fsmoCount: 4,
    },
    {
      id: 4,
      name: "DMZ-Site",
      link: "dmz-link",
      replicationTopology: "Star",
      fsmoCount: 2,
    },
    {
      id: 5,
      name: "Backup-Site",
      link: "backup-link",
      replicationTopology: "Tree",
      fsmoCount: 6,
    },
  ];

  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <h2 className="font-poppins text-2xl font-bold text-[#0078D4] mb-6">
        Sites
      </h2>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full text-base text-gray-700 border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-[#E5F1FB] text-[#004578]">
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Link</th>
              <th className="px-4 py-3 text-left">Replication Topology</th>
              <th className="px-4 py-3 text-left">FSMO Holders</th>
            </tr>
          </thead>
          <tbody>
            {sites.map((site, i) => (
              <tr
                key={site.id}
                className={`${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-[#E5F1FB]/70 transition-colors`}
              >
                <td className="px-4 py-3 font-medium">{site.name}</td>
                <td className="px-4 py-3">{site.link}</td>
                <td className="px-4 py-3">{site.replicationTopology}</td>
                <td className="px-4 py-3 font-semibold">{site.fsmoCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sites}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
            <XAxis dataKey="name" stroke="#333" />
            <YAxis stroke="#333" />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#004578", fontWeight: "bold" }}
              itemStyle={{ color: "#0078D4" }}
            />
            <Bar
              dataKey="fsmoCount"
              fill="#0078D4"
              barSize={40}
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
