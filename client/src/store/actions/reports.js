// Imports: local files.
import ApiClient from "../../services/ApiClient";

// Action Types: Counts.
export const COUNTS_START = "COUNTS_START";
export const COUNTS_SUCCESS = "COUNTS_SUCCESS";
export const COUNTS_FAILED = "COUNTS_FAILED";
export const COUNTS_RESET = "COUNTS_RESET";

// Action Types: Books by authors stats.
export const BOOKS_BY_AUTHORS_START = "BOOKS_BY_AUTHORS_START";
export const BOOKS_BY_AUTHORS_SUCCESS = "BOOKS_BY_AUTHORS_SUCCESS";
export const BOOKS_BY_AUTHORS_FAILED = "BOOKS_BY_AUTHORS_FAILED";
export const BOOKS_BY_AUTHORS_RESET = "BOOKS_BY_AUTHORS_RESET";

// Action Types: Books by genres stats.
export const BOOKS_BY_GENRES_START = "BOOKS_BY_GENRES_START";
export const BOOKS_BY_GENRES_SUCCESS = "BOOKS_BY_GENRES_SUCCESS";
export const BOOKS_BY_GENRES_FAILED = "BOOKS_BY_GENRES_FAILED";
export const BOOKS_BY_GENRES_RESET = "BOOKS_BY_GENRES_RESET";

// Action Types: Payments by readers stats.
export const PAYMENTS_BY_READERS_START = "PAYMENTS_BY_READERS_START";
export const PAYMENTS_BY_READERS_SUCCESS = "PAYMENTS_BY_READERS_SUCCESS";
export const PAYMENTS_BY_READERS_FAILED = "PAYMENTS_BY_READERS_FAILED";
export const PAYMENTS_BY_READERS_RESET = "PAYMENTS_BY_READERS_RESET";

// Action Creators: Counts.
const countsStart = (payload) => ({
  type: COUNTS_START,
  payload,
});
const countsSuccess = (payload) => ({
  type: COUNTS_SUCCESS,
  payload,
});
const countsFailed = (payload) => ({
  type: COUNTS_FAILED,
  payload,
});
const countsReset = () => ({ type: COUNTS_RESET });

// Action Creators: Books by authors stats.
const booksByAuthorsStart = (payload) => ({
  type: BOOKS_BY_AUTHORS_START,
  payload,
});
const booksByAuthorsSuccess = (payload) => ({
  type: BOOKS_BY_AUTHORS_SUCCESS,
  payload,
});
const booksByAuthorsFailed = (payload) => ({
  type: BOOKS_BY_AUTHORS_FAILED,
  payload,
});
const booksByAuthorsReset = () => ({ type: BOOKS_BY_AUTHORS_RESET });

// Action Creators: Books by genres stats.
const booksByGenresStart = (payload) => ({
  type: BOOKS_BY_GENRES_START,
  payload,
});
const booksByGenresSuccess = (payload) => ({
  type: BOOKS_BY_GENRES_SUCCESS,
  payload,
});
const booksByGenresFailed = (payload) => ({
  type: BOOKS_BY_GENRES_FAILED,
  payload,
});
const booksByGenresReset = () => ({ type: BOOKS_BY_GENRES_RESET });

// Action Creators: Payments by readers stats.
const paymentsByReadersStart = (payload) => ({
  type: PAYMENTS_BY_READERS_START,
  payload,
});
const paymentsByReadersSuccess = (payload) => ({
  type: PAYMENTS_BY_READERS_SUCCESS,
  payload,
});
const paymentsByReadersFailed = (payload) => ({
  type: PAYMENTS_BY_READERS_FAILED,
  payload,
});
const paymentsByReadersReset = () => ({ type: PAYMENTS_BY_READERS_RESET });

