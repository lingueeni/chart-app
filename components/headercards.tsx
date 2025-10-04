"use client";

export default function StatCards() {
  const stats = [
    {
      id: 1,
      label: "Total Sites",
      value: "5",
      color: "#005a9e", // blue
    },
    {
      id: 2,
      label: "Domain Controllers",
      value: "4",
      color: "#107C10", // green
    },
    {
      id: 3,
      label: "Schema Version",
      value: "87",
      color: "#FFB900", // yellow
    },
    {
      id: 4,
      label: "Total Findings",
      value: "20",
      color: "#D13438", // red
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200 relative overflow-hidden"
        >
          <div className="p-6 text-center">
            <p
              className="text-3xl font-bold text-gray-900"
              style={{ color: stat.color }}
            >
              {stat.value}
            </p>
            <p className="mt-2 text-sm font-medium text-gray-600">
              {stat.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
