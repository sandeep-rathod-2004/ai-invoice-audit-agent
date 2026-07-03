export default function UploadCard({
  file,
  task,
  setTask,
  setFile,
  handleSubmit,
  loading,
}) {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

      <h2 className="text-3xl font-semibold mb-8">
        Upload Invoice
      </h2>

      <label className="border-2 border-dashed border-cyan-400 rounded-2xl p-12 flex flex-col items-center justify-center cursor-pointer hover:bg-cyan-500/10 transition">

        <div className="text-7xl mb-5">
          📄
        </div>

        <p className="text-xl font-medium text-center">
          {file ? file.name : "Click to Upload PDF Invoice"}
        </p>

        <p className="text-slate-400 mt-2">
          PDF files supported
        </p>

        <input
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={(e) => setFile(e.target.files[0])}
        />

      </label>

      <div className="mt-8">

        <label className="block mb-3 text-slate-300">
          Task Description
        </label>

        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="w-full p-4 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />

      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full mt-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl p-4 font-semibold text-lg hover:scale-105 transition disabled:opacity-70"
      >
        {loading ? "🤖 AI Agents Working..." : "Analyze Invoice"}
      </button>

      {file && (

        <div className="mt-6 bg-slate-900 rounded-xl border border-slate-700 p-4">

          <p className="text-slate-400 text-sm">
            Selected File
          </p>

          <p className="text-cyan-400 font-medium mt-1">
            {file.name}
          </p>

        </div>

      )}

    </div>
  );
}