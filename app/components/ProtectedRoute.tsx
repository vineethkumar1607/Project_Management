import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useUser();

  // Wait for Clerk to initialize
  if (!isLoaded) {
    return <div>Loading...</div>; // or skeleton
  }

  // Only redirect AFTER Clerk is ready
  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}