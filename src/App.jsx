import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "HbenzQ0MOyyrVgKMBPUKko646aom3gowoz6pEdBD";

  const handleClick = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(
        "https://api.api-ninjas.com/v2/randomquotes?categories=success,wisdom",
        {
          headers: {
            "X-Api-Key": API_KEY,
          },
        }
      );

      setText(res.data[0]?.quote || "No quote found.");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch quote. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleClick();
  }, []);

  return (
    <div className="flex flex-col gap-10 items-center justify-center w-screen h-screen bg-green-200">
      <h1 className="text-4xl text-[#333333] font-semibold">
        AI Quote Generator
      </h1>

      <div className="w-[35%] min-h-[60%] flex flex-col gap-8 p-8 bg-white shadow-lg shadow-[#E0E0E0] rounded-2xl">

        <p className="text-2xl font-semibold text-[#777777]">
          Quote
        </p>

        <div className="flex flex-1 items-center justify-center bg-white rounded-2xl shadow-md shadow-[#E0E0E0] p-6 text-center">
          
          {loading ? (
            <p className="text-xl text-[#777777]">Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <p className="text-2xl font-semibold text-[#333333]">
              {text}
            </p>
          )}

        </div>

        <div className="flex justify-center">
          <button
            onClick={handleClick}
            disabled={loading}
            className={`text-lg w-[220px] font-semibold rounded-lg p-2 transition cursor-pointer 
              ${loading 
                ? "bg-gray-300 cursor-not-allowed" 
                : "bg-[#AFCBDA] text-[#1F2933] hover:shadow-xl"}
            `}
          >
            {loading ? "Generating..." : "Generate New Quote"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;