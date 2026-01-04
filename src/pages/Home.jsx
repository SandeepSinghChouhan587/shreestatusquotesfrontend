import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import QuoteCard from "../components/cards/QuoteCard";
import Loader from "../components/common/Loader";
import Hero from "../components/common/Hero";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const { quotes, fetchMoreQuotes, loading, searchQuery } =
    useContext(AppContext);

  const loadMoreRef = useRef(null);
  const [isFetching, setIsFetching] = useState(false);

  // Initial load
  useEffect(() => {
    fetchMoreQuotes();
  }, []);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && !loading && !isFetching) {
          setIsFetching(true);
          fetchMoreQuotes().finally(() => setIsFetching(false));
        }
      },
      {
        root: null,
        rootMargin: "0px 0px 300px 0px", // 👈 load BEFORE footer
        threshold: 0,
      }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [loading, isFetching]);

  // Search filter
  const filteredQuotes = quotes.filter((q) => {
    const query = searchQuery.toLowerCase();
    return (
      q.text?.toLowerCase().includes(query) ||
      q.category?.some((cat) => cat.toLowerCase().includes(query))
    );
  });

  return (
    <>
      <Helmet>
        <title>
          Shree Status Quotes – Best Hindi, Hinglish, English & Motivational Quotes
        </title>
        <meta
          name="description"
          content="Best Hindi quotes, Hinglish quotes, English quotes, motivational thoughts, love status, bhakti quotes & daily inspiration. Free download and share."
        />
      </Helmet>

      <Hero />

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto w-full">
        {filteredQuotes.map((quote) => (
          <QuoteCard key={quote._id} quote={quote} />
        ))}
      </div>

      {/* 👇 Invisible trigger element */}
      <div ref={loadMoreRef} className="h-10"></div>

      {(loading || isFetching) && (
        <div className="flex justify-center my-8">
          <Loader />
        </div>
      )}

      {filteredQuotes.length === 0 && !loading && (
        <p className="text-center text-white/80 mt-8">
          No quotes found.
        </p>
      )}
    </>
  );
};

export default Home;
