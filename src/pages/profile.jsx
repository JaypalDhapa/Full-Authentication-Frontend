import React from 'react'
import { useNavigate } from "react-router-dom";

const profile = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
      };
  return (
    <body class="flex items-center justify-center h-screen">
  <h1 class="text-3xl font-bold">Thank you</h1>
  <button onClick={handleLogout}>Logout</button>
</body>
  )
}

export default profile
