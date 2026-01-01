import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import QuoteCard from "../components/cards/QuoteCard"; 
import { Helmet } from "react-helmet-async";

const QuotePage = () => {
  const { id } = useParams();
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/quotes/${id}`
        );
        const data = await res.json();
        setQuote(data);
      } catch (err) {
        console.error("Failed to load quote", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, [id]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (!quote) return <p>Quote not found</p>;

  return (
    <>
    <Helmet>
  <title>{quote.text.slice(0, 60)}...</title>
  <meta
    name="description"
    content={quote.text}
  />
  </Helmet>
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <QuoteCard quote={quote} />
    </div>
    </>
  );
};

export default QuotePage;
