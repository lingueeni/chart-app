"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#2563EB", "#C2410C", "#047857", "#CA8A04"];

interface ChartCardProps {
  title: string;
  data: { label: string; value: number }[];
}

export default function ChartCard({ title, data }: ChartCardProps) {
  return (
    <div className="bg-gradient-to-br from-[#141627] to-[#1c1f36] p-6 rounded-2xl shadow-lg hover:shadow-[0_0_20px_4px_rgba(56,189,248,0.6)] transition-shadow duration-300">
      <h2 className="text-xl font-semibold mb-6 text-gray-200">{title}</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            outerRadius={90}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#3232ffff",
              border: "none",
              borderRadius: "0.5rem",
              color: "#f3f4f6", // gray-100
            }}
          />
          <Legend
            wrapperStyle={{
              color: "#e5e7eb", // gray-200
              fontSize: "0.875rem",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
