import ReactMarkdown from "react-markdown";

export default function ResultCard({ result }) {

  const downloadReport = () => {

    const blob = new Blob([result], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "AI_Invoice_Report.txt";

    a.click();

    URL.revokeObjectURL(url);

  };

  return (

    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-3xl font-semibold">
          Validation Results
        </h2>

        {result && (

          <button
            onClick={downloadReport}
            className="bg-cyan-500 hover:bg-cyan-600 transition px-5 py-2 rounded-lg font-semibold"
          >
            ⬇ Download
          </button>

        )}

      </div>

      <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 min-h-[500px] overflow-auto">

        {!result ? (

          <div className="flex justify-center items-center h-full text-slate-500 text-lg">

            Upload a PDF invoice to begin analysis.

          </div>

        ) : (

          <article className="prose prose-invert max-w-none">

            <ReactMarkdown
              components={{

                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold text-cyan-400 mb-6">
                    {children}
                  </h1>
                ),

                h2: ({ children }) => (
                  <h2 className="text-2xl font-semibold text-cyan-300 mt-8 mb-4 border-b border-slate-700 pb-2">
                    {children}
                  </h2>
                ),

                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold text-white mt-6 mb-3">
                    {children}
                  </h3>
                ),

                strong: ({ children }) => (
                  <strong className="text-cyan-300">
                    {children}
                  </strong>
                ),

                p: ({ children }) => (
                  <p className="leading-8 text-slate-200 mb-3">
                    {children}
                  </p>
                ),

                ul: ({ children }) => (
                  <ul className="list-disc ml-6 my-3 text-slate-200">
                    {children}
                  </ul>
                ),

                ol: ({ children }) => (
                  <ol className="list-decimal ml-6 my-3 text-slate-200">
                    {children}
                  </ol>
                ),

                li: ({ children }) => (
                  <li className="mb-2">
                    {children}
                  </li>
                ),

                hr: () => (
                  <hr className="border-slate-700 my-6" />
                ),

                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-cyan-400 pl-4 italic text-slate-300 my-4">
                    {children}
                  </blockquote>
                ),

                code: ({ children }) => (
                  <code className="bg-slate-800 px-2 py-1 rounded text-cyan-300">
                    {children}
                  </code>
                ),

              }}
            >
              {result}
            </ReactMarkdown>

          </article>

        )}

      </div>

    </div>

  );

}