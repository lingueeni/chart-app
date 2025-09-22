"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function SecurityPrivilegedCard() {
  const privilegedGroups = [
    { group: "Domain Admins", members: ["Admin1", "Admin2"] },
    { group: "Enterprise Admins", members: ["Admin3"] },
    { group: "Schema Admins", members: ["Admin4", "Admin5"] },
  ];

  const passwordNeverExpire = [
    { category: "User Accounts", count: 15 },
    { category: "Computer Accounts", count: 8 },
  ];

  const inactiveAccounts = [
    { type: "Inactive Users Accounts", count: 12 },
    { type: "Inactive Computers Accounts", count: 7 },
  ];

  return (
    <div className="bg-[#F3F9FF] shadow-md rounded-xl border border-[#004578]/20 p-6">
      <h2 className="text-xl font-bold text-[#004578] mb-6">
        🔐 Security / Privileged
      </h2>

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

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-[#004578] mb-3">
          🔑 Users with Passwords Never Expire
        </h3>
        <div className="h-64 bg-white rounded-lg border border-gray-200 p-3">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={passwordNeverExpire}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#0078D7" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

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
