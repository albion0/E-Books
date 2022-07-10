// Imports: local files.
import ApiClient from "../../services/ApiClient";

// Action Types: Get All Books.
export const GET_ALL_BOOKS_START = "GET_ALL_BOOKS_START";
export const GET_ALL_BOOKS_SUCCESS = "GET_ALL_BOOKS_SUCCESS";
export const GET_ALL_BOOKS_FAILED = "GET_ALL_BOOKS_FAILED";
export const GET_ALL_BOOKS_RESET = "GET_ALL_BOOKS_RESET";

// Action Types: Get One Book.
export const GET_ONE_BOOK_START = "GET_ONE_BOOK_START";
export const GET_ONE_BOOK_SUCCESS = "GET_ONE_BOOK_SUCCESS";
export const GET_ONE_BOOK_FAILED = "GET_ONE_BOOK_FAILED";
export const GET_ONE_BOOK_RESET = "GET_ONE_BOOK_RESET";

// Action Types: Create New Book.
export const CREATE_BOOK_START = "CREATE_BOOK_START";
export const CREATE_BOOK_SUCCESS = "CREATE_BOOK_SUCCESS";
export const CREATE_BOOK_FAILED = "CREATE_BOOK_FAILED";
export const CREATE_BOOK_RESET = "CREATE_BOOK_RESET";

// Action Types: Upload Photo Book
export const UPLOAD_PHOTO_BOOK_START = "UPLOAD_PHOTO_BOOK_START";
export const UPLOAD_PHOTO_BOOK_SUCCESS = "UPLOAD_PHOTO_BOOK_SUCCESS";
export const UPLOAD_PHOTO_BOOK_FAILED = "UPLOAD_PHOTO_BOOK_FAILED";
export const UPLOAD_PHOTO_BOOK_RESET = "UPLOAD_PHOTO_BOOK_RESET";

// Action Types: Update One Book.
export const UPDATE_ONE_BOOK_START = "UPDATE_ONE_BOOK_START";
export const UPDATE_ONE_BOOK_SUCCESS = "UPDATE_ONE_BOOK_SUCCESS";
export const UPDATE_ONE_BOOK_FAILED = "UPDATE_ONE_BOOK_FAILED";
export const UPDATE_ONE_BOOK_RESET = "UPDATE_ONE_BOOK_RESET";

// Action Types: Delete One Book.
export const DELETE_ONE_BOOK_START = "DELETE_ONE_BOOK_START";
export const DELETE_ONE_BOOK_SUCCESS = "DELETE_ONE_BOOK_SUCCESS";
export const DELETE_ONE_BOOK_FAILED = "DELETE_ONE_BOOK_FAILED";
export const DELETE_ONE_BOOK_RESET = "DELETE_ONE_BOOK_RESET";

// Action Types: Buy One Book.
export const BUY_ONE_BOOK_START = "BUY_ONE_BOOK_START";
export const BUY_ONE_BOOK_SUCCESS = "BUY_ONE_BOOK_SUCCESS";
export const BUY_ONE_BOOK_FAILED = "BUY_ONE_BOOK_FAILED";
export const BUY_ONE_BOOK_RESET = "DELETE_ONE_BOOK_RESET";

// Action Types: Users Books.
export const GET_USER_BOOKS_START = "GET_USER_BOOKS_START";
export const GET_USER_BOOKS_SUCCESS = "GET_USER_BOOKS_SUCCESS";
export const GET_USER_BOOKS_FAILED = "GET_USER_BOOKS_FAILED";
export const GET_USER_BOOKS_RESET = "GET_USER_BOOKS_RESET";

// Action Types: Book Review.
export const CREATE_BOOK_REVIEW_START = "CREATE_BOOK_REVIEW_START";
export const CREATE_BOOK_REVIEW_SUCCESS = "CREATE_BOOK_REVIEW_SUCCESS";
export const CREATE_BOOK_REVIEW_FAILED = "CREATE_BOOK_REVIEW_FAILED";
export const CREATE_BOOK_REVIEW_RESET = "CREATE_BOOK_REVIEW_RESET";

