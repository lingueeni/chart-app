"use client";

interface Role {
  id: number;
  name: string;
  status: "Active" | "Inactive";
}

export default function InstalledRolesCard() {
  const roles: Role[] = [
    { id: 1, name: "Active Directory Domain Services", status: "Active" },
    { id: 2, name: "DNS Server", status: "Active" },
    { id: 3, name: "DHCP Server", status: "Inactive" },
    { id: 4, name: "File Services", status: "Active" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Header with gradient top border */}
      <div className="relative px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Installed Roles</h3>
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#0078D4] via-[#107C10] to-[#FFB900]" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-700 uppercase text-sm tracking-wide">
              <th className="px-6 py-3 text-left font-semibold">Role Name</th>
              <th className="px-6 py-3 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr
                key={role.id}
                className="hover:bg-gray-50 transition-colors border-b border-gray-100"
              >
                <td className="px-6 py-4 text-gray-800 font-medium">
                  {role.name}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center text-sm font-semibold ${
                      role.status === "Active"
                        ? "text-[#107C10]"
                        : "text-[#D13438]"
                    }`}
                  >
                    {/* status indicator dot */}
                    <span
                      className={`w-2.5 h-2.5 rounded-full mr-2 ${
                        role.status === "Active"
                          ? "bg-[#107C10]"
                          : "bg-[#D13438]"
                      }`}
                    ></span>
                    {role.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
