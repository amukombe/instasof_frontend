import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("wallet_token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
}