import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import type { RootState } from "~/store/store";

/**
 * A wrapper component that protects routes.
 * - If the user is not logged in, redirect to /login
 * - If logged in, render the protected children
 */
export default function ProtectedRoute({
    children,
}: {
    children: ReactNode;
}) {
    const user = useSelector((state: RootState) => state.auth.user);

    // If no user, block access and redirect
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}
