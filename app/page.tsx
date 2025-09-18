import PageHeader from "./components/PageHeader";
import ForestCard from "./components/ForestCard";
import SitesCard from "./components/SitesCard";
import SitesChart from "./components/SitesChart";

export default async function LandingPage() {
  // You can fetch sites data here (SSR) or hardcode it
  const sites = [
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
    <div className="min-h-screen bg-[#181523] text-gray-200 px-2 py-2">
      <div className="max-w-screen-2xl mx-auto space-y-8 px-4">
        <PageHeader />

        <div className="grid grid-cols-1 gap-6">
          <ForestCard />
          <SitesCard />
        </div>

        {/* Line Chart Below SitesCard */}
        <div className="bg-[#221E33] p-6 rounded-xl shadow-md hover:shadow-[0_0_20px_3px_rgba(99,102,241,0.4)] transition-shadow duration-300">
          <h2 className="font-poppins text-2xl font-bold text-indigo-400 mb-4">
            FSMO Holders Overview
          </h2>
          <SitesChart sites={sites} />
        </div>
      </div>
    </div>
  );
}
