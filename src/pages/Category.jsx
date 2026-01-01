import { useContext, useEffect, useState } from "react";
import axios from "axios";
import QuoteCard from "../components/cards/QuoteCard";
import Loader from "../components/common/Loader";
import { AppContext } from "../context/AppContext";
import { Helmet } from "react-helmet-async";

const Category = () => {
  const [category, setCategory] = useState("newyear");
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [fetchingMore, setFetchingMore] = useState(false);

  const { searchQuery } = useContext(AppContext);

  const categories = [
    "hindi",
    "happynewyear",
    "newyear",
    "motivation",
    "love",
    "sad",
    "success",
    "life",
    "attitude",
    "friendship",
    "inspiration",
    "breakup",
    "happiness",
    "selflove",
    "positive",
    "spiritual",
  ];

  const fetchQuotes = async (selectedCategory, pageNum = 1) => {
    try {
      if (pageNum === 1) setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/quotes/category/${selectedCategory}?page=${pageNum}`
      );

      if (pageNum === 1) {
        setQuotes(res.data);
      } else {
        setQuotes((prev) => [...prev, ...res.data]);
      }

      if (res.data.length === 0) setHasMore(false);
    } catch (err) {
      console.error("Error fetching quotes", err);
    } finally {
      setLoading(false);
      setFetchingMore(false);
    }
  };

  // Load initial quotes or on category change
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchQuotes(category, 1);
  }, [category]);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY + 100 >=
          document.documentElement.scrollHeight &&
        !fetchingMore &&
        hasMore
      ) {
        setFetchingMore(true);
        setPage((prev) => {
          const nextPage = prev + 1;
          fetchQuotes(category, nextPage);
          return nextPage;
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchingMore, hasMore, category]);

const updateLikeLocally = (quoteId, type) => {
  setQuotes((prev) =>
    prev.map((q) =>
      q._id === quoteId
        ? {
            ...q,
            likes:
              type === "increase"
                ? q.likes + 1
                : q.likes - 1,
          }
        : q
    )
  );
};


  const filteredQuotes = quotes.filter((q) => {
    const query = searchQuery.toLowerCase();
    return (
      q.text?.toLowerCase().includes(query) ||
      q.category?.toLowerCase().includes(query)
    );
  });

  return (
    <>
    <Helmet>
  <title>{category} Quotes | Shree Status Quotes</title>
  <meta
    name="description"
    content={`Best ${category} quotes in Hindi, Hinglish and English with images. Download and share for free.`}
  />
  </Helmet>

    <section className="min-h-screen w-full bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-600 px-4 md:px-12 py-12">

      {/* Heading */}
      <h1 className="text-center text-3xl md:text-4xl font-extrabold text-white mb-8 capitalize">
        {category.replace(/[-_]/g, " ")} Quotes
      </h1>

      {/* 🔹 Mobile Category Dropdown */}
      <div className="md:hidden mb-8">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex justify-between items-center px-5 py-3 rounded-full
          bg-white/20 backdrop-blur text-white font-semibold shadow"
        >
          <span className="capitalize">{category}</span>
          <span className="text-lg">▾</span>
        </button>

        {open && (
          <div className="mt-4 flex flex-wrap gap-2 bg-white/10 p-3 rounded-xl backdrop-blur">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  setOpen(false);
                }}
                className={`px-4 py-2 text-sm rounded-full transition
                  ${
                    category === cat
                      ? "bg-white text-indigo-700 font-semibold"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 🔹 Desktop Category Pills */}
      <div className="hidden md:flex justify-center flex-wrap gap-4 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-6 py-2 rounded-full font-medium transition
              ${
                category === cat
                  ? "bg-white text-indigo-700 shadow-lg"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
          >
            {cat.replace(/[-_]/g, " ")}
          </button>
        ))}
      </div>

      {/* Quotes Section */}
      {loading && page === 1 ? (
        <Loader />
      ) : filteredQuotes.length === 0 ? (
        <p className="text-center text-white/80">No quotes found in this category.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
         {filteredQuotes.map((quote, index) => (
  <QuoteCard key={`${quote._id}-${index}`} quote={quote} onLikeUpdate={updateLikeLocally}/>
))}

        </div>
      )}

      {fetchingMore && <div className="flex justify-center my-8"><Loader /></div>}
    </section>
    </>
  );
};

export default Category;
