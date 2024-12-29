import { useContext } from "react";
import { AuthContext } from "../context";
import { Navigate } from "react-router-dom";

export default function AuthLayer({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}
