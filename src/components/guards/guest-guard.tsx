import { useAuth } from "@/contexts/auth/use-auth";
import { Navigate, Outlet } from "react-router-dom";

export function GuestGuard() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
