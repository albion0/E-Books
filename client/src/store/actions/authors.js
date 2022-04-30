// Imports: local files.
import ApiClient from "../../services/ApiClient";

// Action Types: Get All Authors.
export const GET_ALL_AUTHORS_START = "GET_ALL_AUTHORS_START";
export const GET_ALL_AUTHORS_SUCCESS = "GET_ALL_AUTHORS_SUCCESS";
export const GET_ALL_AUTHORS_FAILED = "GET_ALL_AUTHORS_FAILED";
export const GET_ALL_AUTHORS_RESET = "GET_ALL_AUTHORS_RESET";

// Action Types: Get One Author.
export const GET_ONE_AUTHOR_START = "GET_ONE_AUTHOR_START";
export const GET_ONE_AUTHOR_SUCCESS = "GET_ONE_AUTHOR_SUCCESS";
export const GET_ONE_AUTHOR_FAILED = "GET_ONE_AUTHOR_FAILED";
export const GET_ONE_AUTHOR_RESET = "GET_ONE_AUTHOR_RESET";

// Action Types: Create New Author.
export const CREATE_AUTHOR_START = "CREATE_AUTHOR_START";
export const CREATE_AUTHOR_SUCCESS = "CREATE_AUTHOR_SUCCESS";
export const CREATE_AUTHOR_FAILED = "CREATE_AUTHOR_FAILED";
export const CREATE_AUTHOR_RESET = "CREATE_AUTHOR_RESET";

// Action Types: Update One Author.
export const UPDATE_ONE_AUTHOR_START = "UPDATE_ONE_AUTHOR_START";
export const UPDATE_ONE_AUTHOR_SUCCESS = "UPDATE_ONE_AUTHOR_SUCCESS";
export const UPDATE_ONE_AUTHOR_FAILED = "UPDATE_ONE_AUTHOR_FAILED";
export const UPDATE_ONE_AUTHOR_RESET = "UPDATE_ONE_AUTHOR_RESET";

// Action Types: Delete One Author.
export const DELETE_ONE_AUTHOR_START = "DELETE_ONE_AUTHOR_START";
export const DELETE_ONE_AUTHOR_SUCCESS = "DELETE_ONE_AUTHOR_SUCCESS";
export const DELETE_ONE_AUTHOR_FAILED = "DELETE_ONE_AUTHOR_FAILED";
export const DELETE_ONE_AUTHOR_RESET = "DELETE_ONE_AUTHOR_RESET";

// Action Creators: Get All Authors.
const getAllAuthorsStart = (payload) => ({
  type: GET_ALL_AUTHORS_START,
  payload,
});
const getAllAuthorsSuccess = (payload) => ({
  type: GET_ALL_AUTHORS_SUCCESS,
  payload,
});
const getAllAuthorsFailed = (payload) => ({
  type: GET_ALL_AUTHORS_FAILED,
  payload,
});
const getAllAuthorsReset = () => ({ type: GET_ALL_AUTHORS_RESET });

// Action Creators: Get One Author.
const getOneAuthorStart = (payload) => ({
  type: GET_ONE_AUTHOR_START,
  payload,
});
const getOneAuthorSuccess = (payload) => ({
  type: GET_ONE_AUTHOR_SUCCESS,
  payload,
});
const getOneAuthorFailed = (payload) => ({
  type: GET_ONE_AUTHOR_FAILED,
  payload,
});
const getOneAuthorReset = () => ({ type: GET_ONE_AUTHOR_RESET });

// Action Creators: Create New Author.
const createAuthorStart = (payload) => ({
  type: CREATE_AUTHOR_START,
  payload,
});
const createAuthorSuccess = (payload) => ({
  type: CREATE_AUTHOR_SUCCESS,
  payload,
});
const createAuthorFailed = (payload) => ({
  type: CREATE_AUTHOR_FAILED,
  payload,
});
const createAuthorReset = () => ({ type: CREATE_AUTHOR_RESET });

// Action Creators: Update One Author.
const updateOneAuthorStart = (payload) => ({
  type: UPDATE_ONE_AUTHOR_START,
  payload,
});
const updateOneAuthorSuccess = (payload) => ({
  type: UPDATE_ONE_AUTHOR_SUCCESS,
  payload,
});
const updateOneAuthorFailed = (payload) => ({
  type: UPDATE_ONE_AUTHOR_FAILED,
  payload,
});
const updateOneAuthorReset = () => ({
  type: UPDATE_ONE_AUTHOR_RESET,
});

