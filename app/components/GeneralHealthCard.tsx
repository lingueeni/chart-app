"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import SystemPerformance from "./SystemPerformance";

export default function GeneralHealthCard() {
  // NTDS space info
  const ntdsUsed = 1800; // MB
  const ntdsFree = 500; // MB
  const ntdsData = [
    { name: "Used", value: ntdsUsed, color: "#7FBA00" },
    { name: "Free", value: ntdsFree, color: "#E5E7EB" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Time Sync */}
      <div className="bg-[#F86828]/10 p-6 rounded-xl shadow-md hover:shadow-lg transition">
        <h3 className="flex items-center gap-2 font-poppins text-xl font-bold text-[#F25022] mb-4">
          <Image
            src="/time.svg" // place folder.svg inside /public
            alt="NTDS"
            className="w-6 h-6 opacity-90"
            width={24}
            height={24}
          />
          Time Sync
        </h3>
        <p>
          <span className="font-semibold text-gray-700">Source:</span>
          <span className="font-medium">DC01</span>
        </p>
        <p>
          <span className="font-semibold text-gray-700">NTP:</span>
          <span className="font-medium">time.windows.com</span>
        </p>
      </div>
      {/* NTDS with Pie */}
      <div className="bg-[#92C400]/10 p-6 rounded-xl shadow-md hover:shadow-lg transition flex flex-col">
        <h3 className="flex items-center gap-2 font-poppins text-xl font-bold text-[#7FBA00] mb-4">
          <Image
            src="/ntds.svg" // place folder.svg inside /public
            alt="NTDS"
            width={24}
            height={24}
          />
          NTDS
        </h3>

        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          {/* Info */}
          <div>
            <p>
              <span className="font-semibold text-gray-700">Database:</span>
              <span className="font-medium">ntds.dit</span>
            </p>
            <p>
              <span className="font-semibold text-gray-700">Size:</span>
              <span className="font-medium">2.3 GB</span>
            </p>
            <p>
              <span className="font-semibold text-gray-700">Free Space:</span>
              <span className="font-medium">500 MB</span>
            </p>
          </div>

          {/* Pie chart */}
          <div className="w-32 h-32">
            <ResponsiveContainer>
              <PieChart>
                {/* Define gradients once */}
                <defs>
                  <linearGradient
                    id="ntdsUsedGradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#008080" stopOpacity={1} />
                    <stop offset="95%" stopColor="#36DECE" stopOpacity={1} />
                  </linearGradient>
                  <linearGradient
                    id="ntdsFreeGradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#E5E7EB" stopOpacity={1} />
                    <stop offset="95%" stopColor="#D1D5DB" stopOpacity={1} />
                  </linearGradient>
                </defs>

                <Pie
                  data={ntdsData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={50}
                  startAngle={90}
                  endAngle={-270}
                >
                  {ntdsData.map((entry, i) => (
                    <Cell
                      key={`cell-${i}`}
                      fill={
                        i === 0
                          ? "url(#ntdsUsedGradient)"
                          : "url(#ntdsFreeGradient)"
                      }
                      stroke="#fff"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number, name: string) => [
                    `${value} MB`,
                    name,
                  ]}
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Sysvol/Netlogon */}
      <div className="bg-[#00A4EF]/10 p-6 rounded-xl shadow-md hover:shadow-lg transition flex flex-col text-left">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 rounded-full bg-[#00A4EF]/20 flex items-center justify-center mb-3">
            <Image
              src="/sysvol.svg" // place folder.svg inside /public
              alt="NTDS"
              width={30}
              height={25}
            />
          </div>
          <h3 className="font-poppins text-lg font-bold text-[#00A4EF] mb-2">
            SYSVOL / NETLOGON
          </h3>
        </div>

        {/* SysVol Checks */}
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-start gap-2">
            <span
              className="w-5 h-5 flex items-center justify-center rounded-full 
               bg-green-500 border border-green-600 shadow-sm"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
            </span>
            <span>
              File Replication Service (FRS) or DFS Replication service is
              running
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span
              className="w-5 h-5 flex items-center justify-center rounded-full 
               bg-green-500 border border-green-600 shadow-sm"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
            </span>
            <span>SYSVOL folder is shared</span>
          </div>
          <div className="flex items-start gap-2">
            <span
              className="w-5 h-5 flex items-center justify-center rounded-full 
               bg-green-500 border border-green-600 shadow-sm"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
            </span>
            <span>
              File Replication Service (FRS) or DFS Replication service is
              running
            </span>
          </div>
        </div>

        <hr className="my-3 border-gray-300" />

        {/* NetLogons Checks */}
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-start gap-2">
            <span
              className="w-5 h-5 flex items-center justify-center rounded-full 
               bg-green-500 border border-green-600 shadow-sm"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
            </span>
            <span>NETLOGON share is present</span>
          </div>

          <div className="flex items-start gap-2">
            <span
              className="w-5 h-5 flex items-center justify-center rounded-full 
               bg-green-500 border border-green-600 shadow-sm"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
            </span>
            <span>NETLOGON share is accessible</span>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700 border border-green-300 shadow">
            <span
              className="w-6 h-6 flex items-center justify-center rounded-md 
                 bg-gradient-to-br from-green-400 to-green-600 
                 border-2 border-green-700 shadow-md"
            >
              <Image
                src="/check.svg"
                alt="Healthy"
                width={14}
                height={14}
                className="opacity-95"
              />
            </span>
            Healthy
          </span>
        </div>
      </div>
      {/* Replication Summary */}
      <div className="bg-[#FFC400]/10 p-6 rounded-xl shadow-md hover:shadow-lg transition md:col-span-1">
        <h3 className="flex items-center gap-2 font-poppins text-xl font-bold text-[#0078D4] mb-4">
          <Image
            src="/replication.svg"
            alt="Replication"
            width={24}
            height={24}
            className="opacity-90"
          />
          Replication Summary
        </h3>
        <p>
          <span className="font-semibold text-gray-700">Partners Checked:</span>
          <span className="font-medium">12</span>
        </p>
        <p>
          <span className="font-semibold text-gray-700">
            Failing Connections:
          </span>
          <span className="font-medium text-red-600">2</span>
        </p>
        <p>
          <span className="font-semibold text-gray-700">
            Longest Since Sync:
          </span>
          <span className="font-medium">45 min</span>
        </p>
        <p>
          <span className="font-semibold text-gray-700">Avg Sync Time:</span>
          <span className="font-medium">5 min</span>
        </p>
      </div>
      {/* System Performance - one card for all domains */}
      <div className="p-6 rounded-xl shadow-md hover:shadow-lg transition md:col-span-2">
        <SystemPerformance />
      </div>
    </div>
  );
}
