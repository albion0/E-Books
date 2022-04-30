import { combineReducers } from "redux";
import authorsReducer from "./authors";
import booksReducer from "./books";
import genresReducer from "./genres";

export default combineReducers({
  genres: genresReducer,
  authors: authorsReducer,
  books: booksReducer,
});
