import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { useAppSelector } from "~/store/hooks";

/*
  Clerk requires a publishable key to initialize the authentication client.
  This value comes from environment variables.
*/
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export default function ClerkThemeSync({
  children,
}: {
  children: React.ReactNode;
}) {
  /*
    Read the theme directly from Redux.
    Redux is the single source of truth for the application theme.
  */
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <ClerkProvider
      /*
        key forces React to re-mount ClerkProvider whenever the theme changes.

        Clerk internally reads the theme only during initialization.
        Re-mounting ensures Clerk re-applies the correct theme.
      */
      key={theme}
      publishableKey={PUBLISHABLE_KEY}
      appearance={{
        /*
          Apply Clerk's official dark theme when the app is in dark mode.

          If theme is light, Clerk automatically falls back
          to its default light styling.
        */
        baseTheme: theme === "dark" ? dark : undefined,
      }}
    >
      {children}
    </ClerkProvider>
  );
}