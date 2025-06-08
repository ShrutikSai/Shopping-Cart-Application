import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";

import ProductList from "./pages/ProductList";
import OrdersList from "./pages/OrderList";
import UsersList from "./pages/UserList";
import Login from "./pages/LoginForm";
import Coupon from "./pages/Coupon";

import { useNavigate } from "react-router-dom";
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // 👈 New loading state
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      // Clean up the URL and redirect
      window.history.replaceState({}, document.title, "/orders");
      navigate("/orders", { replace: true });
      setLoading(false); // done
    } else {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setIsAuthenticated(true);
      }
      setLoading(false); // done
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  if (loading) return <div>Loading...</div>; // 👈 Prevent premature render

  return (
    <div>
      {isAuthenticated && (
        <div className="bg-[#000000]">
         <nav className="navbar navbar-expand-lg  text-[#333333] shadow-md 
         border-b border-[#DDDDDD] w-100">
               <div className="container">
                 <a className="navbar-brand text-[#FFA500]" href="/products">
                   ADMIN - CloudCart
                 </a>
                 <button
                   className="navbar-toggler"
                   type="button"
                   data-bs-toggle="collapse"
                   data-bs-target="#navbarNav"
                   aria-controls="navbarNav"
                   aria-expanded="false"
                   aria-label="Toggle navigation"
                 >
                   <span className="navbar-toggler-icon"></span>
                 </button>
                 <div className="collapse navbar-collapse" id="navbarNav">
                   <ul className="navbar-nav">
                     <li className="nav-item">
                       <Link className="nav-link" to="/products">
                         Products
                       </Link>
                     </li>
                     <li className="nav-item">
                       <Link className="nav-link" to="/orders">
                         Orders
                       </Link>
                     </li>
                     {/* <li className="nav-item">
                       <Link className="nav-link" to="/users">
                         Users
                       </Link>
                     </li> */}
                     <li className="nav-item">
                       <Link className="nav-link" to="/coupon">
                         Coupon
                       </Link>
                     </li>
                   </ul>
                   <button
                     className="btn btn-danger ms-auto"
                     onClick={() => {
                       setIsAuthenticated(false);
                     }}
                   >
                     Logout
                   </button>
                 </div>
               </div>
             </nav>
             </div>
      )}

      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/products" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />

        <Route
          path="/products"
          element={
            isAuthenticated ? <ProductList /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/orders"
          element={
            isAuthenticated ? <OrdersList /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/users"
          element={
            isAuthenticated ? <UsersList /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/coupon"
          element={
            isAuthenticated ? <Coupon /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </div>
  );
};


export default App;
