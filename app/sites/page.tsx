"use client";

import Link from "next/link";
import Image from "next/image";

export default function SitesDetailsPage() {
  const sites = [
    {
      id: 1,
      name: "HQ-Site",
      replication: "Fully Meshed",
      topology: "Ring",
      domainControllers: 4,
      users: 320,
      computers: 180,
      fsmoHolders: [
        { role: "PDC Emulator", holder: "DC01" },
        { role: "RID Master", holder: "DC02" },
        { role: "Infrastructure Master", holder: "DC03" },
        { role: "Schema Master", holder: "DC01" },
        { role: "Domain Naming Master", holder: "DC04" },
      ],
      siteLinks: [
        {
          linkName: "HQ-Branch-Link",
          connectedSites: ["HQ-Site", "Branch-Site"],
          cost: 100,
          schedule: "Always Available",
        },
        {
          linkName: "HQ-Remote-Link",
          connectedSites: ["HQ-Site", "Remote-Site"],
          cost: 120,
          schedule: "Mon–Fri, 8 AM–8 PM",
        },
      ],
    },
    {
      id: 2,
      name: "Branch-Site",
      replication: "Hub and Spoke",
      topology: "Hub-Spoke",
      domainControllers: 2,
      users: 150,
      computers: 95,
      fsmoHolders: [
        { role: "PDC Emulator", holder: "DC05" },
        { role: "RID Master", holder: "DC05" },
        { role: "Infrastructure Master", holder: "DC06" },
      ],
      siteLinks: [
        {
          linkName: "Branch-HQ-Link",
          connectedSites: ["Branch-Site", "HQ-Site"],
          cost: 100,
          schedule: "Always Available",
        },
      ],
    },
    {
      id: 3,
      name: "Remote-Site",
      replication: "Hub and Spoke",
      topology: "Mesh",
      domainControllers: 3,
      users: 110,
      computers: 70,
      fsmoHolders: [
        { role: "PDC Emulator", holder: "DC07" },
        { role: "RID Master", holder: "DC08" },
        { role: "Infrastructure Master", holder: "DC09" },
      ],
      siteLinks: [
        {
          linkName: "Remote-HQ-Link",
          connectedSites: ["Remote-Site", "HQ-Site"],
          cost: 120,
          schedule: "Mon–Fri, 8 AM–8 PM",
        },
      ],
    },
    {
      id: 4,
      name: "DMZ-Site",
      replication: "Hub and Spoke",
      topology: "Star",
      domainControllers: 2,
      users: 60,
      computers: 35,
      fsmoHolders: [
        { role: "PDC Emulator", holder: "DC10" },
        { role: "RID Master", holder: "DC11" },
        { role: "Infrastructure Master", holder: "DC12" },
      ],
      siteLinks: [
        {
          linkName: "DMZ-Backup-Link",
          connectedSites: ["DMZ-Site", "Backup-Site"],
          cost: 140,
          schedule: "Weekdays, 6 AM–6 PM",
        },
      ],
    },
    {
      id: 5,
      name: "Backup-Site",
      replication: "Hub and Spoke",
      topology: "Tree",
      domainControllers: 3,
      users: 85,
      computers: 50,
      fsmoHolders: [
        { role: "PDC Emulator", holder: "DC13" },
        { role: "RID Master", holder: "DC14" },
        { role: "Infrastructure Master", holder: "DC15" },
        { role: "Schema Master", holder: "DC13" },
        { role: "Domain Naming Master", holder: "DC14" },
      ],
      siteLinks: [
        {
          linkName: "Backup-HQ-Link",
          connectedSites: ["Backup-Site", "HQ-Site"],
          cost: 90,
          schedule: "Always Available",
        },
        {
          linkName: "Backup-DMZ-Link",
          connectedSites: ["Backup-Site", "DMZ-Site"],
          cost: 140,
          schedule: "Weekdays, 6 AM–6 PM",
        },
      ],
    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900">
          Site Replication Details
        </h1>
        <Link
          href="/Dashboard"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
        >
          <span className="text-sm font-medium">Back to Dashboard</span>
          <Image
            src="/arrow-right.svg"
            alt="Arrow"
            width={18}
            height={18}
            className="rotate-180"
          />
        </Link>
      </div>

      {/* Masonry Layout */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
        {sites.map((site) => (
          <div
            key={site.id}
            className="break-inside-avoid mb-6 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
          >
            {/* Site Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {site.name}
              </h2>
              <div className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                {site.replication}
              </div>
            </div>

            {/* Basic Info */}
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <span className="font-semibold text-gray-900">Topology:</span>{" "}
                {site.topology}
              </p>
              <p>
                <span className="font-semibold text-gray-900">
                  Domain Controllers:
                </span>{" "}
                {site.domainControllers}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Users:</span>{" "}
                {site.users}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Computers:</span>{" "}
                {site.computers}
              </p>
            </div>

            {/* FSMO Roles */}
            <div className="mt-4 border-t pt-3">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                FSMO Holders:
              </h3>
              <ul className="space-y-1 text-sm">
                {site.fsmoHolders.map((fsmo, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between bg-gray-50 rounded-lg px-3 py-2 hover:bg-blue-50 transition"
                  >
                    <span className="text-gray-700">{fsmo.role}</span>
                    <span className="font-medium text-gray-900">
                      {fsmo.holder}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Site Links */}
            <div className="mt-5 border-t pt-3">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                Site Links:
              </h3>
              <ul className="space-y-2 text-sm">
                {site.siteLinks.map((link, idx) => (
                  <li
                    key={idx}
                    className="p-3 rounded-lg bg-gray-50 hover:bg-blue-50 border border-gray-100 transition"
                  >
                    <p className="font-semibold text-gray-900">
                      {link.linkName}
                    </p>
                    <p className="text-gray-700 text-xs mt-1">
                      <span className="font-semibold">Connected Sites:</span>{" "}
                      {link.connectedSites.join(", ")}
                    </p>
                    <p className="text-gray-700 text-xs">
                      <span className="font-semibold">Cost:</span> {link.cost}
                    </p>
                    <p className="text-gray-700 text-xs">
                      <span className="font-semibold">Schedule:</span>{" "}
                      {link.schedule}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
