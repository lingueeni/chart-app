"use client";

import { useState } from "react";

interface Domain {
  name: string;
  osVersion: number;
  upTime: { [key: string]: string }[];
}

interface ForestInfo {
  forestName: string;
  domainName: string;
  forestFunctionLevel: string;
  domainFunctionLevel: string;
  schemaVersion: string;
  recycleBin: boolean;
  fsmoRole: string;
  domains: Domain[];
}

export default function ForestCard() {
  const [selectedDomain, setSelectedDomain] = useState<string>("");

  const forestData: ForestInfo = {
    forestName: "ContosoForest",
    domainName: "contoso.local",
    forestFunctionLevel: "Windows Server 2016",
    domainFunctionLevel: "Windows Server 2016",
    schemaVersion: "87",
    recycleBin: true,
    fsmoRole: "RID Master",
    domains: [
      {
        name: "contoso.local",
        osVersion: 2019,
        upTime: [{ Days: "15" }, { Hours: "12" }, { Minutes: "45" }],
      },
      {
        name: "hr.contoso.local",
        osVersion: 2016,
        upTime: [{ Days: "32" }, { Hours: "8" }, { Minutes: "5" }],
      },
    ],
  };

  const selectedDomainData = forestData.domains.find(
    (d) => d.name === selectedDomain
  );

  return (
    <div className="bg-gradient-to-br from-[#141627] to-[#1c1f36] p-6 rounded-2xl shadow-lg hover:shadow-indigo-500/40 transition-shadow duration-300">
      <h2 className="text-xl font-semibold mb-4 text-gray-200">Forest Info</h2>
      <table className="w-full text-left text-gray-300">
        <tbody>
          <tr>
            <td className="py-2 font-medium">Forest Name</td>
            <td className="py-2">{forestData.forestName}</td>
          </tr>
          <tr>
            <td className="py-2 font-medium">Domain Name</td>
            <td className="py-2">
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="bg-[#1c1f36] border border-gray-600 text-gray-200 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Select Domain --</option>
                {forestData.domains.map((domain, idx) => (
                  <option key={idx} value={domain.name}>
                    {domain.name}
                  </option>
                ))}
              </select>
            </td>
          </tr>

          {selectedDomainData && (
            <tr>
              <td colSpan={2} className="py-3">
                <div className="bg-[#1c1f36] p-4 rounded-lg border border-gray-700">
                  <h3 className="text-gray-200 font-semibold mb-2">
                    {selectedDomainData.name}
                  </h3>
                  <p className="text-sm text-gray-300">
                    <span className="font-medium">OS Version:</span>{" "}
                    {selectedDomainData.osVersion}
                  </p>
                  <p className="text-sm text-gray-300 mt-2">
                    <span className="font-medium">UpTime:</span>{" "}
                    {selectedDomainData.upTime.map((item, i) => {
                      const key = Object.keys(item)[0];
                      return (
                        <span key={i} className="mr-2">
                          {key}: {item[key]}
                        </span>
                      );
                    })}
                  </p>
                </div>
              </td>
            </tr>
          )}

          <tr>
            <td className="py-2 font-medium">Forest Function Level</td>
            <td className="py-2">{forestData.forestFunctionLevel}</td>
          </tr>
          <tr>
            <td className="py-2 font-medium">Domain Function Level</td>
            <td className="py-2">{forestData.domainFunctionLevel}</td>
          </tr>
          <tr>
            <td className="py-2 font-medium">Schema Version</td>
            <td className="py-2">{forestData.schemaVersion}</td>
          </tr>
          <tr>
            <td className="py-2 font-medium">Recycle Bin</td>
            <td className="py-2">{forestData.recycleBin ? "True" : "False"}</td>
          </tr>
          <tr>
            <td className="py-2 font-medium">FSMO Role</td>
            <td className="py-2">{forestData.fsmoRole}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
