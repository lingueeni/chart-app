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
} from "recharts";

export default function SecurityPrivilegedCard() {
  // Dummy data
  const privilegedGroups = [
    { group: "Domain Admins", members: ["Admin1", "Admin2"] },
    { group: "Enterprise Admins", members: ["Admin3"] },
    { group: "Schema Admins", members: ["Admin4", "Admin5"] },
  ];

  const passwordNeverExpire = [
    { name: "Jan", user: 5, computer: 2 },
    { name: "Feb", user: 8, computer: 3 },
    { name: "Mar", user: 6, computer: 4 },
    { name: "Apr", user: 10, computer: 5 },
  ];

  const inactiveAccounts = [
    { type: "Inactive Users", count: 12 },
    { type: "Inactive Computers", count: 7 },
  ];

  return (
    <div className="bg-[#F3F9FF] shadow-md rounded-xl border border-[#004578]/20 p-6">
      {/* Main Title */}
      <h2 className="text-xl font-bold text-[#004578] mb-6">
        🔐 Security / Privileged
      </h2>

      {/* 1️⃣ Privileged Groups */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-[#004578] mb-3">
          👥 Privileged Groups & Members
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-[#004578]/30 rounded-lg">
            <thead>
              <tr className="bg-[#E5F1FB] text-[#004578]">
                <th className="px-3 py-2 text-left">Group</th>
                <th className="px-3 py-2 text-left">Members</th>
              </tr>
            </thead>
            <tbody>
              {privilegedGroups.map((grp, idx) => (
                <tr key={idx} className="odd:bg-white even:bg-gray-50">
                  <td className="px-3 py-2">{grp.group}</td>
                  <td className="px-3 py-2">{grp.members.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2️⃣ Users with Passwords Never Expire */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-[#004578] mb-3">
          🔑 Users with Passwords Never Expire
        </h3>
        <div className="h-64 bg-white rounded-lg border border-gray-200 p-3">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={passwordNeverExpire}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="user" stroke="#0078D7" />
              <Line type="monotone" dataKey="computer" stroke="#FFB900" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3️⃣ Inactive Accounts */}
      <div>
        <h3 className="text-lg font-semibold text-[#004578] mb-3">
          📴 Inactive Accounts
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {inactiveAccounts.map((acc, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center"
            >
              <p className="text-sm text-gray-500">{acc.type}</p>
              <p className="text-2xl font-bold text-[#004578]">{acc.count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
