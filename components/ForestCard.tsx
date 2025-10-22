"use client";

import Image from "next/image";
import Link from "next/link";

export default function ForestCard() {
  const domains = [
    {
      name: "contoso.local",
      osVersion: "Windows Server 2019",
      uptime: "12 Days, 23 Hours",
    },
    {
      name: "hr.contoso.local",
      osVersion: "Windows Server 2016",
      uptime: "32 Days, 6 Hours",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Header */}
      <div className="relative px-6 py-4 border-b border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-900">
          Forest and Domain Controller Info
        </h3>
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#0078D4] via-[#107C10] to-[#FFB900]" />
      </div>

      {/* Main Table */}
      <div className="p-6 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 uppercase">
              <th className="px-6 py-3 text-left font-semibold">Property</th>
              <th className="px-6 py-3 text-left font-semibold">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-3 text-black font-medium">Forest Name</td>
              <td className="px-4 py-3 text-gray-600">ContosoForest</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-3 text-black font-medium">
                Forest Function Level
              </td>
              <td className="px-4 py-3 text-gray-600">Windows Server 2016</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-3 text-black font-medium">
                Domain Function Level
              </td>
              <td className="px-4 py-3 text-gray-600">Windows Server 2016</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-3 text-black font-medium">
                Schema Version
              </td>
              <td className="px-4 py-3 text-gray-600">87</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-3 text-black font-medium">Recycle Bin</td>
              <td className="px-4 py-3">
                <span className="px-2 py-1 text-s font-bold text-green-800 bg-green-100 rounded">
                  Enabled
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Domains Subtable */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900">Domains</h4>
            <Link
              href="/domain-controllers"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition group"
            >
              <span className="text-sm font-medium">View Details</span>
              <Image
                src="/arrow-right.svg"
                alt="Go to Domain Controllers"
                width={18}
                height={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>

          <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-sm font-semibold text-black border-b">
                  Domain
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-black border-b">
                  OS Version
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-black border-b">
                  Uptime
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {domains.map((d, i) => (
                <tr key={i} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-gray-600">{d.name}</td>
                  <td className="px-4 py-3 text-gray-600">{d.osVersion}</td>
                  <td className="px-4 py-3 text-gray-600">{d.uptime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FSMO Roles */}
        <div className="mt-8">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            FSMO Roles
          </h4>
          <table className="w-full text-left border-collapse">
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-4 py-3 text-black font-medium">
                  Schema Master
                </td>
                <td className="px-4 py-3 text-gray-600">DC1.contoso.local</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-black font-medium">
                  Domain Naming Master
                </td>
                <td className="px-4 py-3 text-gray-600">DC1.contoso.local</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-black font-medium">
                  PDC Emulator
                </td>
                <td className="px-4 py-3 text-gray-600">DC2.contoso.local</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-black font-medium">RID Master</td>
                <td className="px-4 py-3 text-gray-600">DC3.contoso.local</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-black font-medium">
                  Infrastructure Master
                </td>
                <td className="px-4 py-3 text-gray-600">DC4.contoso.local</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
