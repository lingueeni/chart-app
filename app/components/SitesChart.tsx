"use client";

import {
  LineChart,
  Line,
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

export default function SitesChart({ sites }: { sites: Site[] }) {
  return (
    <div className="w-full bg-[#221E33] p-6 rounded-xl shadow-md hover:shadow-[0_0_20px_3px_rgba(99,102,241,0.4)] transition-shadow duration-300">
      {/* Responsive Chart */}
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={sites}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="name" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1c1f2e",
                border: "1px solid #333",
              }}
              labelStyle={{ color: "#fff" }}
            />
            <Line
              type="monotone"
              dataKey="fsmoCount"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{ fill: "#6366f1", r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
