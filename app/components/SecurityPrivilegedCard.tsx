"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function SecurityPrivilegedCard() {
  // Privileged groups with enabled flag
  const privilegedGroups = [
    { group: "Domain Admins", members: ["Admin1", "Admin2"], enabled: true },
    { group: "Enterprise Admins", members: ["Admin3"], enabled: false },
    { group: "Schema Admins", members: ["Admin4", "Admin5"], enabled: true },
    { group: "Administrators", members: ["Admin6", "Admin7"], enabled: true },
    {
      group: "Account Operators",
      members: ["Admin8", "Admin9"],
      enabled: false,
    },
    { group: "Server Operators", members: ["Admin4", "Admin5"], enabled: true },
    {
      group: "Backup Operators",
      members: ["Admin4", "Admin5", "Admin1"],
      enabled: false,
    },
    { group: "Print Operators", members: ["Admin2"], enabled: true },
    { group: "Cart Publishers", members: ["Admin3", "Admin6"], enabled: true },
  ];

  // Expand groups into rows without duplicates
  const expandedPrivilegedGroups = privilegedGroups.flatMap((grp) =>
    [...new Set(grp.members)].map((member) => ({
      group: grp.group,
      member,
      enabled: grp.enabled,
    }))
  );

  // Password never expire data
  const passwordNeverExpire = [
    { category: "User Accounts", count: 15 },
    { category: "Computer Accounts", count: 8 },
  ];

  // Inactive vs active accounts
  const inactiveAccounts = {
    users: { inactive: 12, active: 88 },
    computers: { inactive: 7, active: 43 },
  };

  const userPieData = [
    { name: "Active", value: inactiveAccounts.users.active },
    { name: "Inactive", value: inactiveAccounts.users.inactive },
  ];

  const computerPieData = [
    { name: "Active", value: inactiveAccounts.computers.active },
    { name: "Inactive", value: inactiveAccounts.computers.inactive },
  ];

  const COLORS = ["#0078D7", "#FFB900"];

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
                <th className="px-3 py-2 text-center">Group</th>
                <th className="px-3 py-2 text-left">Member</th>
                <th className="px-3 py-2 text-left">Enabled</th>
              </tr>
            </thead>
            <tbody>
              {privilegedGroups.map((grp, idx) =>
                grp.members.map((member, mIdx) => (
                  <tr
                    key={`${idx}-${mIdx}`}
                    className={`${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } border-b border-gray-200`}
                  >
                    {mIdx === 0 && (
                      <td
                        className="px-3 py-2 font-bold text-[#004578] text-center align-middle bg-[#F3F9FE] border-r border-gray-300"
                        rowSpan={grp.members.length} // merge rows
                      >
                        {grp.group}
                      </td>
                    )}
                    <td className="px-3 py-2">{member}</td>
                    <td className="px-3 py-2">
                      {mIdx % 2 === 0 ? "✅ Yes" : "❌ No"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2️⃣ Users with Passwords Never Expire */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-[#004578] mb-3">
          🔑 Users with Passwords Never Expire
        </h3>
        <div className="h-72 bg-white rounded-lg border border-gray-200 p-3">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={passwordNeverExpire}
              barCategoryGap="30%"
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              {/* Gradient defs */}
              <defs>
                <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00A4EF" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#0078D7" stopOpacity={0.7} />
                </linearGradient>
                <linearGradient
                  id="computerGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#FFB900" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#FFC83D" stopOpacity={0.7} />
                </linearGradient>
              </defs>

              <XAxis dataKey="category" tick={{ fill: "#004578" }} />
              <YAxis tick={{ fill: "#004578" }} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="count"
                radius={[8, 8, 0, 0]}
                barSize={60}
                fill="url(#userGradient)"
                name="Accounts"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3️⃣ Inactive Accounts */}
      <div>
        <h3 className="text-lg font-semibold text-[#004578] mb-3">
          📴 Disabled Accounts
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center">
            <h4 className="font-semibold text-[#004578] mb-2">Users</h4>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={userPieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label
                >
                  {userPieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center">
            <h4 className="font-semibold text-[#004578] mb-2">Computer</h4>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={computerPieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label
                >
                  {computerPieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
