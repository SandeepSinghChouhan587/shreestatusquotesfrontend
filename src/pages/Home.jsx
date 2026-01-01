import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import QuoteCard from "../components/cards/QuoteCard";
import Loader from "../components/common/Loader";
import Hero from "../components/common/Hero";

const Home = () => {
  const { quotes, fetchMoreQuotes, loading, searchQuery } = useContext(AppContext);
  const [isFetching, setIsFetching] = useState(false);
useEffect(() => {
  fetchMoreQuotes(); 
}, []);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.scrollHeight
      ) {
        if (!isFetching && !loading) {
          setIsFetching(true);
          fetchMoreQuotes().finally(() => setIsFetching(false));
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching, loading]);

  const filteredQuotes = quotes.filter((q) => {
    const query = searchQuery.toLowerCase();
    return (
      q.text?.toLowerCase().includes(query) ||
      q.category?.some((cat) => cat.toLowerCase().includes(query))
    );
  });

  return (
    <>
      <Hero />

     <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto w-full">
  {filteredQuotes.map((quote, index) => (
    <QuoteCard key={`${quote._id}-${index}`} quote={quote} />
  ))}
</div>


      {(loading || isFetching) && (
        <div className="flex justify-center my-8">
          <Loader />
        </div>
      )}

      {filteredQuotes.length === 0 && !loading && (
        <p className="text-center text-white/80 mt-8">No quotes found.</p>
      )}
    </>
  );
};

export default Home;