// Action Creators: Delete One Author.
const deleteOneAuthorStart = (payload) => ({
  type: DELETE_ONE_AUTHOR_START,
  payload,
});
const deleteOneAuthorSuccess = (payload) => ({
  type: DELETE_ONE_AUTHOR_SUCCESS,
  payload,
});
const deleteOneAuthorFailed = (payload) => ({
  type: DELETE_ONE_AUTHOR_FAILED,
  payload,
});
const deleteOneAuthorReset = () => ({
  type: DELETE_ONE_AUTHOR_RESET,
});

// Actions: Get All Authors.
export const getAllAuthors = (payload) => {
  return async (dispatch) => {
    dispatch(
      getAllAuthorsStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    try {
      const { page, limit, pagination } = payload;
      const result = await ApiClient.get("authors", {
        params: { page, limit, pagination },
      });
      if (result.data?.success) {
        const { authors } = result.data.data;
        dispatch(
          getAllAuthorsSuccess({
            loading: false,
            success: true,
            data: { authors },
            error: false,
            errorMessage: null,
          })
        );
      } else {
        dispatch(
          getAllAuthorsFailed({
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
        getAllAuthorsFailed({
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

// Actions: Clear Get All Authors.
export const clearGetAllAuthors = () => getAllAuthorsReset();

// Actions: Get One Author.
export const getOneAuthor = (payload) => {
  return async (dispatch) => {
    dispatch(
      getOneAuthorStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    try {
      const { authorId } = payload;
      const result = await ApiClient.get(`authors/${authorId}`);
      if (result.data?.success) {
        const { author } = result.data.data;
        dispatch(
          getOneAuthorSuccess({
            loading: false,
            success: true,
            data: { author },
            error: false,
            errorMessage: null,
          })
        );
      } else {
        dispatch(
          getOneAuthorFailed({
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
        getOneAuthorFailed({
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

// Actions: Clear Get One Author.
export const clearGetOneAuthor = () => getOneAuthorReset();

// Actions: Create New Author.
export const createAuthor = (payload, options) => {
  return async (dispatch) => {
    dispatch(
      createAuthorStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    const { name, description } = payload;
    const {
      toastNotification,
      history,
      pathname,
      onSuccessMessage,
      onFailMessage,
      onAuthorExistsMessage,
    } = options;

    try {
      const result = await ApiClient.post("authors", {
        name,
        description,
      });
      if (result.data?.success) {
        const { author } = result.data.data;
        dispatch(
          createAuthorSuccess({
            loading: false,
            success: true,
            data: { author },
            error: false,
            errorMessage: null,
          })
        );
        toastNotification("success", onSuccessMessage);
      } else {
        dispatch(
          createAuthorFailed({
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
        createAuthorFailed({
          loading: false,
          success: false,
          data: null,
          error: true,
          errorMessage: error.message || "Internal Server Error!",
        })
      );
      const authorExists = "AUTHOR_EXISTS";
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.errorType &&
        error.response.data.errorType === authorExists
      ) {
        toastNotification("error", onAuthorExistsMessage);
      } else {
        toastNotification("error", onFailMessage);
      }
    }
  };
};

// Actions: Clear Create New Author.
export const clearCreateNewAuthor = () => createAuthorReset();

// Actions: Update One Author.
export const updateOneAuthor = (payload, options) => {
  return async (dispatch) => {
    dispatch(
      updateOneAuthorStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    const { authorId, name, description } = payload;
    const {
      toastNotification,
      history,
      pathname,
      onSuccessMessage,
      onFailMessage,
    } = options;

    try {
      const result = await ApiClient.put(`authors/${authorId}`, {
        name,
        description,
      });
      if (result.data?.success) {
        const { author } = result.data.data;
        dispatch(
          updateOneAuthorSuccess({
            loading: false,
            success: true,
            data: { author },
            error: false,
            errorMessage: null,
          })
        );
        toastNotification("success", onSuccessMessage);
      } else {
        dispatch(
          updateOneAuthorFailed({
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
        updateOneAuthorFailed({
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

// Actions: Clear Update One Author.
export const clearUpdateOneAuthor = () => updateOneAuthorReset();

// Actions: Delete One Author.
export const deleteOneAuthor = (payload) => {
  return async (dispatch) => {
    dispatch(
      deleteOneAuthorStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    try {
      const { authorId } = payload;
      const result = await ApiClient.delete(`authors/${authorId}`);
      if (result.data?.success) {
        const { author } = result.data.data;
        dispatch(
          deleteOneAuthorSuccess({
            loading: false,
            success: true,
            data: { author },
            error: false,
            errorMessage: null,
          })
        );
      } else {
        dispatch(
          deleteOneAuthorFailed({
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
        deleteOneAuthorFailed({
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

// Actions: Clear Delete One Author.
export const cleareDeleteOneAuthor = () => deleteOneAuthorReset();
