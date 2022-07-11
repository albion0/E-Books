// Imports: local files.
import {
  GET_ALL_REVIEWS_START,
  GET_ALL_REVIEWS_SUCCESS,
  GET_ALL_REVIEWS_FAILED,
  GET_ALL_REVIEWS_RESET,
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
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    /**
     * =======================================================================
     * Get All Authors
     * =======================================================================
     */
    case GET_ALL_REVIEWS_START:
      return { ...state, getAll: { ...action.payload } };
    case GET_ALL_REVIEWS_SUCCESS:
      return { ...state, getAll: { ...action.payload } };
    case GET_ALL_REVIEWS_FAILED:
      return { ...state, getAll: { ...action.payload } };
    case GET_ALL_REVIEWS_RESET:
      return { ...state, getAll: { ...initialLoadingState } };
    default:
      return state;
  }
};

export default reviewsReducer;
