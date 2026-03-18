import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { setGetToken } from "../api/authToken";

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { getToken } = useAuth();

    useEffect(() => {
        setGetToken(getToken);
    }, [getToken]);

    return <>{children}</>;
}