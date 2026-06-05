import { useState } from "react";

export default function App() {
  const [file, setFile] = useState(null);
  const [task, setTask] = useState("validate invoice compliance");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload a PDF invoice");
      return;
    }

    setLoading(true);
    setResult("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("task", task);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/invoice-agent",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      setResult(data.result);
    } catch (error) {
      console.error(error);
      alert("Error connecting to backend");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">

      {/* Header */}
      <div className="text-center py-10 px-4">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Agentic Invoice AI System
        </h1>

        <p className="text-slate-300 mt-4 text-lg">
          AI-powered invoice validation and compliance checking
        </p>
      </div>

      {/* Main Section */}
      <div className="max-w-7xl mx-auto px-6 pb-10">

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Upload Card */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

            <h2 className="text-3xl font-semibold mb-8">
              Upload Invoice
            </h2>

            {/* Upload Box */}
            <label className="border-2 border-dashed border-cyan-400 rounded-2xl p-12 flex flex-col items-center justify-center cursor-pointer hover:bg-cyan-500/10 transition-all duration-300">

              <div className="text-7xl mb-5">
                📄
              </div>

              <p className="text-xl font-medium text-center">
                {file ? file.name : "Click to Upload PDF Invoice"}
              </p>

              <p className="text-slate-400 mt-2 text-sm">
                PDF files supported
              </p>

              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>

            {/* Task Input */}
            <div className="mt-8">
              <label className="block mb-3 text-sm text-slate-300">
                Task Description
              </label>

              <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="w-full p-4 rounded-xl bg-slate-950 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white"
              />
            </div>

            {/* Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full mt-8 bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.02] transition-all duration-300 p-4 rounded-xl font-semibold text-lg shadow-lg disabled:opacity-70"
            >
              {loading ? "Analyzing Invoice..." : "Analyze Invoice"}
            </button>

            {/* Selected File */}
            {file && (
              <div className="mt-6 bg-slate-900 rounded-xl p-4 border border-slate-700">
                <p className="text-sm text-slate-300">
                  Selected File:
                </p>

                <p className="mt-1 font-medium text-cyan-400">
                  {file.name}
                </p>
              </div>
            )}

          </div>

          {/* Results Card */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

            <h2 className="text-3xl font-semibold mb-8">
              Validation Results
            </h2>

            {/* Result Box */}
            <div className="bg-slate-950 rounded-2xl p-6 min-h-[320px] border border-slate-800 overflow-auto">

              {result ? (
                <div className="space-y-3">

                  {result.split("\n").map((line, index) => {

                    let color = "text-slate-200";

                    if (line.toLowerCase().includes("valid")) {
                      color = "text-green-400";
                    }

                    if (
                      line.toLowerCase().includes("failed") ||
                      line.toLowerCase().includes("missing") ||
                      line.toLowerCase().includes("must")
                    ) {
                      color = "text-red-400";
                    }

                    return (
                      <p
                        key={index}
                        className={`text-lg leading-relaxed ${color}`}
                      >
                        {line}
                      </p>
                    );
                  })}

                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-500 text-lg">
                  Upload invoice and click Analyze to view AI results
                </div>
              )}

            </div>

            {/* AI Workflow */}
            <div className="mt-8">

              <h3 className="text-2xl font-semibold mb-5">
                AI Workflow
              </h3>

              <div className="grid grid-cols-2 gap-4">

                <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
                  1. Extract Text
                </div>

                <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
                  2. Clean Data
                </div>

                <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
                  3. Parse Invoice
                </div>

                <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
                  4. Retrieve Rules
                </div>

                <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
                  5. Validate Rules
                </div>

                <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
                  6. Generate Result
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="mt-10 text-center text-slate-400 text-sm">
          Built with React • FastAPI • AI Agents • RAG • Vector Database
        </div>

      </div>
    </div>
  );
}