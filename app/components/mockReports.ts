// mockReports.ts

export type HealthReport = {
  id: number;
  status: string;
  date: string;
  passed: number;
  failed: number;
};

export const fetchReports = async (): Promise<HealthReport[]> => {
  const res = await fetch(
    "https://my-json-server.typicode.com/lingueeni/my-dashboard-data/reports"
  );
  if (!res.ok) {
    throw new Error("Failed to fetch reports");
  }
  return res.json();
};
