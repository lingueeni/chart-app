"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchReports, HealthReport } from "./mockReports";
import ADXLoadingScreen from "./ADXLoadingScreen"; // ✅ Import loading component

export default function HealthReportsTable() {
  const [data, setData] = useState<HealthReport[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchReports().then(setData);
  }, []);

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((row) => row.id !== id));
  };

  const handleView = () => {
    router.push("/");
  };

  const handleRunADX = () => {
    setLoading(true);
  };

  if (loading) {
    return <ADXLoadingScreen />;
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Header */}
      <div className="relative px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Health Reports</h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-700 uppercase text-sm tracking-wide">
              <th className="px-6 py-3 text-left font-semibold">
                Generation Date
              </th>
              <th className="px-6 py-3 text-left font-semibold">
                Health Status
              </th>
              <th className="px-6 py-3 text-left font-semibold">
                Tests Passed
              </th>
              <th className="px-6 py-3 text-left font-semibold">
                Tests Failed
              </th>
              <th className="px-6 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              const isHealthy = row.status.toLowerCase() === "healthy";
              return (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50 transition-colors border-b border-gray-100"
                >
                  <td className="px-6 py-4 text-gray-800">{row.date}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center text-sm font-semibold ${
                        isHealthy ? "text-[#107C10]" : "text-[#D13438]"
                      }`}
                    >
                      <span
                        className={`w-2.5 h-2.5 rounded-full mr-2 ${
                          isHealthy ? "bg-[#107C10]" : "bg-[#D13438]"
                        }`}
                      ></span>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-800">{row.passed}</td>
                  <td className="px-6 py-4 text-gray-800">{row.failed}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={handleView}
                      className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(row.id)}
                      className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}

            {data.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-4 text-center text-gray-500 italic"
                >
                  No reports available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Run ADX Button */}
      <div className="flex justify-center py-6">
        <button
          onClick={handleRunADX}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-base rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          Run ADX
        </button>
      </div>
    </div>
  );
}