// Action Types: Get Book Reviews.
export const GET_ALL_BOOK_REVIEWS_START = "GET_ALL_BOOK_REVIEWS_START";
export const GET_ALL_BOOK_REVIEWS_SUCCESS = "GET_ALL_BOOK_REVIEWS_SUCCESS";
export const GET_ALL_BOOK_REVIEWS_FAILED = "GET_ALL_BOOK_REVIEWS_FAILED";
export const GET_ALL_BOOK_REVIEWS_RESET = "GET_ALL_BOOK_REVIEWS_RESET";

// Action Creators: Get All Books.
const getAllBooksStart = (payload) => ({
  type: GET_ALL_BOOKS_START,
  payload,
});
const getAllBooksSuccess = (payload) => ({
  type: GET_ALL_BOOKS_SUCCESS,
  payload,
});
const getAllBooksFailed = (payload) => ({
  type: GET_ALL_BOOKS_FAILED,
  payload,
});
const getAllBooksReset = () => ({ type: GET_ALL_BOOKS_RESET });

// Action Creators: Get One Book.
const getOneBookStart = (payload) => ({
  type: GET_ONE_BOOK_START,
  payload,
});
const getOneBookSuccess = (payload) => ({
  type: GET_ONE_BOOK_SUCCESS,
  payload,
});
const getOneBookFailed = (payload) => ({
  type: GET_ONE_BOOK_FAILED,
  payload,
});
const getOneBookReset = () => ({ type: GET_ONE_BOOK_RESET });

// Action Creators: Create New Book.
const createBookStart = (payload) => ({
  type: CREATE_BOOK_START,
  payload,
});
const createBookSuccess = (payload) => ({
  type: CREATE_BOOK_SUCCESS,
  payload,
});
const createBookFailed = (payload) => ({
  type: CREATE_BOOK_FAILED,
  payload,
});
const createBookReset = () => ({ type: CREATE_BOOK_RESET });

// Action Creators: Upload Photo Book
const uploadPhotoBookStart = (payload) => ({
  type: UPLOAD_PHOTO_BOOK_START,
  payload,
});
const uploadPhotoBookSuccess = (payload) => ({
  type: UPLOAD_PHOTO_BOOK_SUCCESS,
  payload,
});
const uploadPhotoBookFailed = (payload) => ({
  type: UPLOAD_PHOTO_BOOK_FAILED,
  payload,
});
const uploadPhotoBookReset = () => ({
  type: UPLOAD_PHOTO_BOOK_START,
});

// Action Creators: Update One Book.
const updateOneBookStart = (payload) => ({
  type: UPDATE_ONE_BOOK_START,
  payload,
});
const updateOneBookSuccess = (payload) => ({
  type: UPDATE_ONE_BOOK_SUCCESS,
  payload,
});
const updateOneBookFailed = (payload) => ({
  type: UPDATE_ONE_BOOK_FAILED,
  payload,
});
const updateOneBookReset = () => ({
  type: UPDATE_ONE_BOOK_RESET,
});

// Action Creators: Delete One Book.
const deleteOneBookStart = (payload) => ({
  type: DELETE_ONE_BOOK_START,
  payload,
});
const deleteOneBookSuccess = (payload) => ({
  type: DELETE_ONE_BOOK_SUCCESS,
  payload,
});
const deleteOneBookFailed = (payload) => ({
  type: DELETE_ONE_BOOK_FAILED,
  payload,
});
const deleteOneBookReset = () => ({
  type: DELETE_ONE_BOOK_RESET,
});

// Action Creators: Buy One Book.
const buyOneBookStart = (payload) => ({
  type: BUY_ONE_BOOK_START,
  payload,
});
const buyOneBookSuccess = (payload) => ({
  type: BUY_ONE_BOOK_SUCCESS,
  payload,
});
const buyOneBookFailed = (payload) => ({
  type: BUY_ONE_BOOK_FAILED,
  payload,
});

