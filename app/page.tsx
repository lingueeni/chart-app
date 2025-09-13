"use client";

import { useEffect, useState } from "react";
import PageHeader from "./components/PageHeader";
import HealthForm from "./components/HealthForm";
import HealthTable from "./components/HealthTable";
import PieChartCard from "./components/ChartCard";
import CardItem from "./components/CardItem";
import ExtraTable from "./components/ExtraTable";

export default function LandingPage() {
  const [charts, setCharts] = useState<any[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);
  const [cards, setCards] = useState<any[]>([]);
  const [extraTable, setExtraTable] = useState<any[]>([]);

  useEffect(() => {
    fetch(
      "https://my-json-server.typicode.com/lingueeni/my-dashboard-data/charts"
    )
      .then((res) => res.json())
      .then((data) => setCharts(data));

    fetch(
      "https://my-json-server.typicode.com/lingueeni/my-dashboard-data/tableData"
    )
      .then((res) => res.json())
      .then((data) => setTableData(data));

    fetch(
      "https://my-json-server.typicode.com/lingueeni/my-dashboard-data/cards"
    )
      .then((res) => res.json())
      .then((data) => setCards(data));

    fetch(
      "https://my-json-server.typicode.com/lingueeni/my-dashboard-data/extraTable"
    )
      .then((res) => res.json())
      .then((data) => setExtraTable(data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4 py-10">
      <div className="max-w-7xl mx-auto space-y-12">
        <PageHeader />

        <HealthForm />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <HealthTable rows={tableData.slice(0, 6)} />

          <PieChartCard title="Users vs Admins" data={charts.slice(0, 2)} />
          <PieChartCard title="Active vs Inactive" data={charts.slice(2, 4)} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {cards.map((card) => (
            <CardItem
              key={card.id}
              title={card.title}
              value={card.value}
              color={card.color}
            />
          ))}
        </div>

        <ExtraTable rows={extraTable} />
      </div>
    </div>
  );
}
