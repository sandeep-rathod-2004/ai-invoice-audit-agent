import { useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import UploadCard from "./components/UploadCard";
import ResultCard from "./components/ResultCard";
import Workflow from "./components/Workflow";
import SummaryCards from "./components/SummaryCards";
import LoadingSpinner from "./components/LoadingSpinner";

export default function App() {

  const [file, setFile] = useState(null);
  const [task, setTask] = useState("validate invoice compliance");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const [summary, setSummary] = useState({
    total: 0,
    valid: 0,
    invalid: 0,
    executionTime: "0 sec",
  });

  const handleSubmit = async () => {

    if (!file) {
      alert("Please upload a PDF invoice.");
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

      setSummary({
        total: data.total || 0,
        valid: data.valid || 0,
        invalid: data.invalid || 0,
        executionTime: `${data.execution_time || 0} sec`,
     });
    } catch (err) {

      console.error(err);
      alert("Unable to connect to backend.");

    }

    setLoading(false);

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">

      <Header />

      <div className="max-w-7xl mx-auto px-6 pb-10">

        <div className="grid lg:grid-cols-2 gap-8">

          <UploadCard
            file={file}
            task={task}
            setTask={setTask}
            setFile={setFile}
            handleSubmit={handleSubmit}
            loading={loading}
          />

          {loading ? (
            <LoadingSpinner />
          ) : (
            <ResultCard result={result} />
          )}

        </div>

        {result && (

          <SummaryCards
            total={summary.total}
            valid={summary.valid}
            invalid={summary.invalid}
            executionTime={summary.executionTime}
          />

        )}

        <Workflow />

        <Footer />

      </div>

    </div>

  );

}