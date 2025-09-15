import { Key } from "react";
import PageHeader from "./components/PageHeader";
import HealthTable from "./components/HealthTable";
import PieChartCard from "./components/ChartCard";
import CardItem from "./components/CardItem";
import ExtraTable from "./components/ExtraTable";

async function getData(endpoint: string) {
  const res = await fetch(
    `https://my-json-server.typicode.com/lingueeni/my-dashboard-data/${endpoint}`,
    { cache: "no-store" } // always fresh data
  );
  if (!res.ok) throw new Error("Failed to fetch " + endpoint);
  return res.json();
}

export default async function LandingPage() {
  const charts = await getData("charts");
  const tableData = await getData("tableData");
  const cards = await getData("cards");
  const extraTable = await getData("extraTable");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1120] via-[#1a1c2c] to-[#0f1120] text-gray-200 px-4 py-10">
      <div className="max-w-7xl mx-auto space-y-12">
        <PageHeader />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <HealthTable rows={tableData.slice(0, 6)} />

          <PieChartCard title="Users vs Admins" data={charts.slice(0, 2)} />
          <PieChartCard title="Active vs Inactive" data={charts.slice(2, 4)} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {cards.map(
            (card: {
              id: Key | null | undefined;
              title: string;
              value: string | number;
              color: string;
            }) => (
              <CardItem
                key={card.id}
                title={card.title}
                value={card.value}
                color={card.color}
              />
            )
          )}
        </div>

        <ExtraTable rows={extraTable} />
      </div>
    </div>
  );
}
