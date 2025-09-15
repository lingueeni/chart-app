interface Row {
  id: number;
  general1: string;
  general2: string;
}

interface HealthTableProps {
  rows: Row[];
}

export default function HealthTable({ rows }: HealthTableProps) {
  return (
    <div className="bg-[#1c1f36] p-6 rounded-2xl shadow-lg border border-gray-700 hover:shadow-[0_0_20px_3px_rgba(56,189,248,0.4)] transition-shadow duration-300">
      <h2 className="text-xl font-semibold mb-4 text-white">General</h2>
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-[#2a2d45] text-gray-200">
            <th
              colSpan={2}
              className="px-4 py-3 border-b border-gray-600 text-left text-lg font-semibold"
            >
              General
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={row.id}
              className={`${
                index % 2 === 0 ? "bg-[#1c1f36]" : "bg-[#242845]"
              } hover:bg-[#323659] transition-colors`}
            >
              <td className="px-4 py-3 border-b border-gray-700 text-gray-300 font-medium">
                {row.general1}
              </td>
              <td className="px-4 py-3 border-b border-gray-700 text-gray-300 font-medium">
                {row.general2}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
