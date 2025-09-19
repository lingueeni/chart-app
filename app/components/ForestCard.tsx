"use client";

interface Domain {
  name: string;
  osVersion: string;
  upTime: { [key: string]: string }[];
}

interface ForestInfo {
  forestName: string;
  domainName: string;
  forestFunctionLevel: string;
  domainFunctionLevel: string;
  schemaVersion: string;
  recycleBin: string;
  fsmoRoles: {
    schemaMaster: string;
    domainNamingMaster: string;
    pdcEmulator: string;
    ridMaster: string;
    infrastructureMaster: string;
  };
  domains: Domain[];
}

export default function ForestCard() {
  const forestData: ForestInfo = {
    forestName: "ContosoForest",
    domainName: "contoso.local",
    forestFunctionLevel: "Windows Server 2016",
    domainFunctionLevel: "Windows Server 2016",
    schemaVersion: "87",
    recycleBin: "Enabled",
    fsmoRoles: {
      schemaMaster: "DC1.contoso.local",
      domainNamingMaster: "DC1.contoso.local",
      pdcEmulator: "DC2.contoso.local",
      ridMaster: "DC2.contoso.local",
      infrastructureMaster: "DC3.contoso.local",
    },
    domains: [
      {
        name: "contoso.local",
        osVersion: "Windows Server 2012 R2",
        upTime: [{ Days: "15" }, { Hours: "12" }, { Minutes: "45" }],
      },
      {
        name: "hr.contoso.local",
        osVersion: "Windows Server 2019",
        upTime: [{ Days: "32" }, { Hours: "8" }, { Minutes: "5" }],
      },
    ],
  };

  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-md border border-gray-200">
      {/* Title */}
      <h2 className="font-poppins text-2xl font-bold text-[#00A4EF] mb-6">
        Forest and Domain Controller Info
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-base text-gray-800 border border-gray-200 rounded-lg">
          <tbody>
            {/* Forest Name */}
            <tr className="border-b border-gray-200">
              <td className="px-4 py-3 text-gray-500 w-1/2">Forest Name</td>
              <td className="px-4 py-3 font-medium">{forestData.forestName}</td>
            </tr>

            {/* Domains nested table */}
            <tr className="border-b border-gray-200">
              <td colSpan={2} className="px-4 py-3">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm border border-gray-200 rounded-lg">
                    <thead>
                      <tr className="bg-[#00A4EF]/10 text-[#004578]">
                        <th className="px-4 py-2">Domain</th>
                        <th className="px-4 py-2">OS Version</th>
                        <th className="px-4 py-2">UpTime</th>
                      </tr>
                    </thead>
                    <tbody>
                      {forestData.domains.map((domain, i) => (
                        <tr
                          key={i}
                          className={`${
                            i % 2 === 0 ? "bg-[#FFB900]/10" : "bg-[#7FBA00]/10"
                          } hover:bg-[#F25022]/10 transition-colors`}
                        >
                          <td className="px-3 py-2 font-medium">
                            {domain.name}
                          </td>
                          <td
                            className={`px-3 py-2 font-medium ${
                              domain.osVersion.includes("2012")
                                ? "text-[#F25022]"
                                : "text-[#1F2937]"
                            }`}
                          >
                            {domain.osVersion}
                          </td>
                          <td className="px-3 py-2 text-gray-700">
                            {domain.upTime.map((u, j) => {
                              const key = Object.keys(u)[0];
                              return (
                                <span key={j} className="mr-3">
                                  {key}: {u[key]}
                                </span>
                              );
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>

            {/* Forest info */}
            <tr className="border-b border-gray-200">
              <td className="px-4 py-3 text-gray-500">Forest Function Level</td>
              <td className="px-4 py-3 font-medium ">
                {forestData.forestFunctionLevel}
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="px-4 py-3 text-gray-500">Domain Function Level</td>
              <td className="px-4 py-3 font-medium ">
                {forestData.domainFunctionLevel}
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="px-4 py-3 text-gray-500">Schema Version</td>
              <td className="px-4 py-3 font-medium">
                {forestData.schemaVersion}
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="px-4 py-3 text-gray-500">Recycle Bin</td>
              <td className="px-4 py-3 font-medium ">
                {forestData.recycleBin}
              </td>
            </tr>

            {/* FSMO Roles */}
            <tr className="border-b border-gray-200">
              <td className="px-4 py-3 text-gray-500">Schema Master</td>
              <td className="px-4 py-3 font-medium">
                {forestData.fsmoRoles.schemaMaster}
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="px-4 py-3 text-gray-500">Domain Naming Master</td>
              <td className="px-4 py-3 font-medium">
                {forestData.fsmoRoles.domainNamingMaster}
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="px-4 py-3 text-gray-500">PDC Emulator</td>
              <td className="px-4 py-3 font-medium ">
                {forestData.fsmoRoles.pdcEmulator}
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="px-4 py-3 text-gray-500">RID Master</td>
              <td className="px-4 py-3 font-medium ">
                {forestData.fsmoRoles.ridMaster}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-gray-500">Infrastructure Master</td>
              <td className="px-4 py-3 font-medium ">
                {forestData.fsmoRoles.infrastructureMaster}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
