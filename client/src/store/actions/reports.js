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

// Action Types: Book purchases by readers stats.
export const BOOKPURCHASES_BY_READERS_START = "BOOKPURCHASES_BY_READERS_START";
export const BOOKPURCHASES_BY_READERS_SUCCESS =
  "BOOKPURCHASES_BY_READERS_SUCCESS";
export const BOOKPURCHASES_BY_READERS_FAILED =
  "BOOKPURCHASES_BY_READERS_FAILED";
export const BOOKPURCHASES_BY_READERS_RESET = "BOOKPURCHASES_BY_READERS_RESET";

// Action Types: Book purchases by Books stats.
export const BOOKPURCHASES_BY_BOOKS_START = "BOOKPURCHASES_BY_BOOKS_START";
export const BOOKPURCHASES_BY_BOOKS_SUCCESS = "BOOKPURCHASES_BY_BOOKS_SUCCESS";
export const BOOKPURCHASES_BY_BOOKS_FAILED = "BOOKPURCHASES_BY_BOOKS_FAILED";
export const BOOKPURCHASES_BY_BOOKS_RESET = "BOOKPURCHASES_BY_BOOKS_RESET";

// Action Types: Reviews by readers stats.
export const REVIEWS_BY_READERS_START = "REVIEWS_BY_READERS_START";
export const REVIEWS_BY_READERS_SUCCESS = "REVIEWS_BY_READERS_SUCCESS";
export const REVIEWS_BY_READERS_FAILED = "REVIEWS_BY_READERS_FAILED";
export const REVIEWS_BY_READERS_RESET = "REVIEWS_BY_READERS_RESET";

// Action Types: Book purchases by Books stats.
export const REVIEWS_BY_BOOKS_START = "REVIEWS_BY_BOOKS_START";
export const REVIEWS_BY_BOOKS_SUCCESS = "REVIEWS_BY_BOOKS_SUCCESS";
export const REVIEWS_BY_BOOKS_FAILED = "REVIEWS_BY_BOOKS_FAILED";
export const REVIEWS_BY_BOOKS_RESET = "REVIEWS_BY_BOOKS_RESET";

// Action Types: Forum Topics stats.
export const FORUM_TOPICS_BY_READERS_START = "FORUM_TOPICS_BY_READERS_START";
export const FORUM_TOPICS_BY_READERS_SUCCESS =
  "FORUM_TOPICS_BY_READERS_SUCCESS";
export const FORUM_TOPICS_BY_READERS_FAILED = "FORUM_TOPICS_BY_READERS_FAILED";
export const FORUM_TOPICS_BY_READERS_RESET = "FORUM_TOPICS_BY_READERS_RESET";

// Action Types: Forum Comments stats.
export const FORUM_COMMENTS_BY_READERS_START =
  "FORUM_COMMENTS_BY_READERS_START";
export const FORUM_COMMENTS_BY_READERS_SUCCESS =
  "FORUM_COMMENTS_BY_READERS_SUCCESS";
export const FORUM_COMMENTS_BY_READERS_FAILED =
  "FORUM_COMMENTS_BY_READERS_FAILED";
export const FORUM_COMMENTS_BY_READERS_RESET =
  "FORUM_COMMENTS_BY_READERS_RESET";

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

// Action Creators: Book purchases by readers.
const bookPurchasesByReadersStart = (payload) => ({
  type: BOOKPURCHASES_BY_READERS_START,
  payload,
});
const bookPurchasesByReadersSuccess = (payload) => ({
  type: BOOKPURCHASES_BY_READERS_SUCCESS,
  payload,
});
const bookPurchasesByReadersFailed = (payload) => ({
  type: BOOKPURCHASES_BY_READERS_FAILED,
  payload,
});
const bookPurchasesByReadersReset = () => ({
  type: BOOKPURCHASES_BY_READERS_RESET,
});

