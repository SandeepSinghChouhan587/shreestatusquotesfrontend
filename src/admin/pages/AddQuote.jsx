import { useState } from "react";
import toast from "react-hot-toast";
import ImageUpload from "../components/ImageUpload";
import AdminHeader from "../components/AdminHeader";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

const AddQuote = () => {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!text || !category || !imageUrl) {
      toast.error("All fields required");
      return;
    }

    try {
      setLoading(true);

      await API.post("/admin/add", {
        text,
        category: category.split(",").map((c) => c.trim()),
        image: imageUrl,
      });

      toast.success("Quote added");
      setText("");
      setCategory("");
      setImageUrl("");
    } catch {
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-black bg-gradient-to-br from-indigo-50 to-violet-100 flex justify-center items-center p-6">
      <div className="bg-white w-full max-w-2xl p-8 rounded-xl shadow">
        <AdminHeader title="Add Quote" />

        <form onSubmit={submitHandler} className="space-y-5">
          <textarea
            className="w-full border p-3 rounded"
            placeholder="Quote text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <input
            className="w-full border p-3 rounded"
            placeholder="Category (comma separated)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <ImageUpload
            text={text}
            category={category}
            onUpload={(url) => setImageUrl(url)}
          />

          <button
            className="w-full hover:bg-indigo-800 bg-indigo-600 text-white py-3 rounded"
            disabled={loading}
          >
            {loading ? "Saving..." : "Add Quote"}
          </button>

        </form>
          <button
          type="submit"
            className="w-full mt-5  bg-violet-600 hover:bg-violet-800 text-white py-3 rounded"
           onClick={()=>{navigate("/admin/dashboard")}}
          >
            Go To Dashboard
          </button>
      </div>
    </div>
  );
};

export default AddQuote;
