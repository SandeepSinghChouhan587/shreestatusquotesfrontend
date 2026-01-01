import { Heart, Share2, Download, Copy, Check, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const QuoteCard = ({ quote,onLikeUpdate }) => {
  const { likeQuote, downloadQuote, shareQuote } =
    useContext(AppContext);

  const [showFull, setShowFull] = useState(false);
  const [imageOpen, setImageOpen] = useState(false);

  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  /* ---------------- LIKE STATE INIT ---------------- */
  useEffect(() => {
    const likedQuotes =
      JSON.parse(localStorage.getItem("likedQuotes")) || [];
    setLiked(likedQuotes.includes(quote._id));
  }, [quote._id]);

  /* ---------------- LIKE / UNLIKE ---------------- */
  const handleLike = async () => {
    const likedQuotes =
      JSON.parse(localStorage.getItem("likedQuotes")) || [];

    if (liked) {
      // UNLIKE
      const updated = likedQuotes.filter((id) => id !== quote._id);
      localStorage.setItem("likedQuotes", JSON.stringify(updated));
      setLiked(false);
      await likeQuote(quote._id, "decrease");
          onLikeUpdate(quote._id, "decrease");
    } else {
      // LIKE
      localStorage.setItem(
        "likedQuotes",
        JSON.stringify([...likedQuotes, quote._id])
      );
      setLiked(true);
      await likeQuote(quote._id, "increase");
          onLikeUpdate(quote._id, "increase");

    }
  };

  /* ---------------- COPY ---------------- */
  const copyQuote = () => {
    navigator.clipboard.writeText(quote.text);
    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  };

  /* ---------------- DOWNLOAD ---------------- */
  const handleDownload = async (imageUrl) => {
    try {
      setDownloading(true);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/download`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl }),
      });

      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `quote-${Date.now()}.jpg`;
      link.click();

      await downloadQuote(quote._id);

      setDownloading(false);
      setDownloaded(true);

      setTimeout(() => setDownloaded(false), 1500);
    } catch {
      setDownloading(false);
      toast.error("Download failed");
    }
  };

  /* ---------------- SHARE ---------------- */
const handleShare = async () => {
  const shareUrl = `${import.meta.env.VITE_SITE_URL}/quote/${quote._id}`;

  if (navigator.share) {
    await navigator.share({
      title: "Quote",
      text: quote.text,
      url: shareUrl
    });
  } else {
    await navigator.clipboard.writeText(
      `${quote.text}\n${shareUrl}`
    );
  }

  await shareQuote(quote._id);
};

  const words = quote.text.split(" ");
  const truncated =
    words.length > 12
      ? words.slice(0, 12).join(" ") + "..."
      : quote.text;

  return (
    <>
      <div className="bg-white/10 backdrop-blur border border-white/20 rounded-3xl shadow-lg overflow-hidden transition hover:scale-[1.02]">

        {/* IMAGE */}
        <div
          className="h-[320px] cursor-pointer"
          onClick={() => setImageOpen(true)}
        >
          <img
  src={quote.image}
  loading="lazy"
  decoding="async"
  className="w-full h-full object-cover transition-opacity duration-500"
  alt="quote" 
/>
        </div>

        {/* CONTENT */}
        <div className="p-5 text-white">
          <div className="flex justify-between items-center mb-3">

            {/* ACTIONS */}
            <div className="flex gap-4 items-center">
              {/* LIKE */}
              <button onClick={handleLike}>
                <Heart
                  size={22}
                  className={liked ? "text-red-500" : "text-white"}
                  fill={liked ? "red" : "none"}
                />
              </button>

              {/* SHARE */}
              <button onClick={handleShare}>
                <Share2 className="hover:text-green-500" size={22} />
              </button>

              {/* DOWNLOAD */}
              <button onClick={() => handleDownload(quote.image)}>
                {downloading ? (
                  <span className="text-sm">...</span>
                ) : downloaded ? (
                  <Check  size={22} className="text-green-400" />
                ) : (
                <Download  className="hover:text-green-500" size={22} />
                )}
              </button>
            </div>

            {/* COPY */}
            <button onClick={copyQuote}>
              {copied ? (
                <Check size={20} className="text-green-400" />
              ) : (
                <Copy  className="hover:text-green-500" size={20} />
              )}
            </button>
          </div>

          {/* LIKE COUNT */}
          <p className="text-sm text-white/70 mb-2">
            {quote.likes} likes
          </p>

          {/* TEXT */}
          <p className="text-sm leading-relaxed">
            {showFull ? quote.text : truncated}
            {words.length > 12 && (
              <button
                onClick={() => setShowFull(!showFull)}
                className="ml-2 text-pink-400"
              >
                {showFull ? "Less" : "More"}
              </button>
            )}
          </p>

          {/* CATEGORY */}
          <div className="flex flex-wrap gap-2 mt-3">
            {quote.category.map((c, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs bg-white/20 rounded-full"
              >
                #{c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* IMAGE MODAL */}
      {imageOpen && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setImageOpen(false)}
        >
          <X className="absolute top-6 right-6 text-white" />
          <img src={quote.image}  className="max-h-[90vh] rounded-xl" />
        </div>
      )}
    </>
  );
};

export default QuoteCard;
