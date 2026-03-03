import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Theme = "light" | "dark" | "system";

interface ThemeState {
  theme: Theme;
}

const initialState: ThemeState = {
  theme: "system",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    /*
      Used when user manually changes theme from UI
    */
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },

    /*
      Used during client hydration phase
      Restores saved theme from localStorage
    */
    hydrateTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
  },
});

export const { setTheme, hydrateTheme } = themeSlice.actions;
export default themeSlice.reducer;