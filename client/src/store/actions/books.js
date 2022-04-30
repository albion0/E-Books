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
      const { page, limit, pagination } = payload;
      const result = await ApiClient.get("books", {
        params: { page, limit, pagination },
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

    const { title, content, author, genre, credits } = payload;
    const {
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
        author,
        genre,
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
        toastNotification("success", onSuccessMessage);
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

    const { bookId, title, content, author, genre, credits } = payload;
    const {
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
        author,
        genre,
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
        toastNotification("success", onSuccessMessage);
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
