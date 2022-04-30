// Imports: local files.
import {
  GET_ALL_AUTHORS_START,
  GET_ALL_AUTHORS_SUCCESS,
  GET_ALL_AUTHORS_FAILED,
  GET_ALL_AUTHORS_RESET,
  GET_ONE_AUTHOR_START,
  GET_ONE_AUTHOR_SUCCESS,
  GET_ONE_AUTHOR_FAILED,
  GET_ONE_AUTHOR_RESET,
  CREATE_AUTHOR_START,
  CREATE_AUTHOR_SUCCESS,
  CREATE_AUTHOR_FAILED,
  CREATE_AUTHOR_RESET,
  UPDATE_ONE_AUTHOR_START,
  UPDATE_ONE_AUTHOR_SUCCESS,
  UPDATE_ONE_AUTHOR_FAILED,
  UPDATE_ONE_AUTHOR_RESET,
  DELETE_ONE_AUTHOR_START,
  DELETE_ONE_AUTHOR_SUCCESS,
  DELETE_ONE_AUTHOR_FAILED,
  DELETE_ONE_AUTHOR_RESET,
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

const authorsReducer = (state = initialState, action) => {
  switch (action.type) {
    /**
     * =======================================================================
     * Get All Authors
     * =======================================================================
     */
    case GET_ALL_AUTHORS_START:
      return { ...state, getAll: { ...action.payload } };
    case GET_ALL_AUTHORS_SUCCESS:
      return { ...state, getAll: { ...action.payload } };
    case GET_ALL_AUTHORS_FAILED:
      return { ...state, getAll: { ...action.payload } };
    case GET_ALL_AUTHORS_RESET:
      return { ...state, getAll: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Get One Author
     * =======================================================================
     */
    case GET_ONE_AUTHOR_START:
      return { ...state, getOne: { ...action.payload } };
    case GET_ONE_AUTHOR_SUCCESS:
      return { ...state, getOne: { ...action.payload } };
    case GET_ONE_AUTHOR_FAILED:
      return { ...state, getOne: { ...action.payload } };
    case GET_ONE_AUTHOR_RESET:
      return { ...state, getOne: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Create New Author
     * =======================================================================
     */
    case CREATE_AUTHOR_START:
      return { ...state, create: { ...action.payload } };
    case CREATE_AUTHOR_SUCCESS:
      return { ...state, create: { ...action.payload } };
    case CREATE_AUTHOR_FAILED:
      return { ...state, create: { ...action.payload } };
    case CREATE_AUTHOR_RESET:
      return { ...state, create: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Update One Author
     * =======================================================================
     */
    case UPDATE_ONE_AUTHOR_START:
      return { ...state, updateOne: { ...action.payload } };
    case UPDATE_ONE_AUTHOR_SUCCESS:
      return { ...state, updateOne: { ...action.payload } };
    case UPDATE_ONE_AUTHOR_FAILED:
      return { ...state, updateOne: { ...action.payload } };
    case UPDATE_ONE_AUTHOR_RESET:
      return { ...state, updateOne: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Delete One Author
     * =======================================================================
     */
    case DELETE_ONE_AUTHOR_START:
      return { ...state, deleteOne: { ...action.payload } };
    case DELETE_ONE_AUTHOR_SUCCESS:
      return { ...state, deleteOne: { ...action.payload } };
    case DELETE_ONE_AUTHOR_FAILED:
      return { ...state, deleteOne: { ...action.payload } };
    case DELETE_ONE_AUTHOR_RESET:
      return { ...state, deleteOne: { ...initialLoadingState } };
    default:
      return state;
  }
};

export default authorsReducer;
