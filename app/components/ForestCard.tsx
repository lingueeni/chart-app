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
  fsmoRole: string;
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
    fsmoRole: "Schema Master",
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
    <div className="w-full bg-[#221E33] p-6 rounded-xl shadow-md hover:shadow-[0_0_20px_3px_rgba(99,102,241,0.4)] transition-shadow duration-300">
      <h2 className="font-poppins text-2xl font-bold text-indigo-400 mb-6">
        Forest and Domain Controller Info
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-base text-gray-300 border-collapse">
          <tbody>
            <tr className="border-b border-gray-700">
              <td className="px-3 py-3 text-gray-400 w-1/2">Forest Name</td>
              <td className="px-3 py-3">{forestData.forestName}</td>
            </tr>

            <tr className="border-b border-gray-700">
              <td colSpan={2} className="px-3 py-3">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-gray-300 text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#24283d] text-gray-200">
                        <th className="font-inter text-sm text-gray-200 px-3 py-2">
                          Domain
                        </th>
                        <th className="font-inter text-sm text-gray-200 px-3 py-2">
                          OS Version
                        </th>
                        <th className="font-inter text-sm text-gray-200 px-3 py-2">
                          UpTime
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {forestData.domains.map((domain, i) => (
                        <tr
                          key={i}
                          className={`${
                            i % 2 === 0 ? "bg-[#1c1f2e]" : "bg-[#141627]"
                          } hover:bg-indigo-900/30`}
                        >
                          <td className="font-roboto px-3 py-2 whitespace-nowrap">
                            {domain.name}
                          </td>
                          <td
                            className={`font-roboto px-3 py-2 whitespace-nowrap ${
                              domain.osVersion === "Windows Server 2012 R2"
                                ? "text-red-500 font-semibold"
                                : " font-semibold"
                            }`}
                          >
                            {domain.osVersion}
                          </td>
                          <td className="font-roboto px-3 py-2 whitespace-nowrap">
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

            <tr className="border-b border-gray-700">
              <td className="px-3 py-3 text-gray-400">Forest Function Level</td>
              <td className="px-3 py-3">{forestData.forestFunctionLevel}</td>
            </tr>
            <tr className="border-b border-gray-700">
              <td className="px-3 py-3 text-gray-400">Domain Function Level</td>
              <td className="px-3 py-3">{forestData.domainFunctionLevel}</td>
            </tr>
            <tr className="border-b border-gray-700">
              <td className="px-3 py-3 text-gray-400">Schema Version</td>
              <td className="px-3 py-3">{forestData.schemaVersion}</td>
            </tr>
            <tr className="border-b border-gray-700">
              <td className="px-3 py-3 text-gray-400">Recycle Bin</td>
              <td className="px-3 py-3">{forestData.recycleBin}</td>
            </tr>
            <tr>
              <td className="px-3 py-3 text-gray-400">FSMO Role</td>
              <td className="px-3 py-3">{forestData.fsmoRole}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
