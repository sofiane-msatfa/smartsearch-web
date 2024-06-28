import { useAuth } from "@/contexts/auth/use-auth";
import { Navigate, Outlet } from "react-router-dom";

export function AuthGuard() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // TODO: utiliser un dictionnaire de routes pour centraliser le tout
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}
