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

  /* ----------------------------------
     CATEGORY RESOLVER
  ---------------------------------- */
  const resolveBaseCategory = (category) => {
    if (!category) return "";

    // category array ho to first lo
    const slug = Array.isArray(category) ? category[0] : category;
    if (!slug) return "";

    const parts = slug.toLowerCase().split("-");

    const stopWords = ["quotes", "quote", "hindi", "english"];

    const base = parts.find((w) => !stopWords.includes(w));

    return base || parts[0];
  };

  /* ----------------------------------
     FETCH SINGLE QUOTE
  ---------------------------------- */
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

  /* ----------------------------------
     FETCH RELATED QUOTES
  ---------------------------------- */
  const fetchRelatedQuotes = async (pageNum = 1) => {
    if (!quote || !quote.category) return;

    const baseCategory = resolveBaseCategory(quote.category);
    if (!baseCategory) return;

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/quotes/category/${baseCategory}?page=${pageNum}`
      );

      // remove current quote
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

  /* ----------------------------------
     INITIAL LOAD OF RELATED QUOTES
  ---------------------------------- */
  useEffect(() => {
    if (quote) {
      setPage(1);
      setHasMore(true);
      fetchRelatedQuotes(1);
    }
  }, [quote]);

  /* ----------------------------------
     INFINITE SCROLL
  ---------------------------------- */
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
          const nextPage = prev + 1;
          fetchRelatedQuotes(nextPage);
          return nextPage;
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, fetchingMore, quote]);

  /* ----------------------------------
     RENDER
  ---------------------------------- */
  if (loading) return <Loader />;
  if (!quote) return <p>Quote not found</p>;

  const displayCategory = Array.isArray(quote.category)
    ? quote.category[0]
    : quote.category;

  return (
    <>
      <Helmet>
        <title>{quote.text.slice(0, 60)}...</title>
        <meta name="description" content={quote.text} />
      </Helmet>

      <div style={{ maxWidth: "500px", margin: "auto" }}>
        {/* MAIN SHARED QUOTE */}
        <QuoteCard quote={quote} />

        {/* RELATED QUOTES */}
        <h3 style={{ margin: "20px 0" }}>
          Similar {displayCategory} Quotes
        </h3>

        {relatedQuotes.map((q) => (
          <QuoteCard key={q._id} quote={q} />
        ))}

        {fetchingMore && <Loader />}
      </div>
    </>
  );
};

export default QuotePage;
