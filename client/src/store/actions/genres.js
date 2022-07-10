// Imports: local files.
import ApiClient from "../../services/ApiClient";

// Action Types: Get All Genres.
export const GET_ALL_GENRES_START = "GET_ALL_GENRES_START";
export const GET_ALL_GENRES_SUCCESS = "GET_ALL_GENRES_SUCCESS";
export const GET_ALL_GENRES_FAILED = "GET_ALL_GENRES_FAILED";
export const GET_ALL_GENRES_RESET = "GET_ALL_GENRES_RESET";

// Action Types: Get One Genre.
export const GET_ONE_GENRE_START = "GET_ONE_GENRE_START";
export const GET_ONE_GENRE_SUCCESS = "GET_ONE_GENRE_SUCCESS";
export const GET_ONE_GENRE_FAILED = "GET_ONE_GENRE_FAILED";
export const GET_ONE_GENRE_RESET = "GET_ONE_GENRE_RESET";

// Action Types: Create New Genre.
export const CREATE_GENRE_START = "CREATE_GENRE_START";
export const CREATE_GENRE_SUCCESS = "CREATE_GENRE_SUCCESS";
export const CREATE_GENRE_FAILED = "CREATE_GENRE_FAILED";
export const CREATE_GENRE_RESET = "CREATE_GENRE_RESET";

// Action Types: Update One Genre.
export const UPDATE_ONE_GENRE_START = "UPDATE_ONE_GENRE_START";
export const UPDATE_ONE_GENRE_SUCCESS = "UPDATE_ONE_GENRE_SUCCESS";
export const UPDATE_ONE_GENRE_FAILED = "UPDATE_ONE_GENRE_FAILED";
export const UPDATE_ONE_GENRE_RESET = "UPDATE_ONE_GENRE_RESET";

// Action Types: Delete One Genre.
export const DELETE_ONE_GENRE_START = "DELETE_ONE_GENRE_START";
export const DELETE_ONE_GENRE_SUCCESS = "DELETE_ONE_GENRE_SUCCESS";
export const DELETE_ONE_GENRE_FAILED = "DELETE_ONE_GENRE_FAILED";
export const DELETE_ONE_GENRE_RESET = "DELETE_ONE_GENRE_RESET";

// Action Creators: Get All Genres.
const getAllGenresStart = (payload) => ({
  type: GET_ALL_GENRES_START,
  payload,
});
const getAllGenresSuccess = (payload) => ({
  type: GET_ALL_GENRES_SUCCESS,
  payload,
});
const getAllGenresFailed = (payload) => ({
  type: GET_ALL_GENRES_FAILED,
  payload,
});
const getAllGenresReset = () => ({ type: GET_ALL_GENRES_RESET });

// Action Creators: Get One Genre.
const getOneGenreStart = (payload) => ({
  type: GET_ONE_GENRE_START,
  payload,
});
const getOneGenreSuccess = (payload) => ({
  type: GET_ONE_GENRE_SUCCESS,
  payload,
});
const getOneGenreFailed = (payload) => ({
  type: GET_ONE_GENRE_FAILED,
  payload,
});
const getOneGenreReset = () => ({ type: GET_ONE_GENRE_RESET });

// Action Creators: Create New Genre.
const createGenreStart = (payload) => ({
  type: CREATE_GENRE_START,
  payload,
});
const createGenreSuccess = (payload) => ({
  type: CREATE_GENRE_SUCCESS,
  payload,
});
const createGenreFailed = (payload) => ({
  type: CREATE_GENRE_FAILED,
  payload,
});
const createGenreReset = () => ({ type: CREATE_GENRE_RESET });

// Action Creators: Update One Genre.
const updateOneGenreStart = (payload) => ({
  type: UPDATE_ONE_GENRE_START,
  payload,
});
const updateOneGenreSuccess = (payload) => ({
  type: UPDATE_ONE_GENRE_SUCCESS,
  payload,
});
const updateOneGenreFailed = (payload) => ({
  type: UPDATE_ONE_GENRE_FAILED,
  payload,
});
const updateOneGenreReset = () => ({
  type: UPDATE_ONE_GENRE_RESET,
});

// Action Creators: Delete One Genre.
const deleteOneGenreStart = (payload) => ({
  type: DELETE_ONE_GENRE_START,
  payload,
});
const deleteOneGenreSuccess = (payload) => ({
  type: DELETE_ONE_GENRE_SUCCESS,
  payload,
});
const deleteOneGenreFailed = (payload) => ({
  type: DELETE_ONE_GENRE_FAILED,
  payload,
});
const deleteOneGenreReset = () => ({
  type: DELETE_ONE_GENRE_RESET,
});

