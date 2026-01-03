import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import QuoteCard from "../components/cards/QuoteCard";
import Loader from "../components/common/Loader";
import { Helmet } from "react-helmet-async";
import axios from "axios";

const QuotePage = () => {
  const { id } = useParams();

  const [quote, setQuote] = useState(null);
  const [relatedQuotes, setRelatedQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [fetchingMore, setFetchingMore] = useState(false);

  // 🔹 Fetch single shared quote
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/quotes/${id}`
        );
        setQuote(res.data);
      } catch (err) {
        console.error("Failed to load quote", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, [id]);

  // 🔹 Fetch related quotes (same category)
  const fetchRelatedQuotes = async (pageNum = 1) => {
    if (!quote?.category) return;

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/quotes/category/${
          quote.category
        }?page=${pageNum}`
      );

      // 🔥 remove current quote from list
      const filtered = res.data.filter((q) => q._id !== quote._id);

      if (pageNum === 1) {
        setRelatedQuotes(filtered);
      } else {
        setRelatedQuotes((prev) => [...prev, ...filtered]);
      }

      if (res.data.length === 0) setHasMore(false);
    } catch (err) {
      console.error("Failed to load related quotes", err);
    } finally {
      setFetchingMore(false);
    }
  };

  // 🔹 First load related quotes
  useEffect(() => {
    if (quote) {
      setPage(1);
      setHasMore(true);
      fetchRelatedQuotes(1);
    }
  }, [quote]);

  // 🔹 Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY + 100 >=
          document.documentElement.scrollHeight &&
        hasMore &&
        !fetchingMore
      ) {
        setFetchingMore(true);
        setPage((prev) => {
          const next = prev + 1;
          fetchRelatedQuotes(next);
          return next;
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, fetchingMore, quote]);

  if (loading) return <Loader />;
  if (!quote) return <p>Quote not found</p>;

  return (
    <>
      <Helmet>
        <title>{quote.text.slice(0, 60)}...</title>
        <meta name="description" content={quote.text} />
      </Helmet>

      <div style={{ maxWidth: "500px", margin: "auto" }}>
        {/* 🔥 MAIN SHARED QUOTE */}
        <QuoteCard quote={quote} />

        {/* 🔹 Related Quotes */}
        <h3 style={{ margin: "20px 0" }}>Similar {quote.category} Quotes</h3>

        {relatedQuotes.map((q) => (
          <QuoteCard key={q._id} quote={q} />
        ))}

        {fetchingMore && <Loader />}
      </div>
    </>
  );
};

export default QuotePage;