const buyOneBookReset = () => ({
  type: BUY_ONE_BOOK_RESET,
});

// Action Creators: User books.
const getUserBooksStart = (payload) => ({
  type: GET_USER_BOOKS_START,
  payload,
});
const getUserBooksSuccess = (payload) => ({
  type: GET_USER_BOOKS_SUCCESS,
  payload,
});
const getUserBooksFailed = (payload) => ({
  type: GET_USER_BOOKS_FAILED,
  payload,
});
const getUserBooksReset = () => ({
  type: GET_USER_BOOKS_RESET,
});

// Action Creators: Review.
const createBookReviewStart = (payload) => ({
  type: CREATE_BOOK_REVIEW_START,
  payload,
});
const createBookReviewSuccess = (payload) => ({
  type: CREATE_BOOK_REVIEW_SUCCESS,
  payload,
});
const createBookReviewFailed = (payload) => ({
  type: CREATE_BOOK_REVIEW_FAILED,
  payload,
});
const createBookReviewReset = () => ({
  type: CREATE_BOOK_REVIEW_RESET,
});

// Action Creators: Get Book Reviews.
const getAllBookReviewsStart = (payload) => ({
  type: GET_ALL_BOOK_REVIEWS_START,
  payload,
});
const getAllBookReviewsSuccess = (payload) => ({
  type: GET_ALL_BOOK_REVIEWS_SUCCESS,
  payload,
});
const getAllBookReviewsFailed = (payload) => ({
  type: GET_ALL_BOOK_REVIEWS_FAILED,
  payload,
});
const getAllBookReviewsReset = () => ({ type: GET_ALL_BOOK_REVIEWS_RESET });

