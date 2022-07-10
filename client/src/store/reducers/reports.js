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
    default:
      return state;
  }
};

export default reportsReducer;
