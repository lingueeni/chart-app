"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface FSMORole {
  role: string;
  holder: string;
}

interface NetworkAdapter {
  name: string;
  mac: string;
}

interface DomainController {
  name: string;
  os: string;
  uptime: string;
  cpuUsage: number;
  diskUsage: number;
  users: number;
  computers: number;
  isGC: boolean;
  ip: string;
  replicationPartners: string[];
  networkAdapters: NetworkAdapter[];
  replicationData: string;
  availableServices: string[];
}

export default function DomainControllersPage() {
  const [domainControllers, setDomainControllers] = useState<
    DomainController[]
  >([]);
  const [fsmoRoles, setFsmoRoles] = useState<FSMORole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock data
  const mockFSMORoles: FSMORole[] = [
    { role: "PDC Emulator", holder: "DC01" },
    { role: "RID Master", holder: "DC02" },
    { role: "Infrastructure Master", holder: "DC03" },
    { role: "Schema Master", holder: "DC04" },
    { role: "Domain Naming Master", holder: "DC01" },
  ];

  const mockDomainControllers: DomainController[] = [
    {
      name: "DC01",
      os: "Windows Server 2022 Datacenter",
      uptime: "27 days, 13 hours",
      cpuUsage: 35,
      diskUsage: 58,
      users: 230,
      computers: 120,
      isGC: true,
      ip: "192.168.1.10",
      replicationPartners: ["DC02", "DC03"],
      replicationData: "Last replication completed successfully 3 hours ago.",
      availableServices: ["SYSVOL", "NETLOGON", "DNS Server", "Kerberos"],
      networkAdapters: [
        { name: "Ethernet0", mac: "00-1A-4B-22-BC-1A" },
        { name: "Ethernet1", mac: "00-1A-4B-22-BC-1B" },
      ],
    },
    {
      name: "DC02",
      os: "Windows Server 2019 Standard",
      uptime: "19 days, 6 hours",
      cpuUsage: 41,
      diskUsage: 73,
      users: 145,
      computers: 80,
      isGC: false,
      ip: "192.168.1.11",
      replicationPartners: ["DC01", "DC03"],
      replicationData: "Replication delayed by 12 minutes. Retrying...",
      availableServices: ["SYSVOL", "NETLOGON", "Kerberos"],
      networkAdapters: [{ name: "Ethernet0", mac: "00-1A-4B-22-BC-2A" }],
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1000)); // simulate API delay
        setDomainControllers(mockDomainControllers);
        setFsmoRoles(mockFSMORoles);
        setError(null);
      } catch (err) {
        setError(
          "Failed to load data. Please check your connection or try again."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900">
          Domain Controllers Overview
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

      {/* Loading / Error */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="ml-3 text-gray-600 font-medium">Loading data...</p>
        </div>
      )}
      {error && (
        <div className="text-center text-red-600 bg-red-50 border border-red-200 p-4 rounded-xl mb-6">
          {error}
        </div>
      )}

      {/* FSMO Roles */}
      {!loading && !error && (
        <>
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              FSMO Role Holders
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {fsmoRoles.map((role, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                >
                  <p className="text-gray-800 font-semibold">{role.role}</p>
                  <p className="text-sm text-blue-700 mt-1">{role.holder}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Domain Controllers */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Domain Controllers
            </h2>
            <div className="flex flex-wrap gap-6">
              {domainControllers.map((dc) => (
                <motion.div
                  whileHover={{ y: -4 }}
                  key={dc.name}
                  className={`rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all w-full sm:w-[47%] xl:w-[30%] ${
                    dc.isGC ? "bg-green-50" : "bg-white"
                  }`}
                >
                  {/* Header */}
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {dc.name}
                    </h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        dc.isGC
                          ? "bg-indigo-200 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {dc.isGC ? "Global Catalog" : "Standard DC"}
                    </span>
                  </div>

                  {/* Basic Info */}
                  <div className="text-sm space-y-1 text-gray-700">
                    <p>
                      <span className="font-semibold">OS:</span> {dc.os}
                    </p>
                    <p>
                      <span className="font-semibold">Uptime:</span> {dc.uptime}
                    </p>
                    <p>
                      <span className="font-semibold">IP:</span> {dc.ip}
                    </p>
                  </div>

                  {/* Performance */}
                  <div className="mt-4 space-y-2">
                    <div>
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>CPU Usage</span>
                        <span>{dc.cpuUsage}%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${dc.cpuUsage}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Disk Usage</span>
                        <span>{dc.diskUsage}%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-500 h-2 rounded-full"
                          style={{ width: `${dc.diskUsage}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Users & Computers */}
                  <div className="mt-4 text-sm border-t pt-3">
                    <p>
                      <span className="font-semibold">Users:</span> {dc.users}
                    </p>
                    <p>
                      <span className="font-semibold">Computers:</span>{" "}
                      {dc.computers}
                    </p>
                  </div>

                  {/* Replication */}
                  <div className="mt-4 border-t pt-3 text-sm">
                    <p className="font-semibold text-gray-900 mb-1">
                      Replication Data:
                    </p>
                    <p className="text-gray-700 mb-2">{dc.replicationData}</p>
                    <p className="font-semibold text-gray-900 mb-1">
                      Replication Partners:
                    </p>
                    <ul className="list-disc pl-5 text-gray-700">
                      {dc.replicationPartners.map((partner, i) => (
                        <li key={i}>{partner}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Network Adapters */}
                  <div className="mt-4 border-t pt-3 text-sm">
                    <p className="font-semibold text-gray-900 mb-2">
                      Network Adapters:
                    </p>
                    <div className="bg-gray-50 rounded-xl border border-gray-200 p-3">
                      {dc.networkAdapters.map((adapter, i) => (
                        <p key={i} className="text-gray-700">
                          <strong>{adapter.name}</strong> — {adapter.mac}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Available Services */}
                  <div className="mt-4 border-t pt-3 text-sm">
                    <p className="font-semibold text-gray-900 mb-2">
                      Available Services:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {dc.availableServices.map((svc, i) => (
                        <span
                          key={i}
                          className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {svc}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
