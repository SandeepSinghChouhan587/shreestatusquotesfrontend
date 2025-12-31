import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppProvider from "./context/AppContext";
import AdminProvider from "./context/AdminContext";

import Navbar from "./components/common/Navbar";

import Home from "./pages/Home";
import Category from "./pages/Category";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";

import Login from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import AddQuote from "./admin/pages/AddQuote";

import ProtectedRoute from "./routes/ProtectedRoute";

import { Toaster } from "react-hot-toast";
import Footer from "./components/common/Footer";
import ScrollToTop from "./components/common/ScrollToTop";


function App() {
  return (
    <AppProvider>
      <AdminProvider>
        <BrowserRouter>
          <Toaster />
          <ScrollToTop/>
          <div className="min-h-screen bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-600 text-white">
            <div className="relative z-10">
              <Navbar />
             
              <main className="pt-4 md:pt-6">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/category" element={<Category />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/terms" element={<Terms />} />

                  {/* Admin Login */}
                  <Route path="/admin" element={<Login />} />

                  {/* 🔒 Protected Admin Routes */}
                  <Route
                    path="/admin/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/admin/add"
                    element={
                      <ProtectedRoute>
                        <AddQuote />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
                <Footer/>
              </main>
            </div>
          </div>
        </BrowserRouter>
      </AdminProvider>
    </AppProvider>
  );
}

export default App;
