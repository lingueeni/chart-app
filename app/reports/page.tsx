import HealthForm from "../components/HealthForm";

export default function ReportsPage() {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-[0_0_20px_3px_rgba(56,189,248,0.4)] transition-shadow duration-300">
      <h1 className="text-3xl font-bold text-blue-500 mb-6">📊 Reports</h1>
      <HealthForm />
    </div>
  );
}
