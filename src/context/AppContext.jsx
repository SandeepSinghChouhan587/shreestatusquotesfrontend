import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [quotes, setQuotes] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("latest");


  const [likedQuotes, setLikedQuotes] = useState([]);

  /* ---------------- LOAD LIKED QUOTES ---------------- */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("likedQuotes")) || [];
    setLikedQuotes(saved);
  }, []);

  /* ---------------- FETCH PAGINATED QUOTES ---------------- */
  const fetchMoreQuotes = async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/quotes/paginated?page=${page}`
      );

      if (res.data.length === 0) {
        setHasMore(false);
      } else {
       setQuotes((prev) => {
  const existingIds = new Set(prev.map(q => q._id));
  const newQuotes = res.data.filter(
    q => !existingIds.has(q._id)
  );
  return [...prev, ...newQuotes];
});

        setPage((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Pagination error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- LIKE ---------------- */
  const likeQuote = async (id, type = "increase") => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/quotes/like/${id}`, { type });

      setQuotes((prev) =>
        prev.map((q) =>
          q._id === id
            ? {
                ...q,
                likes: type === "increase" ? q.likes + 1 : q.likes - 1,
              }
            : q
        )
      );
    } catch (err) {
      console.error("Like error");
    }
  };

  /* ---------------- DOWNLOAD ---------------- */
  const downloadQuote = async (id) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/quotes/download/${id}`);
     
    } catch (err) {
      console.error("Download error");
    }
  };

  /* ---------------- SHARE ---------------- */
  const shareQuote = async (id) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/quotes/share/${id}`);
    } catch (err) {
      console.error("Share error");
    }
  };

  return (
    <AppContext.Provider
      value={{
        quotes,
        fetchMoreQuotes,
        hasMore,
        loading,
        searchQuery,
        setSearchQuery,
        filter,
        setFilter,
        likedQuotes,
        likeQuote,
        downloadQuote,
        shareQuote,
     
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
