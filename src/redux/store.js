// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from './api/apiSlice';
import authorReducer from './api/authorSlice'; // import your author slice
import categoryReducer from './api/categorySlice'; // import your category slice
import { blogApiSlice } from './api/blogApiSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    authors: authorReducer, // add here
    categories: categoryReducer, // add category reducer
    [blogApiSlice.reducerPath]: blogApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          'blogApi/executeQuery/fulfilled',
          'blogApi/executeQuery/pending',
          'blogApi/executeQuery/rejected'
        ],
        // Ignore these field paths in all actions
        ignoredActionPaths: [
          'meta.baseQueryMeta.request',
          'meta.baseQueryMeta.response'
        ],
      },
    }).concat(apiSlice.middleware, blogApiSlice.middleware),
});

setupListeners(store.dispatch);

export default store;