// Actions: Get All Books.
export const getAllBooks = (payload) => {
  return async (dispatch) => {
    dispatch(
      getAllBooksStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    try {
      const {
        page,
        limit,
        pagination,
        bookName,
        bookCredits,
        authors,
        genres,
      } = payload;
      const result = await ApiClient.get("books", {
        params: {
          page,
          limit,
          pagination,
          bookName,
          bookCredits,
          authors,
          genres,
        },
      });
      if (result.data?.success) {
        const { books } = result.data.data;
        dispatch(
          getAllBooksSuccess({
            loading: false,
            success: true,
            data: { books },
            error: false,
            errorMessage: null,
          })
        );
      } else {
        dispatch(
          getAllBooksFailed({
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
        getAllBooksFailed({
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

// Actions: Clear Get All Books.
export const clearGetAllBooks = () => getAllBooksReset();

// Actions: Get One Book.
export const getOneBook = (payload) => {
  return async (dispatch) => {
    dispatch(
      getOneBookStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    try {
      const { bookId } = payload;
      const result = await ApiClient.get(`books/${bookId}`);
      if (result.data?.success) {
        const { book } = result.data.data;
        dispatch(
          getOneBookSuccess({
            loading: false,
            success: true,
            data: { book },
            error: false,
            errorMessage: null,
          })
        );
      } else {
        dispatch(
          getOneBookFailed({
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
        getOneBookFailed({
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

// Actions: Clear Get One Book.
export const clearGetOneBook = () => getOneBookReset();

// Actions: Create New Book.
export const createBook = (payload, options) => {
  return async (dispatch) => {
    dispatch(
      createBookStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    const { title, content, authors, genres, credits } = payload;
    const {
      showToast,
      toastNotification,
      history,
      pathname,
      onSuccessMessage,
      onFailMessage,
      onBookExistsMessage,
    } = options;

    try {
      const result = await ApiClient.post("books", {
        title,
        content,
        authors,
        genres,
        credits,
      });
      if (result.data?.success) {
        const { book } = result.data.data;
        dispatch(
          createBookSuccess({
            loading: false,
            success: true,
            data: { book },
            error: false,
            errorMessage: null,
          })
        );
        showToast && toastNotification("success", onSuccessMessage);
      } else {
        dispatch(
          createBookFailed({
            loading: false,
            success: false,
            data: null,
            error: true,
            errorMessage: result.data?.error || "Internal Server Error!",
          })
        );
        toastNotification("error", onFailMessage);
      }
    } catch (error) {
      dispatch(
        createBookFailed({
          loading: false,
          success: false,
          data: null,
          error: true,
          errorMessage: error.message || "Internal Server Error!",
        })
      );
      const bookExists = "BOOK_EXISTS";
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.errorType &&
        error.response.data.errorType === bookExists
      ) {
        toastNotification("error", onBookExistsMessage);
      } else {
        toastNotification("error", onFailMessage);
      }
    }
  };
};

// Actions: Clear Create New Book.
export const clearCreateNewBook = () => createBookReset();

export const uploadPhotoBook = (payload, options, showSwal = false) => {
  return async (dispatch) => {
    dispatch(
      uploadPhotoBookStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    const {
      showToast,
      toastNotification,
      shouldRedirect,
      history,
      pathname,
      onSuccessMessage,
      onFailMessage,
    } = options;
    try {
      const { bookId, formData } = payload;
      const result = await ApiClient.put(`books/${bookId}/photo`, formData);
      if (result.data?.success) {
        const { book } = result.data?.data;
        dispatch(
          uploadPhotoBookSuccess({
            loading: false,
            success: true,
            data: { book },
            error: false,
            errorMessage: null,
          })
        );
        showToast && toastNotification("success", onSuccessMessage);
        shouldRedirect && history.push(pathname);
        // if (showSwal) {
        //   const swalOptions = {
        //     title: `Book added successfully!`,
        //     text: `Readers can now buy this book!`,
        //     icon: "success",
        //     showCancelButton: false,
        //     confirmButtonColor: "#023142",
        //     cancelButtonColor: "#ff4d4f",
        //     confirmButtonText: "OK",
        //   };
        //   Swal.fire(swalOptions).then(
        //     (result) =>
        //       result.isConfirmed && shouldRedirect && history.push(pathname)
        //   );
        // } else {
        //   showToast && toastNotification("success", onSuccessMessage);
        //   shouldRedirect && history.push(pathname);
        // }
      } else {
        dispatch(
          uploadPhotoBookFailed({
            loading: false,
            success: false,
            data: null,
            error: true,
            errorMessage: result.data?.error || "Internal Server Error!",
          })
        );
        showToast && toastNotification("error", onFailMessage);
      }
    } catch (error) {
      dispatch(
        uploadPhotoBookFailed({
          loading: false,
          success: false,
          data: null,
          error: true,
          errorMessage: error.message || "Internal Server Error!",
        })
      );
      showToast && toastNotification("error", onFailMessage);
    }
  };
};

// Actions: Clear Upload Photo.
export const clearUploadPhotoBook = () => uploadPhotoBookReset();

// Actions: Update One Book.
export const updateOneBook = (payload, options) => {
  return async (dispatch) => {
    dispatch(
      updateOneBookStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    const { bookId, title, content, authors, genres, credits } = payload;
    const {
      showToast,
      toastNotification,
      history,
      pathname,
      onSuccessMessage,
      onFailMessage,
    } = options;

    try {
      const result = await ApiClient.put(`books/${bookId}`, {
        title,
        content,
        authors,
        genres,
        credits,
      });
      if (result.data?.success) {
        const { book } = result.data.data;
        dispatch(
          updateOneBookSuccess({
            loading: false,
            success: true,
            data: { book },
            error: false,
            errorMessage: null,
          })
        );
        showToast && toastNotification("success", onSuccessMessage);
      } else {
        dispatch(
          updateOneBookFailed({
            loading: false,
            success: false,
            data: null,
            error: true,
            errorMessage: result.data?.error || "Internal Server Error!",
          })
        );
        toastNotification("error", onFailMessage);
      }
    } catch (error) {
      dispatch(
        updateOneBookFailed({
          loading: false,
          success: false,
          data: null,
          error: true,
          errorMessage: error.message || "Internal Server Error!",
        })
      );
      toastNotification("error", onFailMessage);
    }
  };
};

// Actions: Clear Update One Book.
export const clearUpdateOneBook = () => updateOneBookReset();

// Actions: Delete One Book.
export const deleteOneBook = (payload) => {
  return async (dispatch) => {
    dispatch(
      deleteOneBookStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    try {
      const { bookId } = payload;
      const result = await ApiClient.delete(`books/${bookId}`);
      if (result.data?.success) {
        const { book } = result.data.data;
        dispatch(
          deleteOneBookSuccess({
            loading: false,
            success: true,
            data: { book },
            error: false,
            errorMessage: null,
          })
        );
      } else {
        dispatch(
          deleteOneBookFailed({
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
        deleteOneBookFailed({
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

// Actions: Clear Delete One Book.
export const cleareDeleteOneBook = () => deleteOneBookReset();

// Actions: Buy one Book
export const buyBook = (payload) => {
  return async (dispatch) => {
    dispatch(
      buyOneBookStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    try {
      const { bookId, userId } = payload;
      const result = await ApiClient.post(`books/${bookId}/${userId}`);

      if (result.data?.success) {
        dispatch(
          buyOneBookSuccess({
            loading: false,
            success: true,
            data: { book: true },
            error: false,
            errorMessage: null,
          })
        );
      } else {
        dispatch(
          buyOneBookFailed({
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
        buyOneBookFailed({
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

// Actions: User Books
export const getUserBooks = (payload) => {
  return async (dispatch) => {
    dispatch(
      getUserBooksStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    try {
      const { userId, page, limit } = payload;

      const result = await ApiClient.get(`books/${userId}/${page}/${limit}`);

      if (result.data?.success) {
        dispatch(
          getUserBooksSuccess({
            loading: false,
            success: true,
            data: {
              books: result.data.data.books,
              totalItems: result.data.data.totalItems,
            },
            error: false,
            errorMessage: null,
          })
        );
      } else {
        dispatch(
          getUserBooksFailed({
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
        getUserBooksFailed({
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

// Actions: Book Review
export const createBookReview = (payload, options) => {
  return async (dispatch) => {
    dispatch(
      createBookReviewStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    const { userId, bookId, title, description, rating, page, limit } = payload;
    const {
      toastNotification,
      history,
      pathname,
      onSuccessMessage,
      onFailMessage,
    } = options;

    try {
      const result = await ApiClient.post(`books/${bookId}/${userId}/review`, {
        title,
        description,
        rating,
        page,
        limit
      });
      console.log('result is')
      console.log(result);

      if (result.data?.success) {
        dispatch(
          createBookReviewSuccess({
            loading: false,
            success: true,
            data: { reviews: result.data.data.reviews, totalItems: result.data.data.totalItems },
            error: false,
            errorMessage: null,
          })
        );

        toastNotification("success", onSuccessMessage);
      } else {
        dispatch(
          createBookReviewFailed({
            loading: false,
            success: false,
            data: null,
            error: true,
            errorMessage: result.data?.error || "Internal Server Error!",
          })
        );

        toastNotification("error", onFailMessage);
      }
    } catch (error) {
      dispatch(
        createBookReviewFailed({
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

// Actions: Get All Book Reviews
export const getAllBookReviews = (payload) => {
  return async (dispatch) => {
    dispatch(
      getAllBookReviewsStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    const { bookId, page, limit } = payload;

    try {
      const result = await ApiClient.get(`books/${bookId}/reviews`, {
        params: { page, limit },
      });
      console.log(result);

      if (result.data?.success) {
        dispatch(
          getAllBookReviewsSuccess({
            loading: false,
            success: true,
            data: {
              reviews: result.data.data.reviews,
              totalItems: result.data.data.totalItems,
            },
            error: false,
            errorMessage: null,
          })
        );
      } else {
        dispatch(
          getAllBookReviewsFailed({
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
        getAllBookReviewsFailed({
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
