interface CardItemProps {
  title: string;
  value: number | string;
  color: string;
}

export default function CardItem({ title, value, color }: CardItemProps) {
  return (
    <div
      className={`${color} text-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow text-center`}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
