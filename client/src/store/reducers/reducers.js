import { combineReducers } from "redux";
import authReducer from "./auth";
import authorsReducer from "./authors";
import booksReducer from "./books";
import genresReducer from "./genres";
import forumTopicsReducer from "./forumTopics";
import forumCommentsReducer from "./forumComments";

export default combineReducers({
  auth: authReducer,
  genres: genresReducer,
  authors: authorsReducer,
  books: booksReducer,
  forumTopics: forumTopicsReducer,
  forumComments: forumCommentsReducer,
});
