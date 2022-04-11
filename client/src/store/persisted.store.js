const STORAGE_KEY = "eBook";

/**
 * Use this function if you need to call a middleware
 * when setting the initial state.
 *

/* Use an IIFE to export the persisted state in a variable */
export const persistedState = (() => {
  try {
    const rawState = localStorage.getItem(STORAGE_KEY);
    if (rawState === null) return undefined;
    const state = JSON.parse(rawState);
    return state;
  } catch (err) {
    return undefined;
  }
})();

/* Export a method to save state on each store update */
export const saveState = (state) => {
  try {
    let stateFilter = JSON.parse(JSON.stringify(state)); // deep clone
    [].forEach((item) => delete stateFilter[item]);
    ["offsidebarOpen", "asideToggled", "horizontal"] // states which we don't want to persist.
      .forEach((item) => delete stateFilter.settings[item]);
    const rawState = JSON.stringify(stateFilter);
    localStorage.setItem(STORAGE_KEY, rawState);
  } catch (err) {
    // Ignore write errors.
  }
};
