import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers/reducers";
import thunk from "redux-thunk";

import { persistedState, saveState } from "./persisted.store.js";

export default function configureStore() {
  const store = createStore(
    reducers,
    persistedState, // second argument overrides the initial state
    applyMiddleware(thunk)
  );
  // add a listener that will be invoked on any state change
  store.subscribe(() => {
    saveState(store.getState());
  });

  return store;
}
