import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";

const AdminHeader = ({ title }) => {
  const { logout } = useContext(AdminContext);

  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-indigo-800">{title}</h2>

      <button
        onClick={logout}
        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminHeader;
