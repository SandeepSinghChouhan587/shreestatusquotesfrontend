import { FaHeart, FaDownload, FaShare } from "react-icons/fa";

const StatusCard = ({ status }) => {
  return (
    <div className="bg-gradient-to-br from-black to-gray-900 text-white rounded-xl p-5 shadow-lg mb-6">
      <p className="text-lg text-center mb-4">
        {status.text}
      </p>

      <div className="flex justify-between items-center text-sm">
        <button className="flex items-center gap-1">
          <FaHeart /> {status.likes}
        </button>

        <button>
          <FaShare />
        </button>

        <button>
          <FaDownload />
        </button>
      </div>
    </div>
  );
};

export default StatusCard;
