import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
const Login = () => {
  const { login ,admin} = useContext(AdminContext);
  const [form, setForm] = useState({ username: "", password: "" });

  const navigate = useNavigate();

  useEffect(() => {
    if (admin) {
      navigate("/admin/dashboard");
    }
  }, [admin]);

  const submitHandler = async (e) => {
    e.preventDefault();
    await login(form);
   
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={submitHandler} className="bg-white p-6 rounded w-80">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>

        <input
          type="text"
          placeholder="Username"
          className="input"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="input mt-3 text-black"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button type="submit" className="bg-black text-white w-full mt-4 py-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
