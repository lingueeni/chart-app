import HealthReportsTable from "../components/HealthReportsTable";
import Image from "next/image";

export default function ReportsPage() {
  return (
    <section className="bg-white p-8 rounded-2xl shadow-md">
      <header className="mb-6">
        <h1 className="text-3xl font-oswald font-bold text-[#0078D4] flex items-center gap-2">
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
    </section>
  );
}
