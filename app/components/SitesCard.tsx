"use client";

interface Site {
  id: number;
  name: string;
  link: string;
  replicationTopology: string;
  fsmoCount: number;
}

export default function SitesCard() {
  const sites: Site[] = [
    {
      id: 1,
      name: "HQ-Site",
      link: "hq-link",
      replicationTopology: "Ring",
      fsmoCount: 5,
    },
    {
      id: 2,
      name: "Branch-Site",
      link: "branch-link",
      replicationTopology: "Hub-Spoke",
      fsmoCount: 2,
    },
    {
      id: 3,
      name: "Remote-Site",
      link: "remote-link",
      replicationTopology: "Mesh",
      fsmoCount: 1,
    },
    {
      id: 4,
      name: "Test-Site",
      link: "test-link",
      replicationTopology: "Ring",
      fsmoCount: 0,
    },
    {
      id: 5,
      name: "Lab-Site",
      link: "lab-link",
      replicationTopology: "Hub-Spoke",
      fsmoCount: 3,
    },
    {
      id: 6,
      name: "DR-Site",
      link: "dr-link",
      replicationTopology: "Mesh",
      fsmoCount: 4,
    },
    {
      id: 7,
      name: "Backup-Site",
      link: "backup-link",
      replicationTopology: "Ring",
      fsmoCount: 2,
    },
  ];

  return (
    <div className="w-full bg-[#221E33] p-6 rounded-xl shadow-md hover:shadow-[0_0_20px_3px_rgba(99,102,241,0.4)] transition-shadow duration-300">
      <h2 className="font-poppins text-2xl font-bold text-indigo-400 mb-6">
        Sites
      </h2>

      {/* Table */}
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full text-base text-gray-300 border-collapse">
          <thead>
            <tr className="bg-[#24283d] text-gray-200">
              <th className="font-inter px-4 py-3 text-left">Name</th>
              <th className="font-inter px-4 py-3 text-left">Link</th>
              <th className="font-inter px-4 py-3 text-left">
                Replication Topology
              </th>
              <th className="font-inter px-4 py-3 text-left">FSMO Holders</th>
            </tr>
          </thead>
          <tbody>
            {sites.map((site, i) => (
              <tr
                key={site.id}
                className={`${
                  i % 2 === 0 ? "bg-[#1c1f2e]" : "bg-[#141627]"
                } hover:bg-indigo-900/30`}
              >
                <td className="font-roboto px-4 py-3 whitespace-nowrap">
                  {site.name}
                </td>
                <td className="font-roboto px-4 py-3 whitespace-nowrap">
                  {site.link}
                </td>
                <td className="font-roboto px-4 py-3 whitespace-nowrap">
                  {site.replicationTopology}
                </td>
                <td
                  className={`font-roboto px-4 py-3 whitespace-nowrap font-semibold ${
                    site.fsmoCount === 0 ? "text-red-500" : "text-indigo-400"
                  }`}
                >
                  {site.fsmoCount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* External Chart Component */}
    </div>
  );
}
