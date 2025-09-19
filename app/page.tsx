import PageHeader from "./components/PageHeader";
import ForestCard from "./components/ForestCard";
import SitesCard from "./components/SitesCard";

export default async function LandingPage() {
  return (
    <main className="min-h-screen bg-[#F3F6FA] text-gray-800">
      {/* Page Wrapper */}
      <div className="max-w-screen-2xl mx-auto px-4 py-6 space-y-8">
        {/* Page Header */}
        <PageHeader />

        {/* Dashboard Content */}
        <section className="grid grid-cols-1 gap-6">
          <ForestCard />
          <SitesCard />
        </section>
      </div>
    </main>
  );
}
