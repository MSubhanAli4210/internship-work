import { Navigate, Outlet } from "react-router-dom";
import { Children, type JSX, type ReactNode } from "react";
import { userAuthStore } from "../../store/userAuthStore";

type Role = "user" | "admin" | "manager";

interface RoleProtectedRouteProps {
  children: ReactNode;
  allowedRoles: Role[];
}

interface ProtectedAuthRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: { children?: JSX.Element }) => {
  const token = userAuthStore((state) => state.token);
  
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export function RoleProtectedRoute({
  allowedRoles,
  children,
}: RoleProtectedRouteProps) {
  const { token, user } = userAuthStore((state) => state);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

export function ProtectedAuthRoute({ children }: ProtectedAuthRouteProps) {
  const token = userAuthStore((state) => state.token);

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
