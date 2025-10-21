"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SitesPage() {
  const router = useRouter();

  // Example sites data (replace later with API data)
  const sites = [
    {
      id: 1,
      name: "HQ-Site",
      replication: "Fully Meshed",
      topology: "Ring",
      domainControllers: 4,
      fsmoHolders: [
        { role: "PDC Emulator", holder: "DC01" },
        { role: "RID Master", holder: "DC02" },
        { role: "Infrastructure Master", holder: "DC03" },
        { role: "Schema Master", holder: "DC01" },
        { role: "Domain Naming Master", holder: "DC04" },
      ],
    },
    {
      id: 2,
      name: "Branch-Site",
      replication: "Hub and Spoke",
      topology: "Hub-Spoke",
      domainControllers: 2,
      fsmoHolders: [
        { role: "PDC Emulator", holder: "DC05" },
        { role: "RID Master", holder: "DC05" },
        { role: "Infrastructure Master", holder: "DC06" },
      ],
    },
    {
      id: 3,
      name: "Remote-Site",
      replication: "Hub and Spoke",
      topology: "Mesh",
      domainControllers: 3,
      fsmoHolders: [
        { role: "PDC Emulator", holder: "DC07" },
        { role: "RID Master", holder: "DC08" },
        { role: "Infrastructure Master", holder: "DC09" },
      ],
    },
    {
      id: 4,
      name: "DMZ-Site",
      replication: "Hub and Spoke",
      topology: "Star",
      domainControllers: 2,
      fsmoHolders: [
        { role: "PDC Emulator", holder: "DC10" },
        { role: "RID Master", holder: "DC11" },
        { role: "Infrastructure Master", holder: "DC12" },
      ],
    },
    {
      id: 5,
      name: "Backup-Site",
      replication: "Hub and Spoke",
      topology: "Tree",
      domainControllers: 3,
      fsmoHolders: [
        { role: "PDC Emulator", holder: "DC13" },
        { role: "RID Master", holder: "DC14" },
        { role: "Infrastructure Master", holder: "DC15" },
        { role: "Schema Master", holder: "DC13" },
        { role: "Domain Naming Master", holder: "DC14" },
      ],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-10 space-y-6">
      {/* 🔹 Header */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex justify-between items-center">
        <h3 className="text-2xl font-semibold text-gray-900 flex items-center gap-3">
          <span className="relative">
            <span className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#0078D4] via-[#107C10] to-[#FFB900]" />
          </span>
          Site Replication Details
        </h3>

        {/* Back Button */}
        <button
          onClick={() => router.push("/Dashboard")}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition"
        >
          <span className="font-medium">Back to Dashboard</span>
          <Image
            src="/arrow-right.svg"
            alt="Back"
            width={16}
            height={16}
            className="rotate-180 opacity-70 group-hover:opacity-100 transition"
          />
        </button>
      </div>

      {/* 🔹 Sites List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sites.map((site) => (
          <div
            key={site.id}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden"
          >
            {/* Site Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h4 className="text-lg font-semibold text-[#0078D4]">
                {site.name}
              </h4>
              <span className="text-sm text-gray-500">
                {site.domainControllers} DCs
              </span>
            </div>

            {/* Site Details */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                <p>
                  <strong className="text-gray-900">Replication:</strong>{" "}
                  {site.replication}
                </p>
                <p>
                  <strong className="text-gray-900">Topology:</strong>{" "}
                  {site.topology}
                </p>
                <p>
                  <strong className="text-gray-900">Controllers:</strong>{" "}
                  {site.domainControllers}
                </p>
              </div>

              {/* FSMO Holders */}
              <div className="border-t border-gray-200 pt-4">
                <h5 className="text-sm font-semibold text-gray-900 mb-2">
                  FSMO Roles
                </h5>
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-100 text-gray-600 uppercase text-xs">
                      <th className="px-4 py-2 text-left font-semibold">
                        Role
                      </th>
                      <th className="px-4 py-2 text-left font-semibold">
                        Holder
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {site.fsmoHolders.map((role, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-gray-50 border-b border-gray-100 transition"
                      >
                        <td className="px-4 py-2 text-gray-800 font-medium">
                          {role.role}
                        </td>
                        <td className="px-4 py-2 text-gray-700">
                          {role.holder}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
