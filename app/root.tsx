import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Loader2 } from "lucide-react";
import "./app.css";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navigate } from "react-router";

/* --------------------------------------------------
   <Links /> – Used to inject <link> tags into <head>
   This replaces index.html in Vite
--------------------------------------------------- */
export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap",
  },
];

/* --------------------------------------------------
   Layout Component
   This defines the FINAL HTML DOCUMENT
--------------------------------------------------- */
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Dynamic <title>, <meta> from routes */}
        <Meta />

        {/* Injects styles & links */}
        <Links />
      </head>

      <body>
        {/* This is your App UI */}
        {children}

        {/* Remembers scroll position between routes */}
        <ScrollRestoration />

        {/* Injects JS bundles */}
        <Scripts />
      </body>
    </html>
  );
}

/* --------------------------------------------------
   App Component ("APP.TSX")
--------------------------------------------------- */

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}
export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // Current route path (/login, /dashboard, etc.)
  const location = useLocation();

  /* Routes where Navbar + Sidebar should NOT appear */
  const hideLayoutRoutes = ["/login", "/404"];
  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  /* --------------------------------------------------
      Main App Layout (Dashboard Pages)
  --------------------------------------------------- */
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>

      {/* -------------------------------
        USER IS NOT LOGGED IN
    -------------------------------- */}
      <SignedOut>
        {location.pathname === "/login" ? <Outlet /> : <Navigate to="/login" />}
      </SignedOut>


      {/* -------------------------------
        USER IS LOGGED IN
    -------------------------------- */}
      <SignedIn>
        {shouldHideLayout ? (
          /* Logged in but layout intentionally hidden */
          <Outlet />
        ) : (
          /* Logged in + normal dashboard layout */
          <div className="flex bg-white dark:bg-zinc-950 min-h-screen">
            <Sidebar
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />

            <div className="flex-1 flex flex-col h-screen">
              <Navbar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
              />

              <main className="flex-1 p-6 xl:p-10 overflow-y-auto">
                <Outlet />
              </main>
            </div>
          </div>
        )}
      </SignedIn>

    </ClerkProvider>
  );

}

/* --------------------------------------------------
   Global Error Boundary
--------------------------------------------------- */
export function ErrorBoundary({ error }: any) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="p-6">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && <pre>{stack}</pre>}
    </main>
  );
}
