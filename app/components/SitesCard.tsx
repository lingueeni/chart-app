"use client";

interface Site {
  id: number;
  name: string;
  link: string;
  replication: string;
  topology: string;
}

export default function SitesCard() {
  // Example data
  const sites: Site[] = [
    {
      id: 1,
      name: "HQ-Site",
      link: "hq-link",
      replication: "Enabled",
      topology: "Ring",
    },
    {
      id: 2,
      name: "Branch-Site",
      link: "branch-link",
      replication: "Enabled",
      topology: "Hub-Spoke",
    },
    {
      id: 3,
      name: "Remote-Site",
      link: "remote-link",
      replication: "Disabled",
      topology: "Mesh",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-[#141627] to-[#1c1f36] p-6 rounded-2xl shadow-lg hover:shadow-indigo-500/40 transition-shadow duration-300 w-full max-w-5xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-200">Sites</h2>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse text-left">
          <thead>
            <tr className="bg-[#1f2238] text-gray-300 text-sm">
              <th className="px-4 py-3 border-b border-gray-700 w-1/4">Name</th>
              <th className="px-4 py-3 border-b border-gray-700 w-1/4">Link</th>
              <th className="px-4 py-3 border-b border-gray-700 w-1/4">
                Replication
              </th>
              <th className="px-4 py-3 border-b border-gray-700 w-1/4">
                Topology
              </th>
            </tr>
          </thead>
          <tbody>
            {sites.map((site, index) => (
              <tr
                key={site.id}
                className={`${
                  index % 2 === 0 ? "bg-[#1a1d33]" : "bg-[#141627]"
                } hover:bg-indigo-900/30 transition-colors`}
              >
                <td className="px-4 py-3 border-b border-gray-700 text-gray-200">
                  {site.name}
                </td>
                <td className="px-4 py-3 border-b border-gray-700 text-gray-200">
                  {site.link}
                </td>
                <td
                  className={`px-4 py-3 border-b border-gray-700 ${
                    site.replication === "Enabled"
                      ? "text-green-400 font-semibold"
                      : "text-red-400 font-semibold"
                  }`}
                >
                  {site.replication}
                </td>
                <td className="px-4 py-3 border-b border-gray-700 text-gray-200">
                  {site.topology}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
