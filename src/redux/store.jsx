import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { configureStore } from "@reduxjs/toolkit";
import { contactApi } from "redux/contact";
import { authApi } from "./auth";
import { middlewareF } from "hooks/middleware";

const combinedApis = [contactApi, authApi];

export const store = configureStore({
  reducer: {
    [contactApi.reducerPath]: contactApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: middlewareF(combinedApis), 
});

setupListeners(store.dispatch);
