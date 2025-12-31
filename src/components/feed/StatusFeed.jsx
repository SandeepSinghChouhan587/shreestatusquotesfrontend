import { useApp } from "../../context/AppContext";
import StatusCard from "./StatusCard";

const StatusFeed = () => {
  const { quotes } = useApp();

  return (
    <div className="max-w-xl mx-auto p-4">
      {quotes.map((q) => (
        <StatusCard key={q.id} status={q} />
      ))}
    </div>
  );
};

export default StatusFeed;
