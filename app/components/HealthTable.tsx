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
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">General</h2>
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th colSpan={2} className="px-4 py-3 border-b text-left text-2xl">
              General
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={row.id}
              className={`${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-blue-50 transition-colors`}
            >
              <td className="px-4 py-3 border-b border-gray-200 text-gray-700 font-medium">
                {row.general1}
              </td>
              <td className="px-4 py-3 border-b border-gray-200 text-gray-700 font-medium">
                {row.general2}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
