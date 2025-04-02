import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    number: (state = 1) => state,
  },
});

export type Rootstate = ReturnType<typeof store.getState>;
