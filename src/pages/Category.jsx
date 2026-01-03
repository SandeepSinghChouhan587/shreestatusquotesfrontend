import { useContext, useEffect, useState, useRef } from "react";
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

  // 🔹 Spotlight guide state
  const [showGuide, setShowGuide] = useState(false);
  const switchRef = useRef(null);
  const [spotlightStyle, setSpotlightStyle] = useState({});

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

  // 🔹 Show guide only once
  useEffect(() => {
    const seen = localStorage.getItem("category_switch_guide_seen");
    if (!seen) setShowGuide(true);
  }, []);

  // 🔹 Calculate spotlight position
  useEffect(() => {
    if (showGuide && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();

      setSpotlightStyle({
        "--x": `${rect.left + rect.width / 2}px`,
        "--y": `${rect.top + rect.height / 2}px`,
        "--r": `${Math.max(rect.width, rect.height) / 2 + 20}px`,
      });
    }
  }, [showGuide]);

  const hideGuide = () => {
    localStorage.setItem("category_switch_guide_seen", "true");
    setShowGuide(false);
  };

  const fetchQuotes = async (selectedCategory, pageNum = 1) => {
    try {
      if (pageNum === 1) setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/quotes/category/${selectedCategory}?page=${pageNum}`
      );

      if (pageNum === 1) setQuotes(res.data);
      else setQuotes((prev) => [...prev, ...res.data]);

      if (res.data.length === 0) setHasMore(false);
    } catch (err) {
      console.error("Error fetching quotes", err);
    } finally {
      setLoading(false);
      setFetchingMore(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchQuotes(category, 1);
  }, [category]);

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
          ? { ...q, likes: type === "increase" ? q.likes + 1 : q.likes - 1 }
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
          content={`Best ${category} quotes in Hindi, Hinglish and English with images.`}
        />
      </Helmet>

      {/* 🔹 Spotlight Overlay */}
      {showGuide && (
        <div
          className="fixed inset-0 z-40 pointer-events-none"
          style={{
            background: `
              radial-gradient(
                circle var(--r) at var(--x) var(--y),
                transparent 0%,
                rgba(0,0,0,0.85) 100%
              )
            `,
            ...spotlightStyle,
          }}
        />
      )}

      <section className="min-h-screen w-full bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-600 px-4 md:px-12 py-12 relative z-10">

        <h1 className="text-center text-3xl md:text-4xl font-extrabold text-white mb-8 capitalize">
          {category.replace(/[-_]/g, " ")} Quotes
        </h1>

        {/* 🔹 Mobile Category Switch */}
        <div className="md:hidden mb-8 relative z-50">
          <button
            ref={switchRef}
            onClick={() => {
              setOpen(!open);
              hideGuide();
            }}
            className="w-full flex justify-between items-center px-5 py-3 rounded-full
            bg-white/20 backdrop-blur text-white font-semibold shadow relative"
          >
            <span className="capitalize">{category}</span>
            <span className="text-lg">▾</span>
          </button>

          {/* 🔹 Guide Bubble */}
          {showGuide && (
            <div className="absolute -top-14 left-4 z-50 animate-pulse">
              <div className="relative bg-black text-white text-xs px-3 py-2 rounded-md shadow-lg">
                Tap here to choose category
                <div className="absolute left-4 -bottom-2 w-0 h-0
                  border-l-8 border-r-8 border-t-8
                  border-l-transparent border-r-transparent border-t-black" />
              </div>
            </div>
          )}

          {open && (
            <div className="mt-4 flex flex-wrap gap-2 bg-white/10 p-3 rounded-xl backdrop-blur">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setCategory(cat);
                    setOpen(false);
                    hideGuide();
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

        {/* Desktop categories */}
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

        {/* Quotes */}
        {loading && page === 1 ? (
          <Loader />
        ) : filteredQuotes.length === 0 ? (
          <p className="text-center text-white/80">
            No quotes found in this category.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredQuotes.map((quote, index) => (
              <QuoteCard
                key={`${quote._id}-${index}`}
                quote={quote}
                onLikeUpdate={updateLikeLocally}
              />
            ))}
          </div>
        )}

        {fetchingMore && (
          <div className="flex justify-center my-8">
            <Loader />
          </div>
        )}
      </section>
    </>
  );
};

export default Category;
