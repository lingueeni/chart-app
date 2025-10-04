import PageHeader from "../components/PageHeader";
import ForestCard from "../components/ForestCard";
import SitesCard from "../components/SitesCard";
import InstalledRolesCard from "../components/InstalledRolesCard";
import GeneralHealthCard from "../components/GeneralHealthCard";
import StatCards from "../components/headercards";
import SecurityPrivilegedCard from "../components/SecurityPrivilegedCard";
import UsersTable from "@/components/UsersTable";

export default async function LandingPage() {
  return (
    <main className="min-h-screen bg-[#F3F6FA] text-gray-800">
      <div className="max-w-screen-2xl mx-auto px-4 py-6 space-y-8">
        <PageHeader />
        <StatCards />
        <section className="grid grid-cols-1 gap-6">
          <ForestCard />
          <SitesCard />
          <InstalledRolesCard />
          <GeneralHealthCard />
          <SecurityPrivilegedCard />
          <UsersTable />
        </section>
      </div>
    </main>
  );
}
