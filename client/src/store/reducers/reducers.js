import { combineReducers } from "redux";
import authReducer from "./auth";
import authorsReducer from "./authors";
import booksReducer from "./books";
import genresReducer from "./genres";
import forumTopicsReducer from "./forumTopics";
import forumCommentsReducer from "./forumComments";
import paymentsReducer from "./payments";
import bookPurchasesReducer from "./bookPurchases";

export default combineReducers({
  auth: authReducer,
  genres: genresReducer,
  authors: authorsReducer,
  books: booksReducer,
  forumTopics: forumTopicsReducer,
  forumComments: forumCommentsReducer,
  payments: paymentsReducer,
  bookPurchases: bookPurchasesReducer,
});
