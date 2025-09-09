interface Row {
  id: number;
  col1: string;
  col2: string;
}

interface ExtraTableProps {
  rows: Row[];
}

export default function ExtraTable({ rows }: ExtraTableProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Domain Controllers
      </h2>
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="px-4 py-3 border-b">Name</th>
            <th className="px-4 py-3 border-b">Health Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            const statusColor =
              row.col2 === "Healthy"
                ? "text-green-600 font-semibold"
                : row.col2 === "Critical"
                ? "text-red-600 font-semibold"
                : "text-gray-700";

            return (
              <tr
                key={row.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-blue-50 transition-colors`}
              >
                <td className="px-4 py-3 border-b border-gray-200 text-gray-700">
                  {row.col1}
                </td>
                <td
                  className={`px-4 py-3 border-b border-gray-200 ${statusColor}`}
                >
                  {row.col2}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
