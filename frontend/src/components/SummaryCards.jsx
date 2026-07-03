export default function SummaryCards({
  total,
  valid,
  invalid,
  executionTime,
}) {
  const cards = [
    {
      title: "Total Invoices",
      value: total,
      color: "text-cyan-400",
      icon: "📄",
    },
    {
      title: "Valid",
      value: valid,
      color: "text-green-400",
      icon: "✅",
    },
    {
      title: "Invalid",
      value: invalid,
      color: "text-red-400",
      icon: "❌",
    },
    {
      title: "Execution",
      value: executionTime,
      color: "text-yellow-400",
      icon: "⏱️",
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-5 mt-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-slate-900 border border-slate-700 rounded-2xl p-5"
        >
          <div className="text-3xl">{card.icon}</div>

          <h3 className="mt-4 text-slate-400 text-sm">
            {card.title}
          </h3>

          <p className={`text-3xl font-bold mt-2 ${card.color}`}>
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}