// Action Creators: Book purchases by books stats.
const bookPurchasesByBooksStart = (payload) => ({
  type: BOOKPURCHASES_BY_BOOKS_START,
  payload,
});
const bookPurchasesByBooksSuccess = (payload) => ({
  type: BOOKPURCHASES_BY_BOOKS_SUCCESS,
  payload,
});
const bookPurchasesByBooksFailed = (payload) => ({
  type: BOOKPURCHASES_BY_BOOKS_FAILED,
  payload,
});
const bookPurchasesByBooksReset = () => ({
  type: BOOKPURCHASES_BY_BOOKS_RESET,
});

// Action Creators: Book purchases by readers.
const reviewsByReadersStart = (payload) => ({
  type: REVIEWS_BY_READERS_START,
  payload,
});
const reviewsByReadersSuccess = (payload) => ({
  type: REVIEWS_BY_READERS_SUCCESS,
  payload,
});
const reviewsByReadersFailed = (payload) => ({
  type: REVIEWS_BY_READERS_FAILED,
  payload,
});
const reviewsByReadersReset = () => ({
  type: REVIEWS_BY_READERS_RESET,
});

// Action Creators: Book purchases by books stats.
const reviewsByBooksStart = (payload) => ({
  type: REVIEWS_BY_BOOKS_START,
  payload,
});
const reviewsByBooksSuccess = (payload) => ({
  type: REVIEWS_BY_BOOKS_SUCCESS,
  payload,
});
const reviewsByBooksFailed = (payload) => ({
  type: REVIEWS_BY_BOOKS_FAILED,
  payload,
});
const reviewsByBooksReset = () => ({
  type: REVIEWS_BY_BOOKS_RESET,
});

// Action Creators: Book purchases by readers.
const forumTopicsByReadersStart = (payload) => ({
  type: FORUM_TOPICS_BY_READERS_START,
  payload,
});
const forumTopicsByReadersSuccess = (payload) => ({
  type: FORUM_TOPICS_BY_READERS_SUCCESS,
  payload,
});
const forumTopicsByReadersFailed = (payload) => ({
  type: FORUM_TOPICS_BY_READERS_FAILED,
  payload,
});
const forumTopicsByReadersReset = () => ({
  type: FORUM_TOPICS_BY_READERS_RESET,
});

// Action Creators: Book purchases by books stats.
const forumCommentsByReadersStart = (payload) => ({
  type: FORUM_COMMENTS_BY_READERS_START,
  payload,
});
const forumCommentsByReadersSuccess = (payload) => ({
  type: FORUM_COMMENTS_BY_READERS_SUCCESS,
  payload,
});
const forumCommentsByReadersFailed = (payload) => ({
  type: FORUM_COMMENTS_BY_READERS_FAILED,
  payload,
});
const forumCommentsByReadersReset = () => ({
  type: FORUM_COMMENTS_BY_READERS_RESET,
});

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