// Actions: Counts.
export const counts = (payload) => {
  return async (dispatch) => {
    dispatch(
      countsStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    try {
      const { startDate, endDate } = payload;
      const query = {};
      if (startDate) query["startDate"] = startDate;
      if (endDate) query["endDate"] = endDate;
      const result = await ApiClient.post("reports/counts", query);
      if (result.data?.success) {
        const { counts } = result.data.data;
        dispatch(
          countsSuccess({
            loading: false,
            success: true,
            data: { counts },
            error: false,
            errorMessage: null,
          })
        );
      } else {
        dispatch(
          countsFailed({
            loading: false,
            success: false,
            data: null,
            error: true,
            errorMessage: result.data?.error || "Internal Server Error!",
          })
        );
      }
    } catch (error) {
      dispatch(
        countsFailed({
          loading: false,
          success: false,
          data: null,
          error: true,
          errorMessage: error.message || "Internal Server Error!",
        })
      );
    }
  };
};

// Actions: Clear Counts.
export const clearCounts = () => countsReset();

// Actions: Books by authors.
export const booksByAuthors = (payload) => {
  return async (dispatch) => {
    dispatch(
      booksByAuthorsStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    try {
      const { startDate, endDate } = payload;
      const result = await ApiClient.post(`reports/books`, {
        startDate,
        endDate,
        type: "BY_AUTHORS",
      });
      if (result.data?.success) {
        const { books } = result.data.data;
        dispatch(
          booksByAuthorsSuccess({
            loading: false,
            success: true,
            data: { books },
            error: false,
            errorMessage: null,
          })
        );
      } else {
        dispatch(
          booksByAuthorsFailed({
            loading: false,
            success: false,
            data: null,
            error: true,
            errorMessage: result.data?.error || "Internal Server  Error!",
          })
        );
      }
    } catch (error) {
      dispatch(
        booksByAuthorsFailed({
          loading: false,
          success: false,
          data: null,
          error: true,
          errorMessage: error.message || "Internal Server  Error!",
        })
      );
    }
  };
};

// Actions: Clear Books by authors.
export const clearBooksByAuthors = () => booksByAuthorsReset();

// Actions: Books by genres.
export const booksByGenres = (payload) => {
  return async (dispatch) => {
    dispatch(
      booksByGenresStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    try {
      const { startDate, endDate } = payload;
      const result = await ApiClient.post(`reports/books`, {
        startDate,
        endDate,
        type: "BY_GENRES",
      });
      if (result.data?.success) {
        const { books } = result.data.data;
        dispatch(
          booksByGenresSuccess({
            loading: false,
            success: true,
            data: { books },
            error: false,
            errorMessage: null,
          })
        );
      } else {
        dispatch(
          booksByGenresFailed({
            loading: false,
            success: false,
            data: null,
            error: true,
            errorMessage: result.data?.error || "Internal Server  Error!",
          })
        );
      }
    } catch (error) {
      dispatch(
        booksByGenresFailed({
          loading: false,
          success: false,
          data: null,
          error: true,
          errorMessage: error.message || "Internal Server  Error!",
        })
      );
    }
  };
};

// Actions: Clear Books by genres.
export const clearBooksByGenres = () => booksByGenresReset();

// Actions: Books by genres.
export const paymentsByReaders = (payload) => {
  return async (dispatch) => {
    dispatch(
      paymentsByReadersStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    try {
      const { startDate, endDate } = payload;
      const result = await ApiClient.post(`reports/payments`, {
        startDate,
        endDate,
        type: "BY_READERS",
      });
      if (result.data?.success) {
        const { payments } = result.data.data;
        dispatch(
          paymentsByReadersSuccess({
            loading: false,
            success: true,
            data: { payments },
            error: false,
            errorMessage: null,
          })
        );
      } else {
        dispatch(
          paymentsByReadersFailed({
            loading: false,
            success: false,
            data: null,
            error: true,
            errorMessage: result.data?.error || "Internal Server  Error!",
          })
        );
      }
    } catch (error) {
      dispatch(
        paymentsByReadersFailed({
          loading: false,
          success: false,
          data: null,
          error: true,
          errorMessage: error.message || "Internal Server  Error!",
        })
      );
    }
  };
};

// Actions: Clear Payments by Readers.
export const clearPaymentsByReaders = () => paymentsByReadersReset();
