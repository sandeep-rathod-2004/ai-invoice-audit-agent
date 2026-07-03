export default function LoadingSpinner() {

  return (

    <div className="flex flex-col items-center justify-center py-20">

      <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>

      <h2 className="mt-8 text-2xl font-bold">

        🤖 AI Agents are analyzing your invoice...

      </h2>

      <p className="text-slate-400 mt-3">

        Extracting • Parsing • Validating • Reporting

      </p>

    </div>

  );

}