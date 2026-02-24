import { Navigate } from "react-router-dom";

const ProtectedRoute = async ({ children })=> {
  const token = localStorage.getItem("token");

  try{
    const res = await api.get("/profile");
    if(!res.data.success){
    }

    return children;

  }catch(err){
    return <Navigate to="/signup" replace />;
  }
}

export default ProtectedRoute;