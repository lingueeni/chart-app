import PageHeader from "./components/PageHeader";
import ForestCard from "./components/ForestCard";
import SitesCard from "./components/SitesCard";

export default async function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-200 px-2 py-2">
      <div className="max-w-screen-2xl mx-auto space-y-8 px-4">
        <PageHeader />

        <div className="grid grid-cols-1 gap-6">
          <ForestCard />
          <SitesCard />
        </div>
      </div>
    </div>
  );
}
