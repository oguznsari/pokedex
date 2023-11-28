import { pokemonApi } from "./services/pokemonApi";

const { configureStore, getDefaultMiddleware } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(pokemonApi.middleware);
  },
});

export default store;
