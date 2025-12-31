import { createContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
export const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(
    localStorage.getItem("token") ? true : false
  );

  const login = async (form) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/login`, form);
    if(res.data.success){
      localStorage.setItem("token", res.data.token);
      setAdmin(true);
      toast.success(res.data.message);
      window.location.href = "/admin/dashboard";
    }else{
      toast.error(res.data.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAdmin(false);
    window.location.href = "/admin";
  };

  return (
    <AdminContext.Provider value={{ admin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
