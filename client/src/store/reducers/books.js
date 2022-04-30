// Imports: local files.
import {
  GET_ALL_BOOKS_START,
  GET_ALL_BOOKS_SUCCESS,
  GET_ALL_BOOKS_FAILED,
  GET_ALL_BOOKS_RESET,
  GET_ONE_BOOK_START,
  GET_ONE_BOOK_SUCCESS,
  GET_ONE_BOOK_FAILED,
  GET_ONE_BOOK_RESET,
  CREATE_BOOK_START,
  CREATE_BOOK_SUCCESS,
  CREATE_BOOK_FAILED,
  CREATE_BOOK_RESET,
  UPLOAD_PHOTO_BOOK_START,
  UPLOAD_PHOTO_BOOK_SUCCESS,
  UPLOAD_PHOTO_BOOK_FAILED,
  UPLOAD_PHOTO_BOOK_RESET,
  UPDATE_ONE_BOOK_START,
  UPDATE_ONE_BOOK_SUCCESS,
  UPDATE_ONE_BOOK_FAILED,
  UPDATE_ONE_BOOK_RESET,
  DELETE_ONE_BOOK_START,
  DELETE_ONE_BOOK_SUCCESS,
  DELETE_ONE_BOOK_FAILED,
  DELETE_ONE_BOOK_RESET,
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
  uploadPhoto: initialLoadingState,
  updateOne: initialLoadingState,
  deleteOne: initialLoadingState,
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    /**
     * =======================================================================
     * Get All Books
     * =======================================================================
     */
    case GET_ALL_BOOKS_START:
      return { ...state, getAll: { ...action.payload } };
    case GET_ALL_BOOKS_SUCCESS:
      return { ...state, getAll: { ...action.payload } };
    case GET_ALL_BOOKS_FAILED:
      return { ...state, getAll: { ...action.payload } };
    case GET_ALL_BOOKS_RESET:
      return { ...state, getAll: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Get One Book
     * =======================================================================
     */
    case GET_ONE_BOOK_START:
      return { ...state, getOne: { ...action.payload } };
    case GET_ONE_BOOK_SUCCESS:
      return { ...state, getOne: { ...action.payload } };
    case GET_ONE_BOOK_FAILED:
      return { ...state, getOne: { ...action.payload } };
    case GET_ONE_BOOK_RESET:
      return { ...state, getOne: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Create New Book
     * =======================================================================
     */
    case CREATE_BOOK_START:
      return { ...state, create: { ...action.payload } };
    case CREATE_BOOK_SUCCESS:
      return { ...state, create: { ...action.payload } };
    case CREATE_BOOK_FAILED:
      return { ...state, create: { ...action.payload } };
    case CREATE_BOOK_RESET:
      return { ...state, create: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Upload Photo Book
     * =======================================================================
     */
    case UPLOAD_PHOTO_BOOK_START:
      return { ...state, uploadPhoto: { ...action.payload } };
    case UPLOAD_PHOTO_BOOK_SUCCESS:
      return { ...state, uploadPhoto: { ...action.payload } };
    case UPLOAD_PHOTO_BOOK_FAILED:
      return { ...state, uploadPhoto: { ...action.payload } };
    case UPLOAD_PHOTO_BOOK_RESET:
      return { ...state, uploadPhoto: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Update One Book
     * =======================================================================
     */
    case UPDATE_ONE_BOOK_START:
      return { ...state, updateOne: { ...action.payload } };
    case UPDATE_ONE_BOOK_SUCCESS:
      return { ...state, updateOne: { ...action.payload } };
    case UPDATE_ONE_BOOK_FAILED:
      return { ...state, updateOne: { ...action.payload } };
    case UPDATE_ONE_BOOK_RESET:
      return { ...state, updateOne: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Delete One Book
     * =======================================================================
     */
    case DELETE_ONE_BOOK_START:
      return { ...state, deleteOne: { ...action.payload } };
    case DELETE_ONE_BOOK_SUCCESS:
      return { ...state, deleteOne: { ...action.payload } };
    case DELETE_ONE_BOOK_FAILED:
      return { ...state, deleteOne: { ...action.payload } };
    case DELETE_ONE_BOOK_RESET:
      return { ...state, deleteOne: { ...initialLoadingState } };
    default:
      return state;
  }
};

export default booksReducer;
