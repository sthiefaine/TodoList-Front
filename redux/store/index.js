// == Import : npm
import { useMemo } from 'react';
import { configureStore } from '@reduxjs/toolkit';

// == Import : local
import reducer from '../reducers';
import logMiddleware from '../middlewares/logMiddleware';

let store;

// READ: https://redux.js.org/recipes/configuring-your-store
export function getStore(preloadedState) {
  return configureStore({
    /**
     * A single reducer function that will be used as the root reducer, or an
     * object of slice reducers that will be passed to `combineReducers()`.
     */
    reducer,

    /**
     * An array of Redux middleware to install. If not supplied, defaults to
     * the set of middleware returned by `getDefaultMiddleware()`.
     */
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logMiddleware),

    /**
     * Whether to enable Redux DevTools integration. Defaults to `true`.
     *
     * Additional configuration can be done by passing Redux DevTools options
     */
    devTools: process.env.NODE_ENV !== 'production',

    /**
     * The initial state, same as Redux's createStore.
     * You may optionally specify it to hydrate the state
     * from the server in universal apps, or to restore a previously serialized
     * user session. If you use `combineReducers()` to produce the root reducer
     * function (either directly or indirectly by passing an object as `reducer`),
     * this must be an object with the same shape as the reducer map keys.
     */
    preloadedState,

    /**
     * The store enhancers to apply. See Redux's `createStore()`.
     * All enhancers will be included before the DevTools Extension enhancer.
     * If you need to customize the order of enhancers, supply a callback
     * function that will receive the original array (ie, `[applyMiddleware]`),
     * and should return a new array (such as `[applyMiddleware, offline]`).
     * If you only need to add middleware, you can use the `middleware` parameter instead.
     */
    enhancer: {},
  });
};

export const initializeStore = preloadedState => {
  let _store = store ?? getStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = getStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  return useMemo(() => initializeStore(initialState), [initialState]);
}