// Actions: Book purchases by readers.
export const bookPurchasesByReaders = (payload) => {
  return async (dispatch) => {
    dispatch(
      bookPurchasesByReadersStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    try {
      const { startDate, endDate } = payload;
      const result = await ApiClient.post(`reports/bookPurchases`, {
        startDate,
        endDate,
        type: "BY_READERS",
      });
      if (result.data?.success) {
        const { bookPurchases } = result.data.data;
        dispatch(
          bookPurchasesByReadersSuccess({
            loading: false,
            success: true,
            data: { bookPurchases },
            error: false,
            errorMessage: null,
          })
        );
      } else {
        dispatch(
          bookPurchasesByReadersFailed({
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
        bookPurchasesByReadersFailed({
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

// Actions: Clear Book Purhcases by readers.
export const clearBookPurchasesByReaders = () => bookPurchasesByReadersReset();

// Actions: Book purchases by books.
export const bookPurchasesByBooks = (payload) => {
  return async (dispatch) => {
    dispatch(
      bookPurchasesByBooksStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    try {
      const { startDate, endDate } = payload;
      const result = await ApiClient.post(`reports/bookPurchases`, {
        startDate,
        endDate,
        type: "BY_BOOKS",
      });
      if (result.data?.success) {
        const { bookPurchases } = result.data.data;
        dispatch(
          bookPurchasesByBooksSuccess({
            loading: false,
            success: true,
            data: { bookPurchases },
            error: false,
            errorMessage: null,
          })
        );
      } else {
        dispatch(
          bookPurchasesByBooksFailed({
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
        bookPurchasesByBooksFailed({
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

// Actions: Clear Book Purchases by books.
export const clearBookPurchasesByBooks = () => bookPurchasesByBooksReset();

// Actions: Reviews by readers.
export const reviewsByReaders = (payload) => {
  return async (dispatch) => {
    dispatch(
      reviewsByReadersStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    try {
      const { startDate, endDate } = payload;
      const result = await ApiClient.post(`reports/reviews`, {
        startDate,
        endDate,
        type: "BY_READERS",
      });
      if (result.data?.success) {
        const { reviews } = result.data.data;
        dispatch(
          reviewsByReadersSuccess({
            loading: false,
            success: true,
            data: { reviews },
            error: false,
            errorMessage: null,
          })
        );
      } else {
        dispatch(
          reviewsByReadersFailed({
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
        reviewsByReadersFailed({
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

// Actions: Clear Reviews by readers.
export const clearReviewsByReaders = () => reviewsByReadersReset();

// Actions: Reviews by books.
export const reviewsByBooks = (payload) => {
  return async (dispatch) => {
    dispatch(
      reviewsByBooksStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    try {
      const { startDate, endDate } = payload;
      const result = await ApiClient.post(`reports/reviews`, {
        startDate,
        endDate,
        type: "BY_BOOKS",
      });
      if (result.data?.success) {
        const { reviews } = result.data.data;
        dispatch(
          reviewsByBooksSuccess({
            loading: false,
            success: true,
            data: { reviews },
            error: false,
            errorMessage: null,
          })
        );
      } else {
        dispatch(
          reviewsByBooksFailed({
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
        reviewsByBooksFailed({
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

// Actions: Clear Reviews by books.
export const clearReviewsByBooks = () => reviewsByBooksReset();

// Actions: Forum Topics.
export const forumTopicsByReaders = (payload) => {
  return async (dispatch) => {
    dispatch(
      forumTopicsByReadersStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    try {
      const { startDate, endDate } = payload;
      const result = await ApiClient.post(`reports/forum`, {
        startDate,
        endDate,
        type: "FORUM_TOPICS",
      });
      if (result.data?.success) {
        const { forumTopics } = result.data.data;
        dispatch(
          forumTopicsByReadersSuccess({
            loading: false,
            success: true,
            data: { forumTopics },
            error: false,
            errorMessage: null,
          })
        );
      } else {
        dispatch(
          forumTopicsByReadersFailed({
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
        forumTopicsByReadersFailed({
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

// Actions: Clear Reviews by readers.
export const clearForumTopicsByReaders = () => forumTopicsByReadersReset();

// Actions: Reviews by books.
export const forumCommentsByReaders = (payload) => {
  return async (dispatch) => {
    dispatch(
      forumCommentsByReadersStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    try {
      const { startDate, endDate } = payload;
      const result = await ApiClient.post(`reports/forum`, {
        startDate,
        endDate,
        type: "FORUM_COMMENTS",
      });
      if (result.data?.success) {
        const { forumComments } = result.data.data;
        dispatch(
          forumCommentsByReadersSuccess({
            loading: false,
            success: true,
            data: { forumComments },
            error: false,
            errorMessage: null,
          })
        );
      } else {
        dispatch(
          forumCommentsByReadersFailed({
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
        forumCommentsByReadersFailed({
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

// Actions: Clear Reviews by books.
export const clearForumCommentsByReaders = () => forumCommentsByReadersReset();
