import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();


  };

  return (
    
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h3 className="text-center mb-4">Admin Login</h3>

      
        <a
          href="http://localhost:3003/auth/admin/google"
          className="btn btn-light border w-100"
        >
          Continue with Google
        </a>
      </div>
    </div>
  );
};

export default LoginForm;
