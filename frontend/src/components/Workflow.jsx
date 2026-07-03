const steps = [
  "Extract PDF",
  "Clean Text",
  "Parse Invoice",
  "Retrieve Rules",
  "Validate",
  "Generate Report",
];

export default function Workflow() {
  return (
    <div className="mt-10">

      <h2 className="text-2xl font-bold mb-6">
        AI Workflow
      </h2>

      <div className="grid md:grid-cols-3 gap-4">

        {steps.map((step, index) => (
          <div
            key={step}
            className="bg-slate-900 border border-slate-700 rounded-xl p-5 flex items-center gap-4 hover:border-cyan-500 transition"
          >
            <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center font-bold">
              {index + 1}
            </div>

            <span className="text-lg">
              {step}
            </span>
          </div>
        ))}

      </div>

    </div>
  );
}