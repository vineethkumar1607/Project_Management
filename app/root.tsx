import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, } from "react-router";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import { Provider, useSelector, } from "react-redux";
import { store, type RootState } from "./store/store";
import AuthProvider from "./providers/AuthProvider";

import "./app.css";
import { CreateOrganization, SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import ClerkThemeSync from "./components/ClerkThemeSync";
import ThemeInitializer from "./components/ThemeInitializer";
import { fetchWorkspaces } from "./store/workspaceThunk";
import { useClerk, } from "@clerk/clerk-react";
import { setCurrentWorkspace } from "./store/workspaceSlice";
import { Toaster } from "react-hot-toast";
import AppWrapper from "./providers/AppWrapper";

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


  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          /*
            This script runs immediately when the HTML loads,
            before React hydration.

            Purpose:
            Prevent flash of incorrect theme (FOUC).

            We read the theme from localStorage and
            apply the correct class to the <html> element
            before React mounts.
          */
          (function () {
            const savedTheme = localStorage.getItem("theme");
            const root = document.documentElement;

            // If user previously selected dark theme
            if (savedTheme === "dark") {
              root.classList.add("dark");
            }

            // If user selected light theme or no theme stored
            else {
              root.classList.remove("dark");
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
        {/* This is App UI */}
        <Provider store={store}>
          <ClerkThemeSync>
            <ThemeInitializer />

            <AuthProvider>
              {children}
            </AuthProvider>

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

  const { user, isLoaded } = useUser();
  const dispatch = useAppDispatch();



  const { setActive } = useClerk();

  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(theme);

    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!isLoaded || !user) return;

    dispatch(fetchWorkspaces());
  }, [isLoaded, user?.id]);


  const { workspaces, currentWorkspaceId } = useSelector(
    (state: RootState) => state.workspace
  );

  useEffect(() => {
    if (!isLoaded || !user) return;

    const orgId = user.organizationMemberships?.[0]?.organization?.id;

    if (!orgId) return;

    // If Redux not set yet → sync it
    if (!currentWorkspaceId) {
      dispatch(setCurrentWorkspace(orgId));
    }

  }, [isLoaded, user, currentWorkspaceId]);
  /* --------------------------------------------------
      Main App Layout (Dashboard Pages)
  --------------------------------------------------- */

  if (!isLoaded) return null;
  const hasOrganizations =
    user?.organizationMemberships &&
    user.organizationMemberships.length > 0;
  return (
    <>
      <Toaster position="top-center" />
      <SignedOut>
        {location.pathname === "/login" ? (
          <Outlet />
        ) : (
          <Navigate to="/login" />
        )}
      </SignedOut>

      <SignedIn>
        {shouldHideLayout ? (
          <AppWrapper>
            <Outlet />
          </AppWrapper>

        ) : !hasOrganizations ? (
          <div className="flex items-center justify-center min-h-screen">
            <CreateOrganization afterCreateOrganizationUrl="/" />
          </div>
        ) : (
          <div className="flex bg-white dark:bg-zinc-950 min-h-screen">
            <Sidebar
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />

            <div className="flex-1 flex flex-col min-h-screen">
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
