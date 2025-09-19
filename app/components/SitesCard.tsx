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
    <div className="w-full bg-yellow/10 p-6 rounded-xl shadow-md hover:shadow-[0_0_20px_3px_rgba(248,104,40,0.3)] transition-shadow duration-300">
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
                  i % 2 === 0 ? "bg-yellow/10" : "bg-green/10"
                } hover:bg-orange/20 transition-colors`}
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
            <XAxis dataKey="name" stroke="#00B6F1" />
            <YAxis stroke="#00B6F1" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFC400", // yellow background
                border: "1px solid #00B6F1", // cyan border
                borderRadius: "8px",
                color: "#004578",
              }}
              labelStyle={{
                color: "#92C400", // green label text
                fontWeight: "bold",
              }}
              itemStyle={{
                color: "#F86828", // orange items
                fontWeight: "500",
              }}
            />
            <Bar
              dataKey="fsmoCount"
              fill="#F86828"
              barSize={40}
              radius={[6, 6, 0, 0]}
              activeBar={{
                fill: "#92C400", // green hover
                stroke: "#00B6F1", // cyan border
                strokeWidth: 2,
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
