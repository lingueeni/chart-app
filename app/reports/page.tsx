import HealthReportsTable from "@/components/HealthReportsTable";
import SystemTrends from "@/components/SystemTrends";
import Image from "next/image";

export default function ReportsPage() {
  return (
    <section className="bg-white p-8 rounded-2xl shadow-md">
      <header className="mb-6">
        <h1 className="text-3xl font-oswald font-bold text-gray-900 flex items-center gap-2">
          <Image
            src="/reports.svg"
            alt="Reports"
            width={28}
            height={28}
            className="opacity-90"
          />
          Reports
        </h1>
      </header>
      <HealthReportsTable />
      <SystemTrends />
    </section>
  );
}
