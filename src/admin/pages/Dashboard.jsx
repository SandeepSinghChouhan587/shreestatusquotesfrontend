import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../../services/api";
import AdminHeader from "../components/AdminHeader";

const Dashboard = () => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const res = await API.get("/admin/quotes");
      setQuotes(res.data.quotes);
    } catch (error) {
      console.error("Unauthorized");
    }
  };

  const deleteQuote = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this quote?");
    if (!confirm) return;

    try {
      await API.delete(`/admin/delete/${id}`);
      toast.success("Quote deleted");
      fetchQuotes();
    } catch (error) {
      toast.error("Failed to delete quote");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-violet-100 p-4 sm:p-8">
      <AdminHeader title="📜 Quotes Dashboard" />

      <Link
        to="/admin/add"
        className="inline-block mb-5 px-5 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
      >
        ➕ Add New Quote
      </Link>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-4">Quote</th>
              <th className="p-4 text-center">👍 Likes</th>
              <th className="p-4 text-center">🔁 Shares</th>
              <th className="p-4 text-center">⬇ Downloads</th>
              <th className="p-4 text-center">⚙ Action</th>
            </tr>
          </thead>

          <tbody>
            {quotes.map((q, index) => (
              <tr
                key={q._id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="p-4 text-gray-800">{q.text}</td>
                <td className="p-4 text-center">{q.likes}</td>
                <td className="p-4 text-center">{q.shares}</td>
                <td className="p-4 text-center">{q.downloads}</td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => deleteQuote(q._id)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE VIEW ================= */}
      <div className="md:hidden space-y-4">
        {quotes.map((q) => (
          <div
            key={q._id}
            className="bg-white rounded-xl shadow p-4 space-y-3"
          >
            <p className="text-gray-800 font-medium">{q.text}</p>

            <div className="flex justify-between text-sm text-gray-600">
              <span>👍 {q.likes}</span>
              <span>🔁 {q.shares}</span>
              <span>⬇ {q.downloads}</span>
            </div>

            <button
              onClick={() => deleteQuote(q._id)}
              className="w-full mt-2 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Delete Quote
            </button>
          </div>
        ))}
      </div>

      {quotes.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No quotes found.
        </p>
      )}
    </div>
  );
};

export default Dashboard;
