export default function Footer() {

  return (

    <div className="mt-14 border-t border-slate-800 py-8 text-center">

      <p className="text-slate-400">

        Built with

      </p>

      <div className="flex flex-wrap justify-center gap-3 mt-4">

        {[
          "React",
          "FastAPI",
          "LangChain",
          "Google Gemini",
          "Sentence Transformers",
          "FAISS",
          "RAG",
          "AI Agents",
        ].map((tech) => (

          <span
            key={tech}
            className="bg-slate-800 px-4 py-2 rounded-full text-sm border border-slate-700"
          >
            {tech}
          </span>

        ))}

      </div>

      <p className="mt-8 text-slate-500 text-sm">

        © 2026 AI Invoice Audit Agent

      </p>

    </div>

  );

}