import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

/**
 * User object stored after OAuth login.
 */
interface User {
  id: string;
  fullName: string;
  email: string;
  avatar?: string;
}

/**
 * Global auth state for Redux.
 * - If a user is logged in, the user object is stored.
 * - On refresh, state is restored from localStorage.
 */
interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Called after successful Google OAuth login.
     * Stores user in both Redux state + localStorage.
     */
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    /**
     * Logs the user out.
     * Clears both Redux + localStorage.
     */
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
