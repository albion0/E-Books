// Imports: local files.
import {
  COUNTS_START,
  COUNTS_SUCCESS,
  COUNTS_FAILED,
  COUNTS_RESET,
  BOOKS_BY_AUTHORS_START,
  BOOKS_BY_AUTHORS_SUCCESS,
  BOOKS_BY_AUTHORS_FAILED,
  BOOKS_BY_AUTHORS_RESET,
  BOOKS_BY_GENRES_START,
  BOOKS_BY_GENRES_SUCCESS,
  BOOKS_BY_GENRES_FAILED,
  BOOKS_BY_GENRES_RESET,
  PAYMENTS_BY_READERS_START,
  PAYMENTS_BY_READERS_SUCCESS,
  PAYMENTS_BY_READERS_FAILED,
  PAYMENTS_BY_READERS_RESET,
  BOOKPURCHASES_BY_READERS_START,
  BOOKPURCHASES_BY_READERS_SUCCESS,
  BOOKPURCHASES_BY_READERS_FAILED,
  BOOKPURCHASES_BY_READERS_RESET,
  BOOKPURCHASES_BY_BOOKS_START,
  BOOKPURCHASES_BY_BOOKS_SUCCESS,
  BOOKPURCHASES_BY_BOOKS_FAILED,
  BOOKPURCHASES_BY_BOOKS_RESET,
  REVIEWS_BY_READERS_START,
  REVIEWS_BY_READERS_SUCCESS,
  REVIEWS_BY_READERS_FAILED,
  REVIEWS_BY_READERS_RESET,
  REVIEWS_BY_BOOKS_START,
  REVIEWS_BY_BOOKS_SUCCESS,
  REVIEWS_BY_BOOKS_FAILED,
  REVIEWS_BY_BOOKS_RESET,
  FORUM_TOPICS_BY_READERS_START,
  FORUM_TOPICS_BY_READERS_SUCCESS,
  FORUM_TOPICS_BY_READERS_FAILED,
  FORUM_TOPICS_BY_READERS_RESET,
  FORUM_COMMENTS_BY_READERS_START,
  FORUM_COMMENTS_BY_READERS_SUCCESS,
  FORUM_COMMENTS_BY_READERS_FAILED,
  FORUM_COMMENTS_BY_READERS_RESET,
} from "../actions/actions";

const initialLoadingState = {
  loading: false,
  success: false,
  data: null,
  error: false,
  errorMessage: null,
};
const initialState = {
  counts: initialLoadingState,
  booksByAuthors: initialLoadingState,
  booksByGenres: initialLoadingState,
  paymentsByReaders: initialLoadingState,
  bookPurchasesByReaders: initialLoadingState,
  bookPurchasesByBooks: initialLoadingState,
  reviewsByReaders: initialLoadingState,
  reviewsByBooks: initialLoadingState,
  forumTopicsByReaders: initialLoadingState,
  forumCommentsByReaders: initialLoadingState,
};

