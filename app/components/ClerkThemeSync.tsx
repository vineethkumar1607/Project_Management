import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { useAppSelector } from "~/store/hooks";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export default function ClerkThemeSync({
  children,
}: {
  children: React.ReactNode;
}) {
  /*
    Read current theme from Redux store.
    This ensures Clerk appearance stays in sync
    with the global application theme.
  */
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      /*
        appearance prop controls Clerk's internal styling.

        If app theme is dark,
        apply Clerk's official dark base theme.

        If theme is light or system,
        allow default (light) appearance.
      */
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
      }}
    >
      {children}
    </ClerkProvider>
  );
}