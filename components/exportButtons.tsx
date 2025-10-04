"use client";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { fetchReports, HealthReport } from "./mockReports";
import { useEffect, useState } from "react";

export default function ExportToAll() {
  const [data, setData] = useState<HealthReport[]>([]);

  // Load mock data
  useEffect(() => {
    fetchReports().then(setData);
  }, []);

  // Export CSV
  const exportCSV = () => {
    const headers = [
      "Generation Date",
      "Health Status",
      "Tests Passed",
      "Tests Failed",
    ];
    const rows = data.map((row) => [
      row.date,
      row.status,
      row.passed,
      row.failed,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "health_reports.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Health Reports", 14, 15);

    autoTable(doc, {
      startY: 20,
      head: [
        ["Generation Date", "Health Status", "Tests Passed", "Tests Failed"],
      ],
      body: data.map((row) => [row.date, row.status, row.passed, row.failed]),
      styles: {
        fontSize: 10,
        cellPadding: 4,
        valign: "middle",
        halign: "center",
      },
      headStyles: {
        fillColor: [0, 120, 212], // Tailwind blue
        textColor: 255,
        fontStyle: "bold",
      },
      bodyStyles: {
        textColor: [55, 65, 81],
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240],
      },
    });

    doc.save("health_reports.pdf");
  };

  // Export XLSX
  const exportXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((row) => ({
        "Generation Date": row.date,
        "Health Status": row.status,
        "Tests Passed": row.passed,
        "Tests Failed": row.failed,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Health Reports");

    XLSX.writeFile(workbook, "health_reports.xlsx");
  };

  return (
    <div className="flex gap-2 px-6 py-4 border-b border-gray-200 bg-gray-50">
      <button
        onClick={exportCSV}
        className="px-3 py-1 bg-[#0078D4] hover:bg-[#005a9e] text-white text-sm rounded"
      >
        Export CSV
      </button>
      <button
        onClick={exportPDF}
        className="px-3 py-1 bg-[#28a745] hover:bg-[#1e7e34] text-white text-sm rounded"
      >
        Export PDF
      </button>
      <button
        onClick={exportXLSX}
        className="px-3 py-1 bg-[#f59e0b] hover:bg-[#d97706] text-white text-sm rounded"
      >
        Export XLSX
      </button>
    </div>
  );
}
