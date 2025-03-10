import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { useEffect } from "react";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user, token, isLoading, checkAuth } = useAuthStore();

  useEffect(() => {
    console.log("PrivateRoute - Initial state:", { user, token, isLoading });
    if (!user && token) {
      console.log("PrivateRoute - Checking auth...");
      checkAuth();
    }
  }, [user, token, checkAuth, isLoading]);

  if (isLoading) {
    return null; // または適切なローディングコンポーネント
  }

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};
