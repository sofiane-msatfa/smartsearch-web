import { useAuth } from "@/contexts/auth/use-auth";
import { Navigate } from "react-router-dom";

export function HomePage() {
  const { isAuthenticated } = useAuth();
  

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return <Navigate to="/auth/login" />;
}
