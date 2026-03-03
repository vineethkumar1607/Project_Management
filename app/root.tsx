import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, } from "react-router";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import { Provider, useSelector } from "react-redux";
import { store } from "./store/store";
import { dark } from "@clerk/themes";

import "./app.css";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navigate } from "react-router";
import { useAppSelector } from "./store/hooks";
import ClerkThemeSync from "./components/ClerkThemeSync";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

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

  const theme = useAppSelector((state) => state.theme.theme);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
      /*
        This script runs immediately when the HTML loads.
        It executes before React hydrates the app.

        Goal:
        Prevent flash of incorrect theme (FOUC).
        We apply the correct theme class to <html> before UI renders.
      */
      (function() {
        // Read the saved theme from localStorage
        const savedTheme = localStorage.getItem("theme");

        // Reference to <html> element
        const root = document.documentElement;

        /*
          If user explicitly selected dark mode,
          immediately apply the dark class.
        */
        if (savedTheme === "dark") {
          root.classList.add("dark");
        }

        /*
          If user explicitly selected light mode,
          ensure dark class is removed.
        */
        else if (savedTheme === "light") {
          root.classList.remove("dark");
        }

        /*
          If theme is "system" or not set,
          detect user's OS preference and apply accordingly.
        */
        else {
          const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

          if (systemDark) {
            root.classList.add("dark");
          }
        }
      })();
    `,
          }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Dynamic <title>, <meta> from routes */}
        <Meta />

        {/* Injects styles & links */}
        <Links />
      </head>

      <body>
        {/* This is your App UI */}
        <Provider store={store}>
          <ClerkThemeSync>
            {children}
          </ClerkThemeSync>
        </Provider>
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


export default function App() {
  const theme = useAppSelector((state) => state.theme.theme);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // Current route path (/login, /dashboard, etc.)
  const location = useLocation();

  /* Routes where Navbar + Sidebar should NOT appear */
  const hideLayoutRoutes = ["/login", "/404"];
  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);


  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.add(systemDark ? "dark" : "light");
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  /* --------------------------------------------------
      Main App Layout (Dashboard Pages)
  --------------------------------------------------- */
  return (
    <>
      <SignedOut>
        {location.pathname === "/login" ? (
          <Outlet />
        ) : (
          <Navigate to="/login" />
        )}
      </SignedOut>

      <SignedIn>
        {shouldHideLayout ? (
          <Outlet />
        ) : (
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
    </>
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
