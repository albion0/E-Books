// Imports: local files.
import {
  GET_ALL_GENRES_START,
  GET_ALL_GENRES_SUCCESS,
  GET_ALL_GENRES_FAILED,
  GET_ALL_GENRES_RESET,
  GET_ONE_GENRE_START,
  GET_ONE_GENRE_SUCCESS,
  GET_ONE_GENRE_FAILED,
  GET_ONE_GENRE_RESET,
  CREATE_GENRE_START,
  CREATE_GENRE_SUCCESS,
  CREATE_GENRE_FAILED,
  CREATE_GENRE_RESET,
  UPDATE_ONE_GENRE_START,
  UPDATE_ONE_GENRE_SUCCESS,
  UPDATE_ONE_GENRE_FAILED,
  UPDATE_ONE_GENRE_RESET,
  DELETE_ONE_GENRE_START,
  DELETE_ONE_GENRE_SUCCESS,
  DELETE_ONE_GENRE_FAILED,
  DELETE_ONE_GENRE_RESET,
} from "../actions/actions";

const initialLoadingState = {
  loading: false,
  success: false,
  data: null,
  error: false,
  errorMessage: null,
};
const initialState = {
  getAll: initialLoadingState,
  getOne: initialLoadingState,
  create: initialLoadingState,
  updateOne: initialLoadingState,
  deleteOne: initialLoadingState,
};

const genresReducer = (state = initialState, action) => {
  switch (action.type) {
    /**
     * =======================================================================
     * Get All Genres
     * =======================================================================
     */
    case GET_ALL_GENRES_START:
      return { ...state, getAll: { ...action.payload } };
    case GET_ALL_GENRES_SUCCESS:
      return { ...state, getAll: { ...action.payload } };
    case GET_ALL_GENRES_FAILED:
      return { ...state, getAll: { ...action.payload } };
    case GET_ALL_GENRES_RESET:
      return { ...state, getAll: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Get One Genre
     * =======================================================================
     */
    case GET_ONE_GENRE_START:
      return { ...state, getOne: { ...action.payload } };
    case GET_ONE_GENRE_SUCCESS:
      return { ...state, getOne: { ...action.payload } };
    case GET_ONE_GENRE_FAILED:
      return { ...state, getOne: { ...action.payload } };
    case GET_ONE_GENRE_RESET:
      return { ...state, getOne: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Create New Genre
     * =======================================================================
     */
    case CREATE_GENRE_START:
      return { ...state, create: { ...action.payload } };
    case CREATE_GENRE_SUCCESS:
      return { ...state, create: { ...action.payload } };
    case CREATE_GENRE_FAILED:
      return { ...state, create: { ...action.payload } };
    case CREATE_GENRE_RESET:
      return { ...state, create: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Update One Genre
     * =======================================================================
     */
    case UPDATE_ONE_GENRE_START:
      return { ...state, updateOne: { ...action.payload } };
    case UPDATE_ONE_GENRE_SUCCESS:
      return { ...state, updateOne: { ...action.payload } };
    case UPDATE_ONE_GENRE_FAILED:
      return { ...state, updateOne: { ...action.payload } };
    case UPDATE_ONE_GENRE_RESET:
      return { ...state, updateOne: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Delete One Genre
     * =======================================================================
     */
    case DELETE_ONE_GENRE_START:
      return { ...state, deleteOne: { ...action.payload } };
    case DELETE_ONE_GENRE_SUCCESS:
      return { ...state, deleteOne: { ...action.payload } };
    case DELETE_ONE_GENRE_FAILED:
      return { ...state, deleteOne: { ...action.payload } };
    case DELETE_ONE_GENRE_RESET:
      return { ...state, deleteOne: { ...initialLoadingState } };
    default:
      return state;
  }
};

export default genresReducer;
