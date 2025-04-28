import { Navigate, Outlet } from "react-router-dom";

interface AuthGuardProps {
  isPrivet: boolean;
}
export function AuthGuard({ isPrivet }: AuthGuardProps) {
  const signedIn = false;

  if (!signedIn && isPrivet) {
    return <Navigate to="/login" replace />;
  }

  if (signedIn && !isPrivet) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
