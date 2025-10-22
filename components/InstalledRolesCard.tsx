"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface Role {
  id: number;
  name: string;
  status: "Active" | "Inactive";
}

export default function InstalledRolesCard() {
  const router = useRouter();

  const roles: Role[] = [
    { id: 1, name: "Active Directory Domain Services", status: "Active" },
    { id: 2, name: "DNS Server", status: "Active" },
    { id: 3, name: "DHCP Server", status: "Inactive" },
    { id: 4, name: "File Services", status: "Active" },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
      {/* 🔹 Clickable Header */}
      <button
        onClick={() => router.push("/domain-controllers")}
        className="relative w-full text-left px-6 py-4 border-b border-gray-200 flex justify-between items-center hover:bg-gray-50 transition group"
      >
        <h3 className="text-2xl font-semibold text-gray-900">
          Installed Roles
        </h3>
        <Image
          src="/arrow-right.svg"
          alt="Go to Installed Roles"
          width={20}
          height={20}
          className="opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
        />
        {/* Gradient top border */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#0078D4] via-[#107C10] to-[#FFB900]" />
      </button>

      {/* Body */}
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-m">
            <thead>
              <tr className="bg-gray-50 text-gray-600 uppercase">
                <th className="px-6 py-3 text-left font-semibold">Role Name</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr
                  key={role.id}
                  className="hover:bg-gray-50 transition border-b border-gray-100"
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
                      {/* Status dot */}
                      <span
                        className={`w-2.5 h-2.5 rounded-full mr-2 ${
                          role.status === "Active"
                            ? "bg-[#107C10]"
                            : "bg-[#D13438]"
                        }`}
                      />
                      {role.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
