// Imports: local files.
import {
  GET_ALL_BOOK_PURCHASES_START,
  GET_ALL_BOOK_PURCHASES_SUCCESS,
  GET_ALL_BOOK_PURCHASES_FAILED,
  GET_ALL_BOOK_PURCHASES_RESET,
  GET_ONE_BOOK_PURCHASE_START,
  GET_ONE_BOOK_PURCHASE_SUCCESS,
  GET_ONE_BOOK_PURCHASE_FAILED,
  GET_ONE_BOOK_PURCHASE_RESET,
  CREATE_BOOK_PURCHASE_START,
  CREATE_BOOK_PURCHASE_SUCCESS,
  CREATE_BOOK_PURCHASE_FAILED,
  CREATE_BOOK_PURCHASE_RESET,
  UPDATE_ONE_BOOK_PURCHASE_START,
  UPDATE_ONE_BOOK_PURCHASE_SUCCESS,
  UPDATE_ONE_BOOK_PURCHASE_FAILED,
  UPDATE_ONE_BOOK_PURCHASE_RESET,
  DELETE_ONE_BOOK_PURCHASE_START,
  DELETE_ONE_BOOK_PURCHASE_SUCCESS,
  DELETE_ONE_BOOK_PURCHASE_FAILED,
  DELETE_ONE_BOOK_PURCHASE_RESET,
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

const bookPurchasesReducer = (state = initialState, action) => {
  switch (action.type) {
    /**
     * =======================================================================
     * Get All Authors
     * =======================================================================
     */
    case GET_ALL_BOOK_PURCHASES_START:
      return { ...state, getAll: { ...action.payload } };
    case GET_ALL_BOOK_PURCHASES_SUCCESS:
      return { ...state, getAll: { ...action.payload } };
    case GET_ALL_BOOK_PURCHASES_FAILED:
      return { ...state, getAll: { ...action.payload } };
    case GET_ALL_BOOK_PURCHASES_RESET:
      return { ...state, getAll: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Get One BOOK_PURCHASE
     * =======================================================================
     */
    case GET_ONE_BOOK_PURCHASE_START:
      return { ...state, getOne: { ...action.payload } };
    case GET_ONE_BOOK_PURCHASE_SUCCESS:
      return { ...state, getOne: { ...action.payload } };
    case GET_ONE_BOOK_PURCHASE_FAILED:
      return { ...state, getOne: { ...action.payload } };
    case GET_ONE_BOOK_PURCHASE_RESET:
      return { ...state, getOne: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Create New BOOK_PURCHASE
     * =======================================================================
     */
    case CREATE_BOOK_PURCHASE_START:
      return { ...state, create: { ...action.payload } };
    case CREATE_BOOK_PURCHASE_SUCCESS:
      return { ...state, create: { ...action.payload } };
    case CREATE_BOOK_PURCHASE_FAILED:
      return { ...state, create: { ...action.payload } };
    case CREATE_BOOK_PURCHASE_RESET:
      return { ...state, create: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Update One BOOK_PURCHASE
     * =======================================================================
     */
    case UPDATE_ONE_BOOK_PURCHASE_START:
      return { ...state, updateOne: { ...action.payload } };
    case UPDATE_ONE_BOOK_PURCHASE_SUCCESS:
      return { ...state, updateOne: { ...action.payload } };
    case UPDATE_ONE_BOOK_PURCHASE_FAILED:
      return { ...state, updateOne: { ...action.payload } };
    case UPDATE_ONE_BOOK_PURCHASE_RESET:
      return { ...state, updateOne: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Delete One BOOK_PURCHASE
     * =======================================================================
     */
    case DELETE_ONE_BOOK_PURCHASE_START:
      return { ...state, deleteOne: { ...action.payload } };
    case DELETE_ONE_BOOK_PURCHASE_SUCCESS:
      return { ...state, deleteOne: { ...action.payload } };
    case DELETE_ONE_BOOK_PURCHASE_FAILED:
      return { ...state, deleteOne: { ...action.payload } };
    case DELETE_ONE_BOOK_PURCHASE_RESET:
      return { ...state, deleteOne: { ...initialLoadingState } };
    default:
      return state;
  }
};

export default bookPurchasesReducer;
