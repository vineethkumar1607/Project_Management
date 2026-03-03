import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { hydrateTheme, type Theme } from "../store/themeSlice";

/*
  This component is responsible for:

  1. Restoring theme from localStorage (client only)
  2. Applying theme class to <html>
  3. Keeping localStorage in sync

  It renders nothing.
  It only performs side effects.
*/
export default function ThemeInitializer() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);

  /*
    Hydration phase:
    Runs only in browser after mount.
    Restores theme from localStorage.
  */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;

    if (savedTheme) {
      dispatch(hydrateTheme(savedTheme));
    }
  }, [dispatch]);

  /*
    Apply theme to DOM whenever it changes.
    This controls Tailwind dark mode.
  */
  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.add(systemDark ? "dark" : "light");
    } else {
      root.classList.add(theme);
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return null;
}