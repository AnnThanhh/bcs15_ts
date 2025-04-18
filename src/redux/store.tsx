import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducer/productReducer";
import userReducer from "./reducer/userReducer";
export const store = configureStore({
  reducer: {
    number: (state: number = 1) => state,
    // object: (state = 2) => state,
    productReducer,
    userReducer,
  },
});

export type Rootstate = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
export type GetStateMethodType = typeof store.getState;