// Actions: Get All Genres.
export const getAllGenres = (payload) => {
  return async (dispatch) => {
    dispatch(
      getAllGenresStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    try {
      const { page, limit, pagination, genreName } = payload;
      const result = await ApiClient.get("genres", {
        params: { page, limit, pagination, genreName },
      });
      if (result.data?.success) {
        const { genres } = result.data.data;
        dispatch(
          getAllGenresSuccess({
            loading: false,
            success: true,
            data: { genres },
            error: false,
            errorMessage: null,
          })
        );
      } else {
        dispatch(
          getAllGenresFailed({
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
        getAllGenresFailed({
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

// Actions: Clear Get All Genres.
export const clearGetAllGenres = () => getAllGenresReset();

// Actions: Get One Genre.
export const getOneGenre = (payload) => {
  return async (dispatch) => {
    dispatch(
      getOneGenreStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    try {
      const { genreId } = payload;
      const result = await ApiClient.get(`genres/${genreId}`);
      if (result.data?.success) {
        const { genre } = result.data.data;
        dispatch(
          getOneGenreSuccess({
            loading: false,
            success: true,
            data: { genre },
            error: false,
            errorMessage: null,
          })
        );
      } else {
        dispatch(
          getOneGenreFailed({
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
        getOneGenreFailed({
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

// Actions: Clear Get One Genre.
export const clearGetOneGenre = () => getOneGenreReset();

// Actions: Create New Genre.
export const createGenre = (payload, options) => {
  return async (dispatch) => {
    dispatch(
      createGenreStart({
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
      onGenreExistsMessage,
    } = options;

    try {
      const result = await ApiClient.post("genres", {
        name,
        description,
      });
      if (result.data?.success) {
        const { genre } = result.data.data;
        dispatch(
          createGenreSuccess({
            loading: false,
            success: true,
            data: { genre },
            error: false,
            errorMessage: null,
          })
        );
        toastNotification("success", onSuccessMessage);
      } else {
        dispatch(
          createGenreFailed({
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
        createGenreFailed({
          loading: false,
          success: false,
          data: null,
          error: true,
          errorMessage: error.message || "Internal Server Error!",
        })
      );
      const genreExists = "GENRE_EXISTS";
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.errorType &&
        error.response.data.errorType === genreExists
      ) {
        toastNotification("error", onGenreExistsMessage);
      } else {
        toastNotification("error", onFailMessage);
      }
    }
  };
};

// Actions: Clear Create New Genre.
export const clearCreateNewGenre = () => createGenreReset();

// Actions: Update One Genre.
export const updateOneGenre = (payload, options) => {
  return async (dispatch) => {
    dispatch(
      updateOneGenreStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    const { genreId, name, description } = payload;
    const {
      toastNotification,
      history,
      pathname,
      onSuccessMessage,
      onFailMessage,
    } = options;

    try {
      const result = await ApiClient.put(`genres/${genreId}`, {
        name,
        description,
      });
      if (result.data?.success) {
        const { genre } = result.data.data;
        dispatch(
          updateOneGenreSuccess({
            loading: false,
            success: true,
            data: { genre },
            error: false,
            errorMessage: null,
          })
        );
        toastNotification("success", onSuccessMessage);
      } else {
        dispatch(
          updateOneGenreFailed({
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
        updateOneGenreFailed({
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

// Actions: Clear Update One Genre.
export const clearUpdateOneGenre = () => updateOneGenreReset();

// Actions: Delete One Genre.
export const deleteOneGenre = (payload) => {
  return async (dispatch) => {
    dispatch(
      deleteOneGenreStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    try {
      const { genreId } = payload;
      const result = await ApiClient.delete(`genres/${genreId}`);
      if (result.data?.success) {
        const { genre } = result.data.data;
        dispatch(
          deleteOneGenreSuccess({
            loading: false,
            success: true,
            data: { genre },
            error: false,
            errorMessage: null,
          })
        );
      } else {
        dispatch(
          deleteOneGenreFailed({
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
        deleteOneGenreFailed({
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

// Actions: Clear Delete One Genre.
export const cleareDeleteOneGenre = () => deleteOneGenreReset();
