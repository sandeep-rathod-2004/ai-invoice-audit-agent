export default function Header() {
  return (
    <div className="text-center py-10 px-4">

      <div className="inline-flex items-center gap-3 bg-cyan-500/10 border border-cyan-400/20 rounded-full px-5 py-2 mb-6">

        <span className="text-2xl">🤖</span>

        <span className="text-cyan-300 font-semibold">
          AI Powered Document Intelligence
        </span>

      </div>

      <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">

        AI Invoice Audit Agent

      </h1>

      <p className="text-slate-300 mt-5 text-xl max-w-3xl mx-auto leading-relaxed">

        Multi-Agent RAG Powered Invoice Compliance & Validation System using LangChain, Google Gemini, FAISS and FastAPI.

      </p>

    </div>
  );
}