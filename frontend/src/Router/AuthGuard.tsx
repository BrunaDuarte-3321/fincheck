import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../app/hooks/useAuth";

interface AuthGuardProps {
  isPrivet: boolean;
}
export function AuthGuard({ isPrivet }: AuthGuardProps) {
  const { signedIn } = useAuth();

  if (!signedIn && isPrivet) {
    return <Navigate to="/login" replace />;
  }

  if (signedIn && !isPrivet) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
