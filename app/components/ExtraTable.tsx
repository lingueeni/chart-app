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
    <div className="bg-gradient-to-br from-[#141627] to-[#1c1f36] p-6 rounded-2xl shadow-lg hover:shadow-[0_0_20px_3px_rgba(56,189,248,0.4)] transition-shadow duration-300">
      <h2 className="text-xl font-semibold mb-4 text-gray-200">
        Domain Controllers
      </h2>
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-[#1f2238] text-gray-300">
            <th className="px-4 py-3 border-b border-gray-700">Name</th>
            <th className="px-4 py-3 border-b border-gray-700">
              Health Status
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            const statusColor =
              row.col2 === "Healthy"
                ? "text-green-400 font-semibold"
                : row.col2 === "Critical"
                ? "text-red-400 font-semibold"
                : "text-gray-300";

            return (
              <tr
                key={row.id}
                className={`${
                  index % 2 === 0 ? "bg-[#1a1c2e]" : "bg-[#1f2238]"
                } hover:bg-[#2a2d4a] transition-colors`}
              >
                <td className="px-4 py-3 border-b border-gray-700 text-gray-200">
                  {row.col1}
                </td>
                <td
                  className={`px-4 py-3 border-b border-gray-700 ${statusColor}`}
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
