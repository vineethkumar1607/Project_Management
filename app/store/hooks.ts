import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

/*
  Typed version of useDispatch
*/
export const useAppDispatch = () => useDispatch<AppDispatch>();

/*
  Typed version of useSelector
  Now state is strongly typed everywhere
*/
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;