const reportsReducer = (state = initialState, action) => {
  switch (action.type) {
    /**
     * =======================================================================
     * Counts
     * =======================================================================
     */
    case COUNTS_START:
      return { ...state, counts: { ...action.payload } };
    case COUNTS_SUCCESS:
      return { ...state, counts: { ...action.payload } };
    case COUNTS_FAILED:
      return { ...state, counts: { ...action.payload } };
    case COUNTS_RESET:
      return { ...state, counts: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Books By Authors
     * =======================================================================
     */
    case BOOKS_BY_AUTHORS_START:
      return { ...state, booksByAuthors: { ...action.payload } };
    case BOOKS_BY_AUTHORS_SUCCESS:
      return { ...state, booksByAuthors: { ...action.payload } };
    case BOOKS_BY_AUTHORS_FAILED:
      return { ...state, booksByAuthors: { ...action.payload } };
    case BOOKS_BY_AUTHORS_RESET:
      return { ...state, booksByAuthors: { ...initialLoadingState } };

    /**
     * =======================================================================
     * Books by genres
     * =======================================================================
     */
    case BOOKS_BY_GENRES_START:
      return { ...state, booksByGenres: { ...action.payload } };
    case BOOKS_BY_GENRES_SUCCESS:
      return { ...state, booksByGenres: { ...action.payload } };
    case BOOKS_BY_GENRES_FAILED:
      return { ...state, booksByGenres: { ...action.payload } };
    case BOOKS_BY_GENRES_RESET:
      return { ...state, booksByGenres: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Payments by Readers
     * =======================================================================
     */
    case PAYMENTS_BY_READERS_START:
      return { ...state, paymentsByReaders: { ...action.payload } };
    case PAYMENTS_BY_READERS_SUCCESS:
      return { ...state, paymentsByReaders: { ...action.payload } };
    case PAYMENTS_BY_READERS_FAILED:
      return { ...state, paymentsByReaders: { ...action.payload } };
    case PAYMENTS_BY_READERS_RESET:
      return { ...state, paymentsByReaders: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Book Purchases By Readers
     * =======================================================================
     */
    case BOOKPURCHASES_BY_READERS_START:
      return { ...state, bookPurchasesByReaders: { ...action.payload } };
    case BOOKPURCHASES_BY_READERS_SUCCESS:
      return { ...state, bookPurchasesByReaders: { ...action.payload } };
    case BOOKPURCHASES_BY_READERS_FAILED:
      return { ...state, bookPurchasesByReaders: { ...action.payload } };
    case BOOKPURCHASES_BY_READERS_RESET:
      return { ...state, bookPurchasesByReaders: { ...initialLoadingState } };

    /**
     * =======================================================================
     * Books by genres
     * =======================================================================
     */
    case BOOKPURCHASES_BY_BOOKS_START:
      return { ...state, bookPurchasesByBooks: { ...action.payload } };
    case BOOKPURCHASES_BY_BOOKS_SUCCESS:
      return { ...state, bookPurchasesByBooks: { ...action.payload } };
    case BOOKPURCHASES_BY_BOOKS_FAILED:
      return { ...state, bookPurchasesByBooks: { ...action.payload } };
    case BOOKPURCHASES_BY_BOOKS_RESET:
      return { ...state, bookPurchasesByBooks: { ...initialLoadingState } };

    /**
     * =======================================================================
     * Reviews By Readers
     * =======================================================================
     */
    case REVIEWS_BY_READERS_START:
      return { ...state, reviewsByReaders: { ...action.payload } };
    case REVIEWS_BY_READERS_SUCCESS:
      return { ...state, reviewsByReaders: { ...action.payload } };
    case REVIEWS_BY_READERS_FAILED:
      return { ...state, reviewsByReaders: { ...action.payload } };
    case REVIEWS_BY_READERS_RESET:
      return { ...state, reviewsByReaders: { ...initialLoadingState } };

    /**
     * =======================================================================
     * Books by genres
     * =======================================================================
     */
    case REVIEWS_BY_BOOKS_START:
      return { ...state, reviewsByBooks: { ...action.payload } };
    case REVIEWS_BY_BOOKS_SUCCESS:
      return { ...state, reviewsByBooks: { ...action.payload } };
    case REVIEWS_BY_BOOKS_FAILED:
      return { ...state, reviewsByBooks: { ...action.payload } };
    case REVIEWS_BY_BOOKS_RESET:
      return { ...state, reviewsByBooks: { ...initialLoadingState } };

    /**
     * =======================================================================
     * Forum Topics By Readers
     * =======================================================================
     */
    case FORUM_TOPICS_BY_READERS_START:
      return { ...state, forumTopicsByReaders: { ...action.payload } };
    case FORUM_TOPICS_BY_READERS_SUCCESS:
      return { ...state, forumTopicsByReaders: { ...action.payload } };
    case FORUM_TOPICS_BY_READERS_FAILED:
      return { ...state, forumTopicsByReaders: { ...action.payload } };
    case FORUM_TOPICS_BY_READERS_RESET:
      return { ...state, forumTopicsByReaders: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Forum Comments By Readers
     * =======================================================================
     */
    case FORUM_COMMENTS_BY_READERS_START:
      return { ...state, forumCommentsByReaders: { ...action.payload } };
    case FORUM_COMMENTS_BY_READERS_SUCCESS:
      return { ...state, forumCommentsByReaders: { ...action.payload } };
    case FORUM_COMMENTS_BY_READERS_FAILED:
      return { ...state, forumCommentsByReaders: { ...action.payload } };
    case FORUM_COMMENTS_BY_READERS_RESET:
      return { ...state, forumCommentsByReaders: { ...initialLoadingState } };

    default:
      return state;
  }
};

export default reportsReducer;
