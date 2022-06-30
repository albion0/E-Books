// Imports: local files.
import {
  GET_ALL_PAYMENTS_START,
  GET_ALL_PAYMENTS_SUCCESS,
  GET_ALL_PAYMENTS_FAILED,
  GET_ALL_PAYMENTS_RESET,
  GET_ONE_PAYMENT_START,
  GET_ONE_PAYMENT_SUCCESS,
  GET_ONE_PAYMENT_FAILED,
  GET_ONE_PAYMENT_RESET,
  CREATE_PAYMENT_START,
  CREATE_PAYMENT_SUCCESS,
  CREATE_PAYMENT_FAILED,
  CREATE_PAYMENT_RESET,
  UPDATE_ONE_PAYMENT_START,
  UPDATE_ONE_PAYMENT_SUCCESS,
  UPDATE_ONE_PAYMENT_FAILED,
  UPDATE_ONE_PAYMENT_RESET,
  DELETE_ONE_PAYMENT_START,
  DELETE_ONE_PAYMENT_SUCCESS,
  DELETE_ONE_PAYMENT_FAILED,
  DELETE_ONE_PAYMENT_RESET,
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

const paymentsReducer = (state = initialState, action) => {
  switch (action.type) {
    /**
     * =======================================================================
     * Get All Payments
     * =======================================================================
     */
    case GET_ALL_PAYMENTS_START:
      return { ...state, getAll: { ...action.payload } };
    case GET_ALL_PAYMENTS_SUCCESS:
      return { ...state, getAll: { ...action.payload } };
    case GET_ALL_PAYMENTS_FAILED:
      return { ...state, getAll: { ...action.payload } };
    case GET_ALL_PAYMENTS_RESET:
      return { ...state, getAll: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Get One Payment
     * =======================================================================
     */
    case GET_ONE_PAYMENT_START:
      return { ...state, getOne: { ...action.payload } };
    case GET_ONE_PAYMENT_SUCCESS:
      return { ...state, getOne: { ...action.payload } };
    case GET_ONE_PAYMENT_FAILED:
      return { ...state, getOne: { ...action.payload } };
    case GET_ONE_PAYMENT_RESET:
      return { ...state, getOne: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Create New Payment
     * =======================================================================
     */
    case CREATE_PAYMENT_START:
      return { ...state, create: { ...action.payload } };
    case CREATE_PAYMENT_SUCCESS:
      return { ...state, create: { ...action.payload } };
    case CREATE_PAYMENT_FAILED:
      return { ...state, create: { ...action.payload } };
    case CREATE_PAYMENT_RESET:
      return { ...state, create: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Update One Payment
     * =======================================================================
     */
    case UPDATE_ONE_PAYMENT_START:
      return { ...state, updateOne: { ...action.payload } };
    case UPDATE_ONE_PAYMENT_SUCCESS:
      return { ...state, updateOne: { ...action.payload } };
    case UPDATE_ONE_PAYMENT_FAILED:
      return { ...state, updateOne: { ...action.payload } };
    case UPDATE_ONE_PAYMENT_RESET:
      return { ...state, updateOne: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Delete One Payment
     * =======================================================================
     */
    case DELETE_ONE_PAYMENT_START:
      return { ...state, deleteOne: { ...action.payload } };
    case DELETE_ONE_PAYMENT_SUCCESS:
      return { ...state, deleteOne: { ...action.payload } };
    case DELETE_ONE_PAYMENT_FAILED:
      return { ...state, deleteOne: { ...action.payload } };
    case DELETE_ONE_PAYMENT_RESET:
      return { ...state, deleteOne: { ...initialLoadingState } };
    default:
      return state;
  }
};

export default paymentsReducer